"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { store, User } from "@/lib/store";
import { Users, Home as HomeIcon, MessageSquare, TrendingUp, Shield, Activity, Loader2, LogOut, ArrowRight, Flag } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await store.getCurrentUser();

            if (!currentUser) {
                router.push("/");
                return;
            }

            if (!currentUser.isAdmin) {
                router.push("/");
                return;
            }

            setUser(currentUser);

            const adminStats = await store.getAdminStats();
            setStats(adminStats);
            setIsLoading(false);
        };

        fetchData();
    }, [router]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-[#002147]" size={32} /></div>;
    if (!user || !user.isAdmin) return null;

    return (
        <div className="min-h-screen bg-[#F8FAFC]"> {/* Light slate background */}
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#002147] rounded-xl flex items-center justify-center shadow-sm">
                                <Shield className="w-5 h-5 text-[#FFC72C]" />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-[#002147] tracking-tight">Admin Dashboard</span>
                                <p className="text-xs text-gray-500">House Hunter</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden md:block">
                                    <div className="text-sm font-bold text-[#002147]">{user.name}</div>
                                    <div className="text-xs text-gray-500">Administrator</div>
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
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#002147]">Platform Overview</h1>
                    <p className="text-gray-500 text-sm">Monitor and manage House Hunter platform</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <Users className="w-6 h-6 text-[#002147]" />
                            </div>
                            <span className="text-xs font-bold text-[#002147] bg-blue-50 px-2.5 py-1 rounded-full">Total</span>
                        </div>
                        <div className="text-3xl font-bold text-[#002147] mb-1">{stats?.totalUsers || 0}</div>
                        <div className="text-sm text-gray-500 font-medium">Total Users</div>
                        <div className="mt-2 text-xs text-gray-400">
                            {stats?.buyers || 0} buyers • {stats?.sellers || 0} sellers
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-emerald-50 rounded-xl">
                                <HomeIcon className="w-6 h-6 text-[#002147]" />
                            </div>
                            <span className="text-xs font-bold text-[#002147] bg-emerald-50 px-2.5 py-1 rounded-full">Listings</span>
                        </div>
                        <div className="text-3xl font-bold text-[#002147] mb-1">{stats?.totalListings || 0}</div>
                        <div className="text-sm text-gray-500 font-medium">Total Listings</div>
                        <div className="mt-2 text-xs text-gray-400">
                            {stats?.activeListings || 0} active • {stats?.soldListings || 0} sold
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-50 rounded-xl">
                                <MessageSquare className="w-6 h-6 text-[#002147]" />
                            </div>
                            <span className="text-xs font-bold text-[#002147] bg-purple-50 px-2.5 py-1 rounded-full">Chats</span>
                        </div>
                        <div className="text-3xl font-bold text-[#002147] mb-1">{stats?.totalChats || 0}</div>
                        <div className="text-sm text-gray-500 font-medium">Active Conversations</div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-amber-50 rounded-xl">
                                <Activity className="w-6 h-6 text-[#FFC72C]" />
                            </div>
                            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">Volume</span>
                        </div>
                        <div className="text-3xl font-bold text-[#002147] mb-1">₦{(stats?.totalVolume || 0).toLocaleString()}</div>
                        <div className="text-sm text-gray-500 font-medium">Total Trade Volume</div>
                        <div className="mt-2 text-xs text-gray-400">
                            From sold listings
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <h2 className="text-lg font-bold text-[#002147] mb-4">Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link
                        href="/admin/users"
                        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#002147]/20 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-[#002147] transition-colors">
                                <Users className="w-6 h-6 text-[#002147] group-hover:text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-[#002147]">User Management</h3>
                                <p className="text-sm text-gray-500">View and manage users</p>
                            </div>
                            <ArrowRight className="text-gray-300 group-hover:text-[#002147] transition-colors" />
                        </div>
                    </Link>

                    <Link
                        href="/admin/chats"
                        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#002147]/20 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-[#002147] transition-colors">
                                <MessageSquare className="w-6 h-6 text-[#002147] group-hover:text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-[#002147]">Chat Monitoring</h3>
                                <p className="text-sm text-gray-500">Monitor conversations</p>
                            </div>
                            <ArrowRight className="text-gray-300 group-hover:text-[#002147] transition-colors" />
                        </div>
                    </Link>

                    <Link
                        href="/admin/listings"
                        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#002147]/20 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-[#002147] transition-colors">
                                <HomeIcon className="w-6 h-6 text-[#002147] group-hover:text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-[#002147]">Listing Management</h3>
                                <p className="text-sm text-gray-500">Manage property listings</p>
                            </div>
                            <ArrowRight className="text-gray-300 group-hover:text-[#002147] transition-colors" />
                        </div>
                    </Link>

                    <Link
                        href="/admin/reports"
                        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#002147]/20 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-50 rounded-xl group-hover:bg-[#002147] transition-colors">
                                <Flag className="w-6 h-6 text-red-600 group-hover:text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-[#002147]">Reports</h3>
                                <p className="text-sm text-gray-500">View reported listings</p>
                            </div>
                            <ArrowRight className="text-gray-300 group-hover:text-[#002147] transition-colors" />
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
