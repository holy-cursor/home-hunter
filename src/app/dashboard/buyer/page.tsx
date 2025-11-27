"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { store, User, Chat, Listing } from "@/lib/store";
import { MessageSquare, Home, LogOut, Loader2 } from "lucide-react";
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

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-emerald-600" size={32} /></div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                                <Home className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">House Hunter</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/explore"
                                className="text-slate-600 hover:text-emerald-600 transition-colors text-sm font-medium"
                            >
                                Browse Apartments
                            </Link>

                            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                                <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
                                    {user.profilePic ? (
                                        <img src={user.profilePic} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="flex h-full w-full items-center justify-center font-bold text-slate-500 text-xs">{user.name[0]}</span>
                                    )}
                                </div>

                                <button
                                    onClick={async () => { await store.logout(); router.push('/'); }}
                                    className="text-slate-400 hover:text-red-600 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">My Messages</h1>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="divide-y divide-slate-100">
                        {chats.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                <p className="text-slate-500">No messages yet</p>
                                <Link href="/explore" className="text-emerald-600 font-medium hover:underline mt-2 inline-block">
                                    Start exploring apartments
                                </Link>
                            </div>
                        ) : (
                            chats.map((chat) => (
                                <div key={chat.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-indigo-200">
                                                {chat.seller?.profilePic ? (
                                                    <img src={chat.seller.profilePic} alt={chat.seller.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <span className="text-indigo-700 font-bold text-sm">{chat.seller?.name?.[0]}</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{chat.seller?.name}</p>
                                                <p className="text-sm text-slate-500">
                                                    Regarding: <span className="font-medium text-slate-700">{chat.listing?.address}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/dashboard/buyer/chat/${chat.id}`}
                                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-all"
                                        >
                                            Open Chat
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
