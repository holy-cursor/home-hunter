"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { store, Chat, Message, User, Listing } from "@/lib/store";
import { Send, ArrowLeft, MoreVertical, Loader2 } from "lucide-react";

export default function BuyerChat() {
    const router = useRouter();
    const params = useParams();
    const chatId = params.chatId as string;

    const [user, setUser] = useState<User | null>(null);
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);
    const [seller, setSeller] = useState<User | null>(null);
    const [listing, setListing] = useState<Listing | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await store.getCurrentUser();
            if (!currentUser) {
                router.push("/");
                return;
            }
            setUser(currentUser);

            const chats = await store.getChats(currentUser.id);
            const chat = chats.find(c => c.id === chatId);

            if (chat) {
                setCurrentChat(chat);
                setMessages(chat.messages);

                const sellerUser = await store.getUser(chat.sellerId);
                setSeller(sellerUser || null);

                const listingData = await store.getListing(chat.listingId);
                setListing(listingData || null);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [chatId, router]);

    // Polling effect for real-time updates
    useEffect(() => {
        if (!user || !currentChat) return;

        const pollMessages = async () => {
            const chats = await store.getChats(user.id);
            const chat = chats.find(c => c.id === chatId);
            if (chat) {
                setMessages(chat.messages);
            }
        };

        // Poll every 3 seconds
        const interval = setInterval(pollMessages, 3000);

        return () => clearInterval(interval);
    }, [chatId, user, currentChat]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user || !currentChat) return;

        const { message } = await store.sendMessage(currentChat.id, user.id, newMessage);

        if (message) {
            // Optimistically update UI or re-fetch
            // For now, let's just append to local state if we had a real subscription we wouldn't need this
            const newMsgObj: Message = {
                id: message.id,
                senderId: message.sender_id,
                content: message.content,
                timestamp: message.created_at
            };
            setMessages([...messages, newMsgObj]);
            setNewMessage("");
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-emerald-600" size={32} /></div>;
    if (!currentChat || !seller) return <div className="p-8 text-center">Chat not found</div>;

    return (
        <div className="flex flex-col h-screen bg-slate-50">

            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-slate-600" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-indigo-200">
                            {seller.profilePic ? (
                                <img src={seller.profilePic} alt={seller.name} className="h-full w-full object-cover" />
                            ) : (
                                <span className="font-bold text-indigo-700">{seller.name[0]}</span>
                            )}
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-900 text-sm">{seller.name}</h2>
                            {listing && (
                                <p className="text-xs text-slate-500 truncate max-w-[200px]">
                                    {listing.address}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <MoreVertical size={20} className="text-slate-600" />
                </button>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((msg) => {
                    const isMe = msg.senderId === user?.id;
                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${isMe
                                    ? 'bg-emerald-600 text-white rounded-br-none'
                                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                                    }`}
                            >
                                <p>{msg.content}</p>
                                <p className={`text-[10px] mt-1 ${isMe ? 'text-emerald-100' : 'text-slate-400'}`}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input */}
            <div className="bg-white border-t border-slate-200 p-4 sticky bottom-0">
                <form onSubmit={handleSendMessage} className="flex gap-2 max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="p-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}
