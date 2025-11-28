"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { store, Listing, User } from "@/lib/store";
import { Search, MapPin, DollarSign, LogOut, MessageSquare, Home, Loader2, ArrowRight, Filter, Lock } from "lucide-react";
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

const MOCK_LISTINGS: Listing[] = [
    {
        id: 'mock-1',
        sellerId: 'mock-seller-1',
        address: 'Modern Self-con at Asherifa',
        location: 'Asherifa',
        price: 150000,
        description: 'A very spacious self-con with running water and good electricity.',
        images: [],
        status: 'active',
        createdAt: new Date().toISOString()
    },
    {
        id: 'mock-2',
        sellerId: 'mock-seller-2',
        address: '2 Bedroom Flat at Damico',
        location: 'Damico',
        price: 350000,
        description: 'Newly built 2 bedroom flat, tiled, fenced with gate.',
        images: [],
        status: 'active',
        createdAt: new Date().toISOString()
    },
    {
        id: 'mock-3',
        sellerId: 'mock-seller-3',
        address: 'Single Room at Mayfair',
        location: 'Mayfair',
        price: 80000,
        description: 'Affordable single room close to campus.',
        images: [],
        status: 'active',
        createdAt: new Date().toISOString()
    }
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
            setUser(currentUser);

            const allListings = await store.getListings();
            const activeListings = allListings.filter(l => l.status === 'active');

            // Combine real and mock listings
            // If we have real listings, show them. If not, show mocks. 
            // Or just mix them for demo purposes as requested.
            // Let's mix them if real listings are few, or just append mocks.
            const combinedListings = [...activeListings, ...MOCK_LISTINGS];

            setListings(combinedListings);
            setFilteredListings(combinedListings);
            setIsLoading(false);
        };
        fetchData();
    }, []);

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

    const handleListingClick = (listingId: string) => {
        if (user) {
            router.push(`/explore/${listingId}`);
        } else {
            router.push(`/auth/login/buyer?redirect=/explore/${listingId}`);
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#002147]" size={32} /></div>;

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
                            {user ? (
                                <>
                                    <Link
                                        href="/dashboard/buyer"
                                        className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-[#002147] transition-colors text-sm font-medium group"
                                    >
                                        <div className="relative">
                                            <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
                                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                                        </div>
                                        <span>Messages</span>
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

                                        <button
                                            onClick={async () => { await store.logout(); router.push('/'); }}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all ml-2"
                                            title="Logout"
                                        >
                                            <LogOut size={20} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link
                                        href="/auth/login/buyer"
                                        className="text-sm font-bold text-[#002147] hover:text-[#FFC72C] transition-colors"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href="/auth/signup/buyer"
                                        className="px-5 py-2.5 bg-[#FFC72C] text-[#002147] text-sm font-bold rounded-full hover:bg-[#ffcf4d] transition-all shadow-lg shadow-[#FFC72C]/20 hover:-translate-y-0.5"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Filters Section */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 w-full">
                            <h1 className="text-2xl font-bold text-[#002147]">Explore Apartments</h1>
                            <p className="text-slate-500 text-sm">Find your perfect student home in Ife</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            {/* Location Filter */}
                            <div className="relative min-w-[200px]">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#002147]" size={18} />
                                <select
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002147] focus:border-[#002147] transition-all appearance-none cursor-pointer text-sm font-medium text-slate-700 hover:bg-slate-100"
                                >
                                    {LOCATIONS.map(loc => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <Filter size={14} className="text-slate-400" />
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div className="relative min-w-[180px]">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#002147]" size={18} />
                                <input
                                    type="number"
                                    placeholder="Max Price (₦)"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002147] focus:border-[#002147] transition-all text-sm font-medium text-slate-700 placeholder-slate-400 hover:bg-slate-100"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Listings Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-sm font-medium text-slate-500">
                        Showing <span className="text-[#002147] font-bold">{filteredListings.length}</span> {filteredListings.length === 1 ? 'property' : 'properties'}
                    </p>
                </div>

                {filteredListings.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 border-dashed">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full mb-6">
                            <Search className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-[#002147] mb-2">No apartments found</h3>
                        <p className="text-slate-500 mb-8 max-w-md mx-auto">We couldn't find any properties matching your current filters. Try adjusting your location or price range.</p>
                        <button
                            onClick={() => { setLocationFilter("All Locations"); setMaxPrice(""); }}
                            className="px-6 py-2.5 bg-[#002147] text-white rounded-xl text-sm font-bold hover:bg-[#001835] transition-all shadow-lg shadow-[#002147]/20"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredListings.map(listing => (
                            <div
                                key={listing.id}
                                onClick={() => handleListingClick(listing.id)}
                                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-[#002147]/5 hover:border-[#002147]/20 transition-all duration-300 flex flex-col h-full cursor-pointer"
                            >
                                {/* Image */}
                                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                                    {listing.images[0] ? (
                                        <img
                                            src={listing.images[0]}
                                            alt={listing.address}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <Home className="w-12 h-12 text-slate-300" />
                                        </div>
                                    )}

                                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-lg shadow-sm border border-white/20">
                                        <span className="text-sm font-bold text-[#002147]">₦{listing.price.toLocaleString()}</span>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {!user && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                                                <Lock className="w-4 h-4 text-[#002147]" />
                                                <span className="text-sm font-bold text-[#002147]">Login to View</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-[#002147] transition-colors">
                                            {listing.address}
                                        </h3>
                                    </div>

                                    <div className="flex items-center text-sm text-slate-500 mb-4">
                                        <MapPin size={16} className="mr-1.5 text-[#FFC72C]" />
                                        <span>{listing.location}</span>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-xs font-bold text-[#002147] bg-[#002147]/5 px-2.5 py-1 rounded-md">
                                            {user ? "View Details" : "Login to View"}
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#FFC72C] transition-colors">
                                            <ArrowRight size={16} className="text-slate-400 group-hover:text-[#002147] transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
