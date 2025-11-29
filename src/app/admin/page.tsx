"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { store, User } from "@/lib/store";
import { Users, Home as HomeIcon, MessageSquare, TrendingUp, Shield, Activity, Loader2, LogOut } from "lucide-react";
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

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#002147]" size={32} /></div>;
    if (!user || !user.isAdmin) return null;

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-[#FFC72C] selection:text-[#002147]">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-[#002147] rounded-xl flex items-center justify-center shadow-lg">
                                <Shield className="w-5 h-5 text-[#FFC72C]" />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-[#002147] tracking-tight">Admin Dashboard</span>
                                <p className="text-xs text-slate-500">House Hunter</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden md:block">
                                    <div className="text-sm font-bold text-[#002147]">{user.name}</div>
                                    <div className="text-xs text-slate-500">Administrator</div>
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
                                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium text-sm"
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
                    <p className="text-slate-500 text-sm">Monitor and manage House Hunter platform</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <Users className="w-6 h-6 text-[#002147]" />
                            </div>
                            <span className="text-xs font-bold text-[#002147] bg-blue-50 px-2.5 py-1 rounded-full">Total</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{stats?.totalUsers || 0}</div>
                        <div className="text-sm text-slate-500 font-medium">Total Users</div>
                        <div className="mt-2 text-xs text-slate-400">
                            {stats?.buyers || 0} buyers • {stats?.sellers || 0} sellers
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-emerald-50 rounded-xl">
                                <HomeIcon className="w-6 h-6 text-emerald-600" />
                            </div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Listings</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{stats?.totalListings || 0}</div>
                        <div className="text-sm text-slate-500 font-medium">Total Listings</div>
                        <div className="mt-2 text-xs text-slate-400">
                            {stats?.activeListings || 0} active • {stats?.soldListings || 0} sold
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-50 rounded-xl">
                                <MessageSquare className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">Chats</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{stats?.totalChats || 0}</div>
                        <div className="text-sm text-slate-500 font-medium">Active Conversations</div>
                    </div>

                    <div className="bg-gradient-to-br from-[#002147] to-[#001835] rounded-2xl p-6 text-white shadow-lg shadow-[#002147]/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/10 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-[#FFC72C]" />
                            </div>
                            <Activity className="w-5 h-5 text-[#FFC72C]" />
                        </div>
                        <div className="text-3xl font-bold mb-1">Active</div>
                        <div className="text-sm text-slate-300 font-medium">Platform Status</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                        href="/admin/users"
                        className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#002147]/20 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-[#002147] transition-colors">
                                <Users className="w-6 h-6 text-[#002147] group-hover:text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 group-hover:text-[#002147]">User Management</h3>
                                <p className="text-sm text-slate-500">View and manage users</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/chats"
                        className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#002147]/20 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-[#002147] transition-colors">
                                <MessageSquare className="w-6 h-6 text-purple-600 group-hover:text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 group-hover:text-[#002147]">Chat Monitoring</h3>
                                <p className="text-sm text-slate-500">Monitor conversations</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/listings"
                        className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#002147]/20 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-[#002147] transition-colors">
                                <HomeIcon className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 group-hover:text-[#002147]">Listing Management</h3>
                                <p className="text-sm text-slate-500">Manage property listings</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}
