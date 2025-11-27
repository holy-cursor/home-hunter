"use client";

import Link from "next/link";
import { ArrowRight, Search, Shield, Home, MapPin, MessageSquare, CheckCircle2, Star, Users, Clock, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#FFC72C] selection:text-[#002147]">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#002147] rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-[#FFC72C]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#002147]">House Hunter</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login/buyer" className="text-sm font-medium text-slate-600 hover:text-[#002147] transition-colors">
                Log In
              </Link>
              <Link href="/auth/signup/seller" className="text-sm font-medium text-slate-600 hover:text-[#002147] transition-colors">
                Become an Agent
              </Link>
              <Link
                href="/auth/signup/buyer"
                className="px-4 py-2 bg-[#002147] text-white text-sm font-medium rounded-full hover:bg-[#001835] transition-all border border-transparent hover:border-[#FFC72C]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative bg-[#002147] text-white overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FFC72C] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#FFC72C] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002147] border border-[#FFC72C]/30 text-[#FFC72C] text-xs font-medium mb-8 animate-fade-in-up">
            <MapPin className="w-3 h-3" />
            <span>Made for OAU Students in Ile-Ife</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
            Find your perfect <br className="hidden sm:block" />
            <span className="text-[#FFC72C]">student home</span> in Ife.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            The most trusted platform for off-campus accommodation at Obafemi Awolowo University. Verified hostels, direct agent contact, and zero stress.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup/buyer"
              className="w-full sm:w-auto px-8 py-4 bg-[#FFC72C] text-[#002147] font-bold rounded-xl hover:bg-[#ffcf4d] transition-all shadow-lg shadow-[#FFC72C]/20 flex items-center justify-center gap-2 group"
            >
              <span>Find an Apartment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/auth/signup/seller"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold rounded-xl border border-white/20 hover:border-[#FFC72C] hover:text-[#FFC72C] transition-all flex items-center justify-center gap-2"
            >
              <span>List a Property</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Stats / Trust Indicators */}
      <div className="bg-[#001835] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#FFC72C]">100+</div>
              <div className="text-sm text-slate-400 mt-1">Verified Hostels</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FFC72C]">50+</div>
              <div className="text-sm text-slate-400 mt-1">Trusted Agents</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FFC72C]">1k+</div>
              <div className="text-sm text-slate-400 mt-1">Students Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FFC72C]">24/7</div>
              <div className="text-sm text-slate-400 mt-1">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#002147] mb-4">Why Students Choose Us</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Everything you need to find your perfect student accommodation in one place.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#002147]/5 rounded-xl flex items-center justify-center">
                <Search className="w-6 h-6 text-[#002147]" />
              </div>
              <h3 className="text-xl font-bold text-[#002147]">Smart Search</h3>
              <p className="text-slate-600 leading-relaxed">
                Filter by location (Asherifa, Damico, Mayfair, etc.), price, and amenities to find exactly what you need.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#002147]/5 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#002147]" />
              </div>
              <h3 className="text-xl font-bold text-[#002147]">Verified Listings</h3>
              <p className="text-slate-600 leading-relaxed">
                Every agent is verified with BVN/NIN to ensure your safety and prevent fraud.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#002147]/5 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#002147]" />
              </div>
              <h3 className="text-xl font-bold text-[#002147]">Direct Contact</h3>
              <p className="text-slate-600 leading-relaxed">
                Chat directly with agents, negotiate prices, and schedule inspections instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#002147] mb-4">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Find your perfect home in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#FFC72C] rounded-full flex items-center justify-center text-[#002147] font-bold text-xl mb-6">1</div>
                <h3 className="text-xl font-bold text-[#002147] mb-3">Browse Listings</h3>
                <p className="text-slate-600 leading-relaxed">
                  Explore verified hostels across popular locations near OAU campus with detailed photos and descriptions.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#FFC72C] rounded-full flex items-center justify-center text-[#002147] font-bold text-xl mb-6">2</div>
                <h3 className="text-xl font-bold text-[#002147] mb-3">Contact Agents</h3>
                <p className="text-slate-600 leading-relaxed">
                  Chat with verified agents directly through our platform. Ask questions, negotiate, and schedule viewings.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#FFC72C] rounded-full flex items-center justify-center text-[#002147] font-bold text-xl mb-6">3</div>
                <h3 className="text-xl font-bold text-[#002147] mb-3">Move In</h3>
                <p className="text-slate-600 leading-relaxed">
                  Complete your booking securely and move into your new home. We're here to support you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#002147] mb-4">Popular Locations</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Find apartments in the most sought-after areas around OAU</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Asherifa', 'Damico', 'Mayfair', 'Campus Gate', 'Moremi Estate', 'Ede Road', 'Parakin', 'Ibadan Road'].map((location) => (
              <Link
                key={location}
                href="/explore"
                className="group bg-slate-50 hover:bg-[#002147] rounded-xl p-6 text-center transition-all border border-slate-200 hover:border-[#FFC72C]"
              >
                <MapPin className="w-8 h-8 text-[#002147] group-hover:text-[#FFC72C] mx-auto mb-3 transition-colors" />
                <h3 className="font-bold text-slate-900 group-hover:text-white transition-colors">{location}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#002147] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Students Say</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">Hear from OAU students who found their perfect home</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFC72C] text-[#FFC72C]" />
                ))}
              </div>
              <p className="text-white mb-6 leading-relaxed">
                "Found my dream apartment in Asherifa within 2 days! The agents were professional and the process was seamless."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFC72C] rounded-full flex items-center justify-center text-[#002147] font-bold">A</div>
                <div>
                  <div className="font-bold text-white">Adewale O.</div>
                  <div className="text-sm text-slate-400">Part 3, Engineering</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFC72C] text-[#FFC72C]" />
                ))}
              </div>
              <p className="text-white mb-6 leading-relaxed">
                "As a fresher, I was worried about finding safe accommodation. House Hunter made it so easy and stress-free!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFC72C] rounded-full flex items-center justify-center text-[#002147] font-bold">C</div>
                <div>
                  <div className="font-bold text-white">Chioma N.</div>
                  <div className="text-sm text-slate-400">Part 1, Medicine</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFC72C] text-[#FFC72C]" />
                ))}
              </div>
              <p className="text-white mb-6 leading-relaxed">
                "The verification system gave me peace of mind. No scams, just genuine agents with real properties."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFC72C] rounded-full flex items-center justify-center text-[#002147] font-bold">T</div>
                <div>
                  <div className="font-bold text-white">Tunde A.</div>
                  <div className="text-sm text-slate-400">Part 4, Law</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-[#002147] to-[#001835] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of OAU students who have found their ideal accommodation through House Hunter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup/buyer"
              className="w-full sm:w-auto px-8 py-4 bg-[#FFC72C] text-[#002147] font-bold rounded-xl hover:bg-[#ffcf4d] transition-all shadow-lg shadow-[#FFC72C]/20 flex items-center justify-center gap-2 group"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/explore"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/20 hover:border-[#FFC72C] hover:text-[#FFC72C] transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>Browse Listings</span>
            </Link>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#002147] rounded-md flex items-center justify-center">
              <Home className="w-3 h-3 text-[#FFC72C]" />
            </div>
            <span className="font-bold text-[#002147]">House Hunter</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} House Hunter. Built for OAU.
          </p>
        </div>
      </footer>
    </div>
  );
}
