"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { store } from "@/lib/store";
import { Loader2, Home, Mail, GraduationCap, ArrowRight, Lock, Star, CheckCircle2 } from "lucide-react";

export default function BuyerSignup() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        isStudent: false,
        studentLevel: "Part 1",
    });

    const studentLevels = [
        "Part 1", "Part 2", "Part 3", "Part 4", "Part 5", "Part 6", "Masters"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const { user, error } = await store.registerUser({
                name: formData.name,
                email: formData.email,
                role: "buyer",
                isStudent: formData.isStudent,
                studentLevel: formData.isStudent ? formData.studentLevel : undefined,
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
                            Find your perfect student home in <span className="text-[#FFC72C]">Ile-Ife</span>.
                        </h1>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            Join thousands of OAU students who trust aparteh for safe, verified, and affordable off-campus accommodation.
                        </p>

                        <div className="space-y-4 mb-12">
                            <div className="flex items-center gap-3 text-slate-200">
                                <CheckCircle2 className="w-5 h-5 text-[#FFC72C]" />
                                <span>Verified Agents & Landlords</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-200">
                                <CheckCircle2 className="w-5 h-5 text-[#FFC72C]" />
                                <span>Direct Chat System</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-200">
                                <CheckCircle2 className="w-5 h-5 text-[#FFC72C]" />
                                <span>Secure Booking Process</span>
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
                        "I found my apartment in Asherifa within 24 hours. The platform is so easy to use and the agents are very responsive."
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FFC72C] rounded-full flex items-center justify-center text-[#002147] font-bold">T</div>
                        <div>
                            <div className="font-bold">Tolu A.</div>
                            <div className="text-xs text-slate-400">Part 4, Law</div>
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
                            Create Account
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Looking for an apartment? Sign up below.
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
                                    <Home className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent transition-all sm:text-sm"
                                    placeholder="e.g. Sarah Student"
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
                                I am an OAU student
                            </label>
                        </div>

                        {formData.isStudent && (
                            <div className="animate-fade-in">
                                <label htmlFor="studentLevel" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Academic Level
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <GraduationCap className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <select
                                        id="studentLevel"
                                        name="studentLevel"
                                        className="block w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent transition-all sm:text-sm appearance-none bg-white"
                                        value={formData.studentLevel}
                                        onChange={(e) => setFormData({ ...formData, studentLevel: e.target.value })}
                                    >
                                        {studentLevels.map((level) => (
                                            <option key={level} value={level}>
                                                {level}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}

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
                                    href="/auth/login/buyer"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-[#002147] transition-all"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/auth/signup/seller"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-[#002147] transition-all"
                                >
                                    Become Agent
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
