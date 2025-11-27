"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { store } from "@/lib/store";
import { Loader2, Home, Mail, Lock, ArrowRight } from "lucide-react";

export default function BuyerLogin() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const { data, error: loginError } = await store.login(formData.email, formData.password);

            if (loginError) {
                setError(loginError.message || "Failed to log in");
                setIsLoading(false);
                return;
            }

            if (data.user) {
                // Verify user role
                const currentUser = await store.getCurrentUser();
                if (currentUser?.role !== 'buyer') {
                    setError("This account is not registered as a buyer. Please use the seller login.");
                    await store.logout();
                    setIsLoading(false);
                    return;
                }
                router.push("/dashboard/buyer");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-[#FFC72C] selection:text-[#002147]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-[#002147] rounded-lg flex items-center justify-center">
                        <Home className="w-5 h-5 text-[#FFC72C]" />
                    </div>
                    <span className="text-xl font-bold text-[#002147]">House Hunter</span>
                </Link>
                <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
                    Welcome Back
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link href="/auth/signup/buyer" className="font-medium text-[#002147] hover:text-[#FFC72C] transition-colors">
                        Sign up here
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-xl sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                Email Address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg focus:ring-[#002147] focus:border-[#002147] p-2.5 border"
                                    placeholder="sarah@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg focus:ring-[#002147] focus:border-[#002147] p-2.5 border"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#002147] bg-[#FFC72C] hover:bg-[#ffcf4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFC72C] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    <span>Logging in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Log In</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                        <div className="text-center">
                            <Link href="/auth/signup/seller" className="text-sm text-slate-600 hover:text-[#002147] transition-colors">
                                Are you an agent? <span className="font-medium">Login as seller</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
