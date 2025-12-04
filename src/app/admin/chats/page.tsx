"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { store, User, Chat } from "@/lib/store";
import { ArrowLeft, Shield, MessageSquare, Loader2, Search, Eye } from "lucide-react";
import Link from "next/link";



export default function AdminChats() {
    const router = useRouter();
    const [admin, setAdmin] = useState<User | null>(null);
    const [chats, setChats] = useState<Chat[]>([]);
    const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await store.getCurrentUser();

            if (!currentUser || !currentUser.isAdmin) {
                router.push("/");
                return;
            }

            setAdmin(currentUser);

            const allChats = await store.getAllChats();
            setChats(allChats);
            setFilteredChats(allChats);
            setIsLoading(false);
        };

        fetchData();
    }, [router]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = chats.filter(c =>
                c.id.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredChats(filtered);
        } else {
            setFilteredChats(chats);
        }
    }, [searchQuery, chats]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#002147]" size={32} /></div>;
    if (!admin) return null;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 py-4">
                        <Link href="/admin" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <ArrowLeft size={20} className="text-slate-600" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-[#002147]" />
                            <h1 className="text-xl font-bold text-[#002147]">Chat Monitoring</h1>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002147] focus:border-[#002147] transition-all"
                        />
                    </div>
                </div>

                {/* Chats List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50">
                            <h2 className="font-bold text-slate-900">All Conversations ({filteredChats.length})</h2>
                        </div>
                        <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                            {filteredChats.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => setSelectedChat(chat)}
                                    className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${selectedChat?.id === chat.id ? 'bg-blue-50' : ''}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <MessageSquare className="w-5 h-5 text-[#002147]" />
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">Chat #{chat.id.substring(0, 8)}</p>
                                                <p className="text-xs text-slate-500">{chat.messages.length} messages</p>
                                            </div>
                                        </div>
                                        <Eye className="w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Details */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        {selectedChat ? (
                            <>
                                <div className="p-4 border-b border-slate-100 bg-slate-50">
                                    <h2 className="font-bold text-slate-900">Chat Details</h2>
                                    <p className="text-xs text-slate-500">ID: {selectedChat.id}</p>
                                </div>
                                <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                                    {selectedChat.messages.map((msg) => (
                                        <div key={msg.id} className="bg-slate-50 rounded-lg p-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold text-[#002147]">
                                                    {msg.senderId === selectedChat.buyerId ? 'Buyer' : 'Seller'}
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    {new Date(msg.timestamp).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-700">{msg.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-[600px] text-slate-400">
                                <div className="text-center">
                                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p>Select a chat to view messages</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
