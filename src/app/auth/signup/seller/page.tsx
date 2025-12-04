"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { store } from "@/lib/store";
import { Loader2, UserCheck, Mail, Shield, ArrowRight, Home, Lock, CheckCircle2, Star } from "lucide-react";

export default function SellerSignup() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        isStudent: false,
        verificationId: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const { user, error } = await store.registerUser({
                name: formData.name,
                email: formData.email,
                role: "seller",
                isStudent: formData.isStudent,
                bvnVerified: true, // Mock verification for now
            }, formData.password);

            if (error) {
                setError(error.message || "Failed to create account");
                setIsLoading(false);
                return;
            }

            if (user) {
                router.push("/profile/setup");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white selection:bg-[#FFC72C] selection:text-[#002147]">
            {/* Left Panel - Branding & Testimonials (Desktop Only) */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#002147] text-white flex-col justify-between p-12 relative overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FFC72C] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFC72C] rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 mb-12">
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                            <Home className="w-5 h-5 text-[#FFC72C]" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">aparteh</span>
                    </Link>

                    <div className="max-w-md">
                        <h1 className="text-4xl font-bold mb-6 leading-tight">
                            Grow your real estate business in <span className="text-[#FFC72C]">Ile-Ife</span>.
                        </h1>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            Connect directly with thousands of verified OAU students looking for accommodation. No middlemen, no stress.
                        </p>

                        <div className="space-y-4 mb-12">
                            <div className="flex items-center gap-3 text-slate-200">
                                <CheckCircle2 className="w-5 h-5 text-[#FFC72C]" />
                                <span>Verified Student Tenants</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-200">
                                <CheckCircle2 className="w-5 h-5 text-[#FFC72C]" />
                                <span>Instant Listing Management</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-200">
                                <CheckCircle2 className="w-5 h-5 text-[#FFC72C]" />
                                <span>Secure Direct Payments</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className="w-4 h-4 fill-[#FFC72C] text-[#FFC72C]" />
                        ))}
                    </div>
                    <p className="text-slate-200 mb-4 italic">
                        "Since listing my properties on aparteh, I've had 100% occupancy rates. The verification system builds trust instantly."
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FFC72C] rounded-full flex items-center justify-center text-[#002147] font-bold">A</div>
                        <div>
                            <div className="font-bold">Alhaji Adebayo</div>
                            <div className="text-xs text-slate-400">Property Manager</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="lg:hidden mb-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#002147] rounded-lg flex items-center justify-center">
                                <Home className="w-5 h-5 text-[#FFC72C]" />
                            </div>
                            <span className="text-xl font-bold text-[#002147]">aparteh</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold tracking-tight text-[#002147]">
                            Become an Agent
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            List your properties and reach students instantly.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                                <div className="mt-0.5"><CheckCircle2 className="w-4 h-4 text-red-600 rotate-45" /></div>
                                <span>{error}</span>
                            </div>
                        )}

                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserCheck className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent transition-all sm:text-sm"
                                    placeholder="e.g. John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent transition-all sm:text-sm"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    minLength={6}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent transition-all sm:text-sm"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="isStudent"
                                name="isStudent"
                                type="checkbox"
                                className="h-4 w-4 text-[#002147] focus:ring-[#002147] border-slate-300 rounded cursor-pointer"
                                checked={formData.isStudent}
                                onChange={(e) => setFormData({ ...formData, isStudent: e.target.checked })}
                            />
                            <label htmlFor="isStudent" className="ml-2 block text-sm text-slate-700 cursor-pointer select-none">
                                I am a student at OAU
                            </label>
                        </div>

                        <div>
                            <label htmlFor="verification" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                BVN or NIN
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Shield className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="verification"
                                    name="verification"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent transition-all sm:text-sm"
                                    placeholder="Enter your BVN or NIN"
                                    value={formData.verificationId}
                                    onChange={(e) => setFormData({ ...formData, verificationId: e.target.value })}
                                />
                            </div>
                            <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                Required for agent verification
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-[#FFC72C]/20 text-sm font-bold text-[#002147] bg-[#FFC72C] hover:bg-[#ffcf4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFC72C] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-slate-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <Link
                                    href="/auth/login/seller"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-[#002147] transition-all"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/auth/signup/buyer"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-[#002147] transition-all"
                                >
                                    Find Home
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
