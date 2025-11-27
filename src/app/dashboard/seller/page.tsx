"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { store, User, Listing, Chat } from "@/lib/store";
import { Plus, MessageCircle, Home, Trash2, LogOut, TrendingUp, Users, Loader2 } from "lucide-react";
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
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#002147] rounded-lg flex items-center justify-center">
                                <Home className="w-5 h-5 text-[#FFC72C]" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-slate-900">Agent Dashboard</h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
                                <span className="font-medium">Welcome,</span>
                                <span className="font-bold text-[#002147]">{user.name}</span>
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
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <Home className="w-6 h-6 text-[#002147]" />
                            </div>
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Total</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{listings.length}</div>
                        <div className="text-sm text-slate-500">Active Listings</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-emerald-50 rounded-lg">
                                <Users className="w-6 h-6 text-[#002147]" />
                            </div>
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Total</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{chats.length}</div>
                        <div className="text-sm text-slate-500">Interested Buyers</div>
                    </div>

                    <Link
                        href="/dashboard/seller/add"
                        className="bg-[#002147] hover:bg-[#001835] rounded-xl p-6 text-white shadow-md transition-all flex flex-col justify-between group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Plus className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div>
                            <div className="text-lg font-bold mb-1">Add New Listing</div>
                            <div className="text-indigo-100 text-sm">Post a new apartment</div>
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Active Listings */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900">Active Listings</h3>
                            <Link href="/dashboard/seller/add" className="text-sm text-[#002147] font-medium hover:text-[#001835]">
                                + Add New
                            </Link>
                        </div>

                        <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                            {listings.length === 0 ? (
                                <div className="px-6 py-12 text-center">
                                    <Home className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-500 text-sm">No active listings yet</p>
                                </div>
                            ) : (
                                listings.map((listing) => (
                                    <div key={listing.id} className="px-6 py-4 hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            {listing.images[0] && (
                                                <div className="h-12 w-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                                                    <img src={listing.images[0]} alt="Apartment" className="h-full w-full object-cover" />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-slate-900 truncate">{listing.address}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">{listing.location}</p>
                                            </div>
                                            <div className="text-right mr-4">
                                                <p className="text-sm font-bold text-[#002147]">₦{listing.price.toLocaleString()}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteListing(listing.id)}
                                                className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Interested Buyers */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-900">Recent Inquiries</h3>
                        </div>

                        <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                            {chats.length === 0 ? (
                                <div className="px-6 py-12 text-center">
                                    <MessageCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-500 text-sm">No inquiries yet</p>
                                </div>
                            ) : (
                                chats.map((chat) => (
                                    <div key={chat.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-[#002147]/10 flex items-center justify-center overflow-hidden border border-[#002147]/20">
                                                    {chat.buyer?.profilePic ? (
                                                        <img src={chat.buyer.profilePic} alt={chat.buyer.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <span className="text-[#002147] font-bold text-xs">{chat.buyer?.name?.[0]}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{chat.buyer?.name}</p>
                                                    <p className="text-xs text-slate-500 truncate max-w-xs">
                                                        {chat.listing?.address}
                                                    </p>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/dashboard/seller/chat/${chat.id}`}
                                                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:border-[#002147] hover:text-[#002147] rounded-lg text-xs font-medium transition-all"
                                            >
                                                Chat
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
