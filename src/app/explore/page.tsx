"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { store, Listing, User } from "@/lib/store";
import { Search, MapPin, DollarSign, LogOut, MessageSquare, Home, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const LOCATIONS = [
    "All Locations",
    "Campus Gate",
    "Asherifa",
    "Damico",
    "Ede Road",
    "Moremi Estate",
    "Ibadan Road",
    "Oduduwa Estate",
    "Mayfair",
    "Parakin"
];

export default function Explore() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [listings, setListings] = useState<Listing[]>([]);
    const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [locationFilter, setLocationFilter] = useState("All Locations");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await store.getCurrentUser();
            if (!currentUser || currentUser.role !== 'buyer') {
                router.push("/");
                return;
            }
            setUser(currentUser);

            const allListings = await store.getListings();
            const activeListings = allListings.filter(l => l.status === 'active');
            setListings(activeListings);
            setFilteredListings(activeListings);
            setIsLoading(false);
        };
        fetchData();
    }, [router]);

    useEffect(() => {
        let result = listings;

        if (locationFilter !== "All Locations") {
            result = result.filter(l => l.location === locationFilter);
        }

        if (maxPrice) {
            result = result.filter(l => l.price <= Number(maxPrice));
        }

        setFilteredListings(result);
    }, [locationFilter, maxPrice, listings]);

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
                                href="/dashboard/buyer"
                                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all text-sm font-medium"
                            >
                                <MessageSquare size={18} />
                                <span className="hidden sm:inline">Messages</span>
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
                                    className="text-slate-500 hover:text-red-600 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Filters Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row gap-4">

                        {/* Location Filter */}
                        <div className="flex-1">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                                <select
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all appearance-none cursor-pointer text-sm font-medium text-slate-700"
                                >
                                    {LOCATIONS.map(loc => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="flex-1">
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="number"
                                    placeholder="Max Price (₦)"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm font-medium text-slate-700 placeholder-slate-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Listings Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Available Apartments</h2>
                    <p className="text-sm text-slate-500">
                        {filteredListings.length} {filteredListings.length === 1 ? 'result' : 'results'}
                    </p>
                </div>

                {filteredListings.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-1">No apartments found</h3>
                        <p className="text-slate-500 mb-6 text-sm">Try adjusting your filters</p>
                        <button
                            onClick={() => { setLocationFilter("All Locations"); setMaxPrice(""); }}
                            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredListings.map(listing => (
                            <Link
                                key={listing.id}
                                href={`/explore/${listing.id}`}
                                className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-emerald-500/30 transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                    {listing.images[0] ? (
                                        <img
                                            src={listing.images[0]}
                                            alt={listing.address}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <Home className="w-12 h-12 text-slate-300" />
                                        </div>
                                    )}

                                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-md shadow-sm">
                                        <span className="text-sm font-bold text-emerald-700">₦{listing.price.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="text-base font-bold text-slate-900 mb-1 truncate group-hover:text-emerald-700 transition-colors">
                                        {listing.address}
                                    </h3>

                                    <div className="flex items-center text-xs text-slate-500 mb-3">
                                        <MapPin size={14} className="mr-1" />
                                        <span>{listing.location}</span>
                                    </div>

                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-xs font-medium text-emerald-600">View Details</span>
                                        <ArrowRight size={16} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
