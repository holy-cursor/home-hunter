"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { store, Chat, Message, User, Listing } from "@/lib/store";
import { Send, ArrowLeft, MoreVertical, Loader2, Check, Shield } from "lucide-react";

export default function BuyerChat() {
    const router = useRouter();
    const params = useParams();
    const chatId = params.chatId as string;
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [user, setUser] = useState<User | null>(null);
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);
    const [seller, setSeller] = useState<User | null>(null);
    const [listing, setListing] = useState<Listing | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-[#002147]" size={32} /></div>;
    if (!currentChat || !seller) return <div className="p-8 text-center text-[#002147]">Chat not found</div>;

    return (
        <div className="flex flex-col h-screen bg-[#F8FAFC]"> {/* Very light slate background */}

            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-[#002147]" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#002147] flex items-center justify-center overflow-hidden border-2 border-[#FFC72C]">
                            {seller.profilePic ? (
                                <img src={seller.profilePic} alt={seller.name} className="h-full w-full object-cover" />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center font-bold text-white">{seller.name[0]}</span>
                            )}
                        </div>
                        <div>
                            <h2 className="font-bold text-[#002147] leading-tight">{seller.name}</h2>
                            {listing && (
                                <p className="text-xs text-gray-500 truncate max-w-[200px]">
                                    Re: {listing.address}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical size={20} className="text-[#002147]" />
                </button>
            </header>

            {/* Privacy Warning Banner */}
            <div className="bg-amber-50 border-b border-amber-100 px-4 py-3 flex items-start gap-3">
                <div className="p-1 bg-amber-100 rounded-full shrink-0 mt-0.5">
                    <Shield size={14} className="text-amber-600" />
                </div>
                <div className="flex-1">
                    <p className="text-xs font-medium text-amber-800 leading-relaxed">
                        For your safety, chats are monitored. Do not share sensitive personal information like bank details or passwords.
                    </p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => {
                    const isMe = msg.senderId === user?.id;
                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm relative ${isMe
                                    ? 'bg-[#002147] text-white rounded-tr-none' // Me: Navy Blue
                                    : 'bg-white text-[#002147] border border-gray-200 rounded-tl-none' // Them: White
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{msg.content}</p>
                                <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${isMe ? 'text-gray-300' : 'text-gray-400'}`}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    {isMe && <Check size={12} className="text-[#FFC72C]" />}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3 max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-50 text-[#002147] placeholder-gray-400 border border-gray-200 rounded-full px-6 py-3 focus:outline-none focus:border-[#002147] focus:ring-1 focus:ring-[#002147] transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="p-3 bg-[#002147] text-[#FFC72C] rounded-full hover:bg-[#001835] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>

        </div>
    );
}
