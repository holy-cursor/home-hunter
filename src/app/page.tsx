"use client";

import Link from "next/link";
import { ArrowRight, Search, Shield, Home, MapPin } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">House Hunter</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/signup/seller" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                Become an Agent
              </Link>
              <Link
                href="/auth/signup/buyer"
                className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium mb-8 animate-fade-in-up">
          <MapPin className="w-3 h-3" />
          <span>Made for OAU Students in Ile-Ife</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
          Find your perfect <br className="hidden sm:block" />
          <span className="text-emerald-600">student home</span> in Ife.
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The most trusted platform for off-campus accommodation at Obafemi Awolowo University. Verified hostels, direct agent contact, and zero stress.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/auth/signup/buyer"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 flex items-center justify-center gap-2 group"
          >
            <span>Find an Apartment</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/auth/signup/seller"
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
          >
            <span>List a Property</span>
          </Link>
        </div>

        {/* Stats / Trust Indicators */}
        <div className="mt-20 pt-10 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl font-bold text-slate-900">100+</div>
            <div className="text-sm text-slate-500 mt-1">Verified Hostels</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">50+</div>
            <div className="text-sm text-slate-500 mt-1">Trusted Agents</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">1k+</div>
            <div className="text-sm text-slate-500 mt-1">Students Helped</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">24/7</div>
            <div className="text-sm text-slate-500 mt-1">Support</div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Search className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Smart Search</h3>
              <p className="text-slate-600 leading-relaxed">
                Filter by location (Asherifa, Damico, Mayfair, etc.), price, and amenities to find exactly what you need.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Verified Listings</h3>
              <p className="text-slate-600 leading-relaxed">
                Every agent is verified with BVN/NIN to ensure your safety and prevent fraud.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Direct Contact</h3>
              <p className="text-slate-600 leading-relaxed">
                Chat directly with agents, negotiate prices, and schedule inspections instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center">
              <Home className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-slate-900">House Hunter</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} House Hunter. Built for OAU.
          </p>
        </div>
      </footer>
    </div>
  );
}
