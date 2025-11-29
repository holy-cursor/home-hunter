"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { store, User, Listing, Chat } from "@/lib/store";
import { Plus, MessageCircle, Home, Trash2, LogOut, TrendingUp, Users, Loader2, ArrowRight, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SellerDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [listings, setListings] = useState<Listing[]>([]);
    const [chats, setChats] = useState<(Chat & { buyer?: User, listing?: Listing })[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await store.getCurrentUser();
            if (!currentUser || currentUser.role !== 'seller') {
                router.push("/");
                return;
            }
            setUser(currentUser);

            const allListings = await store.getListings();
            const myListings = allListings.filter(l => l.sellerId === currentUser.id);
            setListings(myListings);

            const myChats = await store.getChats(currentUser.id);

            // Fetch details for chats
            const enrichedChats = await Promise.all(myChats.map(async (chat) => {
                const buyer = await store.getUser(chat.buyerId);
                const listing = await store.getListing(chat.listingId);
                return {
                    ...chat,
                    buyer: buyer || undefined,
                    listing: listing || undefined
                };
            }));

            setChats(enrichedChats);
            setIsLoading(false);
        };

        fetchData();
    }, [router]);

    const handleDeleteListing = async (id: string) => {
        if (confirm("Are you sure you want to delete this listing?")) {
            await store.updateListing(id, { status: 'sold' });
            setListings(listings.filter(l => l.id !== id));
        }
    };

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
                            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="text-right hidden md:block">
                                        <div className="text-sm font-bold text-[#002147]">{user.name}</div>
                                        <div className="text-xs text-slate-500">Agent</div>
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-[#002147]">Agent Dashboard</h1>
                        <p className="text-slate-500 text-sm">Overview of your property listings and inquiries</p>
                    </div>
                    <Link
                        href="/dashboard/seller/add"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#002147] text-white rounded-xl text-sm font-bold hover:bg-[#001835] transition-all shadow-lg shadow-[#002147]/20"
                    >
                        <Plus size={18} />
                        Add New Listing
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-indigo-50 rounded-xl">
                                <Home className="w-6 h-6 text-[#002147]" />
                            </div>
                            <span className="text-xs font-bold text-[#002147] bg-indigo-50 px-2.5 py-1 rounded-full">Total</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{listings.length}</div>
                        <div className="text-sm text-slate-500 font-medium">Active Listings</div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-[#FFC72C]/10 rounded-xl">
                                <Users className="w-6 h-6 text-[#002147]" />
                            </div>
                            <span className="text-xs font-bold text-[#002147] bg-[#FFC72C]/10 px-2.5 py-1 rounded-full">Total</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{chats.length}</div>
                        <div className="text-sm text-slate-500 font-medium">Interested Buyers</div>
                    </div>

                    <div className="bg-gradient-to-br from-[#002147] to-[#001835] rounded-2xl p-6 text-white shadow-lg shadow-[#002147]/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC72C] rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                    <TrendingUp className="w-5 h-5 text-[#FFC72C]" />
                                </div>
                                <span className="text-sm font-medium text-slate-300">Performance</span>
                            </div>
                            <div>
                                <div className="text-2xl font-bold mb-1">Grow your reach</div>
                                <div className="text-slate-300 text-sm mb-4">Get verified to boost visibility</div>
                                <button className="text-xs font-bold bg-[#FFC72C] text-[#002147] px-3 py-1.5 rounded-lg hover:bg-[#ffcf4d] transition-colors">
                                    Verify Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Active Listings */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
                        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-slate-900">Active Listings</h3>
                            <Link href="/dashboard/seller/add" className="text-xs font-bold text-[#002147] hover:underline">
                                View All
                            </Link>
                        </div>

                        <div className="divide-y divide-slate-100 overflow-y-auto flex-1 custom-scrollbar">
                            {listings.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                        <Home className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <h4 className="text-slate-900 font-medium mb-1">No listings yet</h4>
                                    <p className="text-slate-500 text-sm mb-4">Start by adding your first property</p>
                                    <Link
                                        href="/dashboard/seller/add"
                                        className="text-sm font-bold text-[#002147] hover:underline"
                                    >
                                        Add Listing
                                    </Link>
                                </div>
                            ) : (
                                listings.map((listing) => (
                                    <div key={listing.id} className="p-4 hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="h-16 w-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 relative">
                                                {listing.images[0] ? (
                                                    <img src={listing.images[0]} alt="Apartment" className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full">
                                                        <Home className="w-6 h-6 text-slate-300" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-[#002147] transition-colors">{listing.address}</h4>
                                                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{listing.location}</span>
                                                </p>
                                                <p className="text-sm font-bold text-[#002147] mt-1">₦{listing.price.toLocaleString()}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteListing(listing.id)}
                                                className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Interested Buyers */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
                        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-slate-900">Recent Inquiries</h3>
                        </div>

                        <div className="divide-y divide-slate-100 overflow-y-auto flex-1 custom-scrollbar">
                            {chats.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                        <MessageCircle className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <h4 className="text-slate-900 font-medium mb-1">No inquiries yet</h4>
                                    <p className="text-slate-500 text-sm">Messages from interested students will appear here</p>
                                </div>
                            ) : (
                                chats.map((chat) => (
                                    <div key={chat.id} className="p-4 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-[#002147]/5 flex items-center justify-center overflow-hidden border border-[#002147]/10">
                                                    {chat.buyer?.profilePic ? (
                                                        <img src={chat.buyer.profilePic} alt={chat.buyer.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <span className="text-[#002147] font-bold text-sm">{chat.buyer?.name?.[0]}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{chat.buyer?.name}</p>
                                                    <p className="text-xs text-slate-500 truncate max-w-[150px] sm:max-w-xs">
                                                        Re: {chat.listing?.address}
                                                    </p>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/dashboard/seller/chat/${chat.id}`}
                                                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:border-[#002147] hover:text-[#002147] rounded-lg text-xs font-bold transition-all shadow-sm"
                                            >
                                                Reply
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
