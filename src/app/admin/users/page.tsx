"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { store, User } from "@/lib/store";
import { ArrowLeft, Shield, Ban, CheckCircle, Loader2, Search, UserX } from "lucide-react";
import Link from "next/link";



export default function AdminUsers() {
    const router = useRouter();
    const [admin, setAdmin] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
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

            const allUsers = await store.getAllUsers();
            setUsers(allUsers);
            setFilteredUsers(allUsers);
            setIsLoading(false);
        };

        fetchData();
    }, [router]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = users.filter(u =>
                u.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [searchQuery, users]);

    const handleBanUser = async (userId: string) => {
        const reason = prompt("Enter ban reason:");
        if (!reason || !admin) return;

        await store.banUser(userId, reason, admin.id);

        // Refresh users
        const allUsers = await store.getAllUsers();
        setUsers(allUsers);
        setFilteredUsers(allUsers);
    };

    const handleUnbanUser = async (userId: string) => {
        if (!admin) return;

        await store.unbanUser(userId, admin.id);

        // Refresh users
        const allUsers = await store.getAllUsers();
        setUsers(allUsers);
        setFilteredUsers(allUsers);
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
                            <h1 className="text-xl font-bold text-[#002147]">User Management</h1>
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
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002147] focus:border-[#002147] transition-all"
                        />
                    </div>
                </div>

                {/* Users List */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="divide-y divide-slate-100">
                        {filteredUsers.map((user) => (
                            <div key={user.id} className="p-6 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-[#002147]/5 flex items-center justify-center overflow-hidden border border-[#002147]/10">
                                            {user.profilePic ? (
                                                <img src={user.profilePic} alt={user.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <span className="text-[#002147] font-bold text-lg">{user.name[0]}</span>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold text-slate-900">{user.name}</p>
                                                {user.isAdmin && (
                                                    <span className="text-xs font-bold bg-[#002147] text-white px-2 py-0.5 rounded">ADMIN</span>
                                                )}
                                                {user.isBanned && (
                                                    <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded">BANNED</span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-500 capitalize">{user.role}</p>
                                            {user.isBanned && user.bannedReason && (
                                                <p className="text-xs text-red-600 mt-1">Reason: {user.bannedReason}</p>
                                            )}
                                        </div>
                                    </div>

                                    {!user.isAdmin && (
                                        <div className="flex items-center gap-2">
                                            {user.isBanned ? (
                                                <button
                                                    onClick={() => handleUnbanUser(user.id)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    <CheckCircle size={16} />
                                                    Unban
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleBanUser(user.id)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    <Ban size={16} />
                                                    Ban User
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
