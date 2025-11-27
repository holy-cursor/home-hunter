"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { store, Listing, User } from "@/lib/store";
import { MapPin, ArrowLeft, MessageCircle, Check, DollarSign, Home as HomeIcon, Sparkles, Star, Loader2 } from "lucide-react";

export default function ApartmentDetails() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [user, setUser] = useState<User | null>(null);
    const [listing, setListing] = useState<Listing | null>(null);
    const [seller, setSeller] = useState<User | null>(null);
    const [isInterested, setIsInterested] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await store.getCurrentUser();
            if (!currentUser) {
                router.push("/");
                return;
            }
            setUser(currentUser);

            const currentListing = await store.getListing(id);
            if (currentListing) {
                setListing(currentListing);
                const sellerUser = await store.getUser(currentListing.sellerId);
                setSeller(sellerUser || null);

                const chats = await store.getChats(currentUser.id);
                const existingChat = chats.find(c => c.listingId === id);
                if (existingChat) {
                    setIsInterested(true);
                }
            }
            setIsLoading(false);
        };
        fetchData();
    }, [id, router]);

    const handleInterested = async () => {
        if (!user || !listing || !seller) return;

        const chat = await store.createChat(listing.id, user.id, seller.id);
        setIsInterested(true);

        if (chat) {
            router.push(`/dashboard/buyer/chat/${chat.id}`);
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-emerald-600" size={32} /></div>;
    if (!listing || !seller) return <div className="p-8 text-center">Listing not found</div>;

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                    >
                        <ArrowLeft size={24} className="text-gray-700" />
                    </button>
                    <div>
                        <h1 className="font-bold text-gray-900">Apartment Details</h1>
                        <p className="text-xs text-gray-500">View property information</p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">

                {/* Image Gallery */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-100">
                    <div className="aspect-video bg-slate-900 relative">
                        {listing.images[activeImage] && (
                            <img src={listing.images[activeImage]} alt="Apartment" className="w-full h-full object-cover" />
                        )}

                        {/* Image Counter */}
                        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                            {activeImage + 1} / {listing.images.length}
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex p-4 gap-3 overflow-x-auto bg-gray-50">
                        {listing.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                    {/* Video Section */}
                    {listing.video && (
                        <div className="p-6 border-t border-gray-100 bg-white">
                            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-emerald-500" />
                                Video Tour
                            </h3>
                            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">
                                <video src={listing.video} controls className="w-full h-full" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Property Info */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{listing.address}</h2>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin size={18} className="mr-2 text-emerald-500" />
                                        <span className="font-medium">{listing.location}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-500 mb-1">Price</div>
                                    <div className="text-4xl font-black text-emerald-600">
                                        ₦{listing.price.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {listing.description && (
                                <div className="pt-6 border-t border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <HomeIcon className="w-4 h-4 text-emerald-500" />
                                        Description
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">{listing.description}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Seller Card */}
                        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900 mb-4">Listed By</h3>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-14 w-14 rounded-full bg-indigo-100 overflow-hidden shadow-md border border-indigo-200">
                                    {seller.profilePic ? (
                                        <img src={seller.profilePic} alt={seller.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="flex h-full w-full items-center justify-center font-bold text-indigo-700 text-lg">{seller.name[0]}</span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{seller.name}</p>
                                    <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                                        <Check className="w-3 h-3" />
                                        <span>Verified Agent</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleInterested}
                                disabled={isInterested}
                                className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold shadow-lg transition-all ${isInterested
                                        ? 'bg-emerald-100 text-emerald-700 cursor-default'
                                        : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-xl hover:scale-105'
                                    }`}
                            >
                                {isInterested ? (
                                    <>
                                        <Check size={20} />
                                        <span>Chat Active</span>
                                    </>
                                ) : (
                                    <>
                                        <MessageCircle size={20} />
                                        <span>I'm Interested</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Features */}
                        <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Star className="w-4 h-4 text-emerald-600" />
                                Why Choose This Property
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                    <span>Verified listing with authentic photos</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                    <span>Direct communication with property owner</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                    <span>Secure transaction process</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
