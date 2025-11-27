"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { store } from "@/lib/store";
import { Loader2, Home, Mail, GraduationCap, ArrowRight, Lock } from "lucide-react";

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
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-[#FFC72C] selection:text-[#002147]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-[#002147] rounded-lg flex items-center justify-center">
                        <Home className="w-5 h-5 text-[#FFC72C]" />
                    </div>
                    <span className="text-xl font-bold text-[#002147]">House Hunter</span>
                </Link>
                <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
                    Find Your Home
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Or{" "}
                    <Link href="/auth/signup/seller" className="font-medium text-[#002147] hover:text-[#FFC72C] transition-colors">
                        become an agent?
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
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                                Full Name
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Home className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg focus:ring-[#002147] focus:border-[#002147] p-2.5 border"
                                    placeholder="Sarah Student"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

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
                                    minLength={6}
                                    className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg focus:ring-[#002147] focus:border-[#002147] p-2.5 border"
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
                                className="h-4 w-4 text-[#002147] focus:ring-[#002147] border-slate-300 rounded"
                                checked={formData.isStudent}
                                onChange={(e) => setFormData({ ...formData, isStudent: e.target.checked })}
                            />
                            <label htmlFor="isStudent" className="ml-2 block text-sm text-slate-900">
                                I am a student
                            </label>
                        </div>

                        {formData.isStudent && (
                            <div className="animate-fade-in">
                                <label htmlFor="studentLevel" className="block text-sm font-medium text-slate-700">
                                    Academic Level
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <GraduationCap className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <select
                                        id="studentLevel"
                                        name="studentLevel"
                                        className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg focus:ring-[#002147] focus:border-[#002147] p-2.5 border appearance-none"
                                        value={formData.studentLevel}
                                        onChange={(e) => setFormData({ ...formData, studentLevel: e.target.value })}
                                    >
                                        {studentLevels.map((level) => (
                                            <option key={level} value={level}>
                                                {level}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#002147] bg-[#FFC72C] hover:bg-[#ffcf4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFC72C] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold"
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
                    </form>
                </div>
            </div>
        </div>
    );
}
