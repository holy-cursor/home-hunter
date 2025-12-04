"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, X, Search, Shield } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Explore", href: "/explore" },
        { name: "About", href: "/#why-choose-us" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-[background-color,padding,box-shadow] duration-300 overflow-visible ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group relative z-[102]">
                        <div className="w-10 h-10 bg-[#002147] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <Home className="w-5 h-5 text-[#FFC72C]" />
                        </div>
                        <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled || isMobileMenuOpen ? "text-[#002147]" : "text-white"}`}>
                            aparteh
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-[#FFC72C] ${isScrolled ? "text-slate-600" : "text-slate-200"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/auth/login/buyer"
                            className={`text-sm font-medium transition-colors hover:text-[#FFC72C] ${isScrolled ? "text-slate-600" : "text-white"
                                }`}
                        >
                            Log In
                        </Link>
                        <Link
                            href="/auth/signup/buyer"
                            className="px-5 py-2.5 bg-[#FFC72C] text-[#002147] text-sm font-bold rounded-full hover:bg-[#ffcf4d] transition-all shadow-lg hover:shadow-[#FFC72C]/20 hover:-translate-y-0.5"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden p-2 rounded-full transition-all z-[102] relative shadow-md ${isMobileMenuOpen
                                ? "bg-slate-100 text-[#002147]"
                                : (isScrolled ? "bg-[#002147] text-white" : "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20")
                            }`}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay (Full Screen) */}
            <div
                className={`fixed inset-0 bg-white z-[101] md:hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isMobileMenuOpen ? "opacity-100 pointer-events-auto clip-circle-full" : "opacity-0 pointer-events-none clip-circle-0"
                    }`}
                style={{
                    clipPath: isMobileMenuOpen ? "circle(150% at top right)" : "circle(0% at top right)",
                    height: '100dvh'
                }}
            >
                {/* Background Patterns */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#FFC72C]/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#002147]/5 rounded-full blur-3xl"></div>
                    {/* Decorative Vector Lines */}
                    <svg className="absolute top-1/2 left-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 50 Q 50 0 100 50 T 200 50" stroke="#002147" strokeWidth="2" fill="none" />
                        <path d="M0 70 Q 50 20 100 70 T 200 70" stroke="#002147" strokeWidth="2" fill="none" />
                    </svg>
                </div>

                <div className="flex flex-col h-full justify-center items-center p-8 space-y-8 relative z-10">
                    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="group flex items-center gap-4 text-3xl font-bold text-[#002147] hover:text-[#FFC72C] transition-colors w-full justify-center"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {link.name === "Home" && <Home className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />}
                                {link.name === "Explore" && <Search className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />}
                                {link.name === "About" && <Shield className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />}
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="w-full max-w-xs h-px bg-slate-100 my-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#002147]/20 to-transparent"></div>
                    </div>

                    <div className="flex flex-col gap-4 w-full max-w-sm">
                        <Link
                            href="/auth/login/buyer"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full py-4 text-center text-[#002147] font-bold border-2 border-[#002147] rounded-xl hover:bg-slate-50 transition-colors text-lg flex items-center justify-center gap-2"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/auth/signup/buyer"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full py-4 text-center bg-[#002147] text-white font-bold rounded-xl hover:bg-[#001835] transition-colors shadow-xl shadow-[#002147]/20 text-lg flex items-center justify-center gap-2"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
