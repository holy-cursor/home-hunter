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
    const [chats, setChats] = useState<Chat[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await store.getCurrentUser();
            if (!currentUser || currentUser.role !== 'seller') {
                router.push("/");
                return;
            }
            setUser(currentUser);

            const userListings = await store.getListings(currentUser.id);
            setListings(userListings);

            const userChats = await store.getChats(currentUser.id);
            setChats(userChats);

            setIsLoading(false);
        };
        fetchData();
    }, [router]);

    const handleDeleteListing = async (listingId: string) => {
        if (confirm("Are you sure you want to delete this listing?")) {
            await store.deleteListing(listingId);
            setListings(listings.filter(l => l.id !== listingId));
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-[#002147]" size={32} /></div>;
    if (!user) return null;

    const activeListings = listings.filter(l => l.status === 'active');
    const totalViews = listings.reduce((acc, curr) => acc + (curr.views || 0), 0);

    return (
        <div className="min-h-screen bg-[#F8FAFC]"> {/* Light slate background */}
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#002147] rounded-xl flex items-center justify-center shadow-sm">
                                <Home className="w-5 h-5 text-[#FFC72C]" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-[#002147] tracking-tight">Agent Dashboard</h1>
                                <p className="text-xs text-gray-500">Welcome back, {user.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
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
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium text-sm"
                            >
                                <LogOut size={18} />
                                <span className="hidden sm:inline">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <Home className="w-6 h-6 text-[#002147]" />
                            </div>
                            <span className="text-xs font-bold text-[#002147] bg-blue-50 px-2.5 py-1 rounded-full">Active</span>
                        </div>
                        <div className="text-3xl font-bold text-[#002147] mb-1">{activeListings.length}</div>
                        <div className="text-sm text-gray-500 font-medium">Active Listings</div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-amber-50 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-[#FFC72C]" /> {/* Gold icon */}
                            </div>
                            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">Views</span>
                        </div>
                        <div className="text-3xl font-bold text-[#002147] mb-1">{totalViews}</div>
                        <div className="text-sm text-gray-500 font-medium">Total Property Views</div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-50 rounded-xl">
                                <MessageCircle className="w-6 h-6 text-[#002147]" />
                            </div>
                            <span className="text-xs font-bold text-[#002147] bg-purple-50 px-2.5 py-1 rounded-full">Chats</span>
                        </div>
                        <div className="text-3xl font-bold text-[#002147] mb-1">{chats.length}</div>
                        <div className="text-sm text-gray-500 font-medium">Active Conversations</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - Listings */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#002147]">Your Listings</h2>
                            <Link href="/dashboard/seller/add" className="flex items-center gap-2 bg-[#002147] text-white px-4 py-2 rounded-lg hover:bg-[#001835] transition-colors shadow-sm">
                                <Plus size={18} className="text-[#FFC72C]" />
                                <span className="font-medium">Add New</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {listings.map((listing) => (
                                <div key={listing.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="relative h-48">
                                        <img src={listing.images[0]} alt={listing.address} className="w-full h-full object-cover" />
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-[#002147] shadow-sm">
                                            ₦{listing.price.toLocaleString()}
                                        </div>
                                        <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold shadow-sm ${listing.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {listing.status === 'active' ? 'Active' : 'Sold'}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-[#002147] truncate mb-1">{listing.address}</h3>
                                        <p className="text-sm text-gray-500 mb-4">{listing.location}</p>

                                        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                            <button
                                                onClick={() => handleDeleteListing(listing.id)}
                                                className="flex-1 flex items-center justify-center gap-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                            <Link
                                                href={`/explore/${listing.id}`}
                                                className="flex-1 flex items-center justify-center gap-2 py-2 text-[#002147] hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
                                            >
                                                View
                                                <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {listings.length === 0 && (
                                <div className="col-span-full bg-white rounded-2xl border border-gray-200 border-dashed p-12 text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Home className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#002147] mb-2">No listings yet</h3>
                                    <p className="text-gray-500 mb-6">Start earning by listing your first property</p>
                                    <Link href="/dashboard/seller/add" className="inline-flex items-center gap-2 bg-[#002147] text-white px-6 py-3 rounded-xl hover:bg-[#001835] transition-colors shadow-sm font-medium">
                                        <Plus size={20} className="text-[#FFC72C]" />
                                        Create Listing
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Messages */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[#002147]">Recent Messages</h2>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="divide-y divide-gray-100">
                                {chats.map((chat) => (
                                    <Link key={chat.id} href={`/dashboard/seller/chat/${chat.id}`} className="block p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-[#002147] flex items-center justify-center text-white font-bold text-sm border border-[#FFC72C]">
                                                U
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <p className="font-bold text-[#002147] text-sm truncate">Buyer Inquiry</p>
                                                    <span className="text-xs text-gray-400 whitespace-nowrap">
                                                        {new Date(chat.createdAt || new Date().toISOString()).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500 truncate">
                                                    Click to view conversation
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                                {chats.length === 0 && (
                                    <div className="p-8 text-center">
                                        <MessageCircle className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                                        <p className="text-sm text-gray-500">No messages yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
