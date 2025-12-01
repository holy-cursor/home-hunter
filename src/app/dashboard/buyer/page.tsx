"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { store, User, Chat, Listing } from "@/lib/store";
import { MessageSquare, Home, LogOut, Loader2, ArrowRight, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BuyerDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [chats, setChats] = useState<(Chat & { seller?: User, listing?: Listing })[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await store.getCurrentUser();
            if (!currentUser || currentUser.role !== 'buyer') {
                router.push("/");
                return;
            }
            setUser(currentUser);

            const myChats = await store.getChats(currentUser.id);

            const enrichedChats = await Promise.all(myChats.map(async (chat) => {
                const seller = await store.getUser(chat.sellerId);
                const listing = await store.getListing(chat.listingId);
                return {
                    ...chat,
                    seller: seller || undefined,
                    listing: listing || undefined
                };
            }));

            setChats(enrichedChats);
            setIsLoading(false);
        };
        fetchData();
    }, [router]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#002147]" size={32} /></div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-[#FFC72C] selection:text-[#002147]">

            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-[#002147] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                                <Home className="w-5 h-5 text-[#FFC72C]" />
                            </div>
                            <span className="text-xl font-bold text-[#002147] tracking-tight">House Hunter</span>
                        </Link>

                        <div className="flex items-center gap-6">
                            <Link
                                href="/explore"
                                className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-[#002147] transition-colors text-sm font-medium group"
                            >
                                <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-[#002147]/5 transition-colors">
                                    <Home size={18} className="text-slate-500 group-hover:text-[#002147]" />
                                </div>
                                <span>Browse Apartments</span>
                            </Link>

                            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="text-right hidden md:block">
                                        <div className="text-sm font-bold text-[#002147]">{user.name}</div>
                                        <div className="text-xs text-slate-500">Student</div>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-[#002147]/10 border border-[#002147]/20 overflow-hidden">
                                        {user.profilePic ? (
                                            <img src={user.profilePic} alt="Profile" className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="flex h-full w-full items-center justify-center font-bold text-[#002147]">{user.name[0]}</span>
                                        )}
                                    </div>
                                </div>

                                {user.isAdmin && (
                                    <Link
                                        href="/admin"
                                        className="flex items-center gap-2 px-4 py-2 text-white bg-[#002147] hover:bg-[#001835] rounded-lg transition-all font-medium text-sm"
                                    >
                                        <Shield size={18} />
                                        <span className="hidden sm:inline">Admin</span>
                                    </Link>
                                )}

                                <button
                                    onClick={async () => { await store.logout(); router.push('/'); }}
                                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium text-sm"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                    <span className="hidden sm:inline">Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-[#002147]">My Messages</h1>
                        <p className="text-slate-500 text-sm">Manage your conversations with agents</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="divide-y divide-slate-100">
                        {chats.length === 0 ? (
                            <div className="px-6 py-16 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-4">
                                    <MessageSquare className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">No messages yet</h3>
                                <p className="text-slate-500 mb-6 text-sm">Start a conversation with an agent to see it here</p>
                                <Link
                                    href="/explore"
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#002147] text-white rounded-xl text-sm font-bold hover:bg-[#001835] transition-all shadow-lg shadow-[#002147]/20"
                                >
                                    Start exploring
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        ) : (
                            chats.map((chat) => {
                                const lastMessage = chat.messages[chat.messages.length - 1];
                                const isUnread = lastMessage && lastMessage.senderId !== user.id;

                                return (
                                    <Link
                                        key={chat.id}
                                        href={`/dashboard/buyer/chat/${chat.id}`}
                                        className="block p-4 sm:p-6 hover:bg-slate-50 transition-colors group"
                                    >
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            {/* Avatar */}
                                            <div className="relative flex-shrink-0">
                                                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#002147]/5 flex items-center justify-center overflow-hidden border-2 border-[#002147]/10 group-hover:border-[#002147]/30 transition-colors">
                                                    {chat.seller?.profilePic ? (
                                                        <img src={chat.seller.profilePic} alt={chat.seller.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <span className="text-[#002147] font-bold text-lg sm:text-xl">{chat.seller?.name?.[0]}</span>
                                                    )}
                                                </div>
                                                {isUnread && (
                                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFC72C] border-2 border-white rounded-full"></div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`font-bold text-slate-900 group-hover:text-[#002147] transition-colors truncate ${isUnread ? 'text-[#002147]' : ''}`}>
                                                            {chat.seller?.name}
                                                        </p>
                                                        <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                                                            <Home size={12} className="flex-shrink-0" />
                                                            <span className="truncate">{chat.listing?.address}</span>
                                                        </p>
                                                    </div>
                                                    {lastMessage && (
                                                        <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
                                                            {new Date(lastMessage.timestamp).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Last Message Preview */}
                                                {lastMessage && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <p className={`text-sm flex-1 truncate ${isUnread ? 'font-medium text-slate-700' : 'text-slate-500'}`}>
                                                            {lastMessage.senderId === user.id && (
                                                                <span className="text-slate-400 mr-1">You:</span>
                                                            )}
                                                            {lastMessage.content}
                                                        </p>
                                                        <ArrowRight size={16} className="text-slate-300 group-hover:text-[#002147] transition-colors flex-shrink-0" />
                                                    </div>
                                                )}

                                                {/* Message Count Badge */}
                                                {chat.messages.length > 0 && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                                                            <MessageSquare size={12} />
                                                            {chat.messages.length} {chat.messages.length === 1 ? 'message' : 'messages'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
