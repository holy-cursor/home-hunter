"use client";

import Link from "next/link";
import { ArrowRight, Search, Shield, Home, MapPin, MessageSquare, CheckCircle2, Star, Users, Clock, Zap } from "lucide-react";

import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#FFC72C] selection:text-[#002147]">
      <Navbar />

      {/* Hero Section */}
      <main className="relative bg-[#002147] text-white overflow-hidden pt-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFC72C] text-sm font-medium mb-8 backdrop-blur-sm animate-fade-in-up">
            <MapPin className="w-4 h-4" />
            <span>Made for OAU Students in Ile-Ife</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8 max-w-5xl mx-auto leading-[1.1]">
            Find your perfect <br className="hidden sm:block" />
            <span className="text-[#FFC72C]">student home</span> in Ife.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            The most trusted platform for off-campus accommodation at Obafemi Awolowo University. Verified hostels, direct agent contact, and zero stress.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup/buyer"
              className="w-full sm:w-auto px-8 py-4 bg-[#FFC72C] text-[#002147] font-bold rounded-xl hover:bg-[#ffcf4d] transition-all shadow-xl shadow-[#FFC72C]/20 hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              <span>Find an Apartment</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/auth/signup/seller"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <span>List a Property</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Stats / Trust Indicators */}
      <div className="bg-[#001835] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
            <div>
              <div className="text-4xl font-bold text-[#FFC72C] mb-1">100+</div>
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Verified Hostels</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FFC72C] mb-1">50+</div>
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Trusted Agents</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FFC72C] mb-1">1k+</div>
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Students Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FFC72C] mb-1">24/7</div>
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="why-choose-us" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#002147] mb-4 tracking-tight">Why Students Choose Us</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Everything you need to find your perfect student accommodation in one place.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#FFC72C]/50 hover:shadow-xl hover:shadow-[#FFC72C]/5 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-7 h-7 text-[#002147]" />
              </div>
              <h3 className="text-xl font-bold text-[#002147] mb-3">Smart Search</h3>
              <p className="text-slate-600 leading-relaxed">
                Filter by location (Asherifa, Damico, Mayfair, etc.), price, and amenities to find exactly what you need.
              </p>
            </div>
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#FFC72C]/50 hover:shadow-xl hover:shadow-[#FFC72C]/5 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-7 h-7 text-[#002147]" />
              </div>
              <h3 className="text-xl font-bold text-[#002147] mb-3">Verified Listings</h3>
              <p className="text-slate-600 leading-relaxed">
                Every agent is verified with BVN/NIN to ensure your safety and prevent fraud.
              </p>
            </div>
            <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#FFC72C]/50 hover:shadow-xl hover:shadow-[#FFC72C]/5 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-7 h-7 text-[#002147]" />
              </div>
              <h3 className="text-xl font-bold text-[#002147] mb-3">Direct Contact</h3>
              <p className="text-slate-600 leading-relaxed">
                Chat directly with agents, negotiate prices, and schedule inspections instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#002147] mb-4 tracking-tight">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Find your perfect home in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-[#002147] rounded-full flex items-center justify-center text-[#FFC72C] font-bold text-xl mb-6 shadow-lg shadow-[#002147]/20">1</div>
                <h3 className="text-xl font-bold text-[#002147] mb-3">Browse Listings</h3>
                <p className="text-slate-600 leading-relaxed">
                  Explore verified hostels across popular locations near OAU campus with detailed photos and descriptions.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-[#002147] rounded-full flex items-center justify-center text-[#FFC72C] font-bold text-xl mb-6 shadow-lg shadow-[#002147]/20">2</div>
                <h3 className="text-xl font-bold text-[#002147] mb-3">Contact Agents</h3>
                <p className="text-slate-600 leading-relaxed">
                  Chat with verified agents directly through our platform. Ask questions, negotiate, and schedule viewings.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-[#002147] rounded-full flex items-center justify-center text-[#FFC72C] font-bold text-xl mb-6 shadow-lg shadow-[#002147]/20">3</div>
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
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#002147] mb-4 tracking-tight">Popular Locations</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Find apartments in the most sought-after areas around OAU</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Asherifa', 'Damico', 'Mayfair', 'Campus Gate', 'Moremi Estate', 'Ede Road', 'Parakin', 'Ibadan Road'].map((location) => (
              <Link
                key={location}
                href="/explore"
                className="group bg-white hover:bg-[#002147] rounded-2xl p-8 text-center transition-all duration-300 border border-slate-100 hover:border-[#002147] shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <MapPin className="w-8 h-8 text-[#002147] group-hover:text-[#FFC72C] mx-auto mb-4 transition-colors duration-300" />
                <h3 className="font-bold text-slate-900 group-hover:text-white transition-colors duration-300">{location}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#002147] py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC72C] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFC72C] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">What Students Say</h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">Hear from OAU students who found their perfect home</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFC72C] text-[#FFC72C]" />
                ))}
              </div>
              <p className="text-slate-200 mb-8 leading-relaxed text-lg italic">
                "Found my dream apartment in Asherifa within 2 days! The agents were professional and the process was seamless."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFC72C] rounded-full flex items-center justify-center text-[#002147] font-bold text-xl shadow-lg">A</div>
                <div>
                  <div className="font-bold text-white text-lg">Adewale O.</div>
                  <div className="text-sm text-slate-400">Part 3, Engineering</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFC72C] text-[#FFC72C]" />
                ))}
              </div>
              <p className="text-slate-200 mb-8 leading-relaxed text-lg italic">
                "As a fresher, I was worried about finding safe accommodation. House Hunter made it so easy and stress-free!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFC72C] rounded-full flex items-center justify-center text-[#002147] font-bold text-xl shadow-lg">C</div>
                <div>
                  <div className="font-bold text-white text-lg">Chioma N.</div>
                  <div className="text-sm text-slate-400">Part 1, Medicine</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFC72C] text-[#FFC72C]" />
                ))}
              </div>
              <p className="text-slate-200 mb-8 leading-relaxed text-lg italic">
                "The verification system gave me peace of mind. No scams, just genuine agents with real properties."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFC72C] rounded-full flex items-center justify-center text-[#002147] font-bold text-xl shadow-lg">T</div>
                <div>
                  <div className="font-bold text-white text-lg">Tunde A.</div>
                  <div className="text-sm text-slate-400">Part 4, Law</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#002147] rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden shadow-2xl shadow-[#002147]/20">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFC72C] rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FFC72C] rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                Ready to Find Your Perfect Home?
              </h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Join thousands of OAU students who have found their ideal accommodation through House Hunter.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/auth/signup/buyer"
                  className="w-full sm:w-auto px-8 py-4 bg-[#FFC72C] text-[#002147] font-bold rounded-xl hover:bg-[#ffcf4d] transition-all shadow-xl shadow-[#FFC72C]/20 hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/explore"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <Search className="w-5 h-5" />
                  <span>Browse Listings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#002147] rounded-lg flex items-center justify-center shadow-md">
              <Home className="w-4 h-4 text-[#FFC72C]" />
            </div>
            <span className="font-bold text-[#002147] text-lg">House Hunter</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} House Hunter. Built with ❤️ for OAU.
          </p>
        </div>
      </footer>
    </div>
  );
}
