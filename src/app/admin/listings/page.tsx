"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { store, User, Listing } from "@/lib/store";
import { ArrowLeft, Shield, Home as HomeIcon, Loader2, Search, Trash2 } from "lucide-react";
import Link from "next/link";

export default function AdminListings() {
    const router = useRouter();
    const [admin, setAdmin] = useState<User | null>(null);
    const [listings, setListings] = useState<Listing[]>([]);
    const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await store.getCurrentUser();

            if (!currentUser || !currentUser.isAdmin) {
                router.push("/");
                return;
            }

            setAdmin(currentUser);

            const allListings = await store.getListings();
            setListings(allListings);
            setFilteredListings(allListings);
            setIsLoading(false);
        };

        fetchData();
    }, [router]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = listings.filter(l =>
                l.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                l.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredListings(filtered);
        } else {
            setFilteredListings(listings);
        }
    }, [searchQuery, listings]);

    const handleDeleteListing = async (listingId: string) => {
        if (!admin) return;

        if (confirm("Are you sure you want to remove this listing?")) {
            await store.deleteListing(listingId, admin.id);

            // Refresh listings
            const allListings = await store.getListings();
            setListings(allListings);
            setFilteredListings(allListings);
        }
    };

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
                            <h1 className="text-xl font-bold text-[#002147]">Listing Management</h1>
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
                            placeholder="Search listings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002147] focus:border-[#002147] transition-all"
                        />
                    </div>
                </div>

                {/* Listings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredListings.map((listing) => (
                        <div key={listing.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="aspect-video bg-slate-100 relative">
                                {listing.images[0] ? (
                                    <img src={listing.images[0]} alt={listing.address} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <HomeIcon className="w-12 h-12 text-slate-300" />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-[#002147]">
                                    ₦{listing.price.toLocaleString()}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-slate-900 mb-1">{listing.address}</h3>
                                <p className="text-sm text-slate-500 mb-3">{listing.location}</p>
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${listing.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                                        {listing.status}
                                    </span>
                                    {listing.status === 'active' && (
                                        <button
                                            onClick={() => handleDeleteListing(listing.id)}
                                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                            title="Remove listing"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
