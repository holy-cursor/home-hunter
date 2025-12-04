"use client";

import Link from "next/link";
import { ArrowRight, Search, Shield, Home, MapPin, MessageSquare, CheckCircle2, Star, Users, Clock, Zap } from "lucide-react";

import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#FFC72C] selection:text-[#002147]">
      <Navbar />

      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.jpg"
            alt="Modern Student Accommodation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#002147]/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          {/* Kicker */}
          <div className="inline-block mb-6 animate-fade-in-up">
            <span className="py-2 px-6 rounded-full bg-white/10 text-[#FFC72C] text-sm font-bold tracking-wide uppercase border border-white/20 backdrop-blur-sm">
              Great Living for Great Ife
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white tracking-tight mb-8 leading-[1.1] animate-fade-in-up delay-100">
            Get Accommodation <br className="hidden sm:block" />
            <span className="text-[#FFC72C]">Conveniently</span> in Ile-Ife
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up delay-200">
            Discover the best student hostels and apartments near OAU campus.
            Secure, verified, and hassle-free booking for your peace of mind.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Link
              href="/auth/signup/buyer"
              className="w-full sm:w-auto px-8 py-4 bg-[#FFC72C] text-[#002147] font-bold rounded-xl hover:bg-[#ffcf4d] transition-all shadow-xl shadow-[#FFC72C]/20 hover:-translate-y-1 flex items-center justify-center gap-2 group text-lg"
            >
              <span>Find an Apartment</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/auth/signup/seller"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2 backdrop-blur-sm text-lg"
            >
              <span>List a Property</span>
            </Link>
          </div>
        </div>
      </main>

      {/* How It Works - White Background */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#002147] mb-4">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Your journey to a new home in 3 simple steps</p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-12">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[#002147]/0 via-[#002147]/20 to-[#002147]/0 border-t-2 border-dashed border-[#002147]/30 z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center shadow-xl shadow-[#002147]/5 mb-8 border-4 border-white group-hover:scale-110 transition-transform duration-300 relative">
                <div className="w-16 h-16 bg-[#FFC72C]/20 rounded-full flex items-center justify-center text-[#002147]">
                  <Search className="w-8 h-8" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#002147] rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white">1</div>
              </div>
              <h3 className="text-xl font-bold text-[#002147] mb-3">Search</h3>
              <p className="text-slate-600 leading-relaxed max-w-xs">
                Browse verified listings in your preferred location. Filter by price and amenities.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center shadow-xl shadow-[#002147]/5 mb-8 border-4 border-white group-hover:scale-110 transition-transform duration-300 relative">
                <div className="w-16 h-16 bg-[#FFC72C]/20 rounded-full flex items-center justify-center text-[#002147]">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#002147] rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white">2</div>
              </div>
              <h3 className="text-xl font-bold text-[#002147] mb-3">Connect</h3>
              <p className="text-slate-600 leading-relaxed max-w-xs">
                Chat directly with verified agents. Ask questions and schedule inspections instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center shadow-xl shadow-[#002147]/5 mb-8 border-4 border-white group-hover:scale-110 transition-transform duration-300 relative">
                <div className="w-16 h-16 bg-[#FFC72C]/20 rounded-full flex items-center justify-center text-[#002147]">
                  <Home className="w-8 h-8" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#002147] rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white">3</div>
              </div>
              <h3 className="text-xl font-bold text-[#002147] mb-3">Move In</h3>
              <p className="text-slate-600 leading-relaxed max-w-xs">
                Pay securely and move into your new home. Enjoy your stay at OAU!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Navy Background */}
      <section className="py-24 bg-[#002147] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#FFC72C] rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose aparteh?</h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">We make student housing simple, safe, and stress-free.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8 text-[#002147] hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-black/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC72C]/10 rounded-bl-full group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-14 h-14 bg-[#002147]/5 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-[#002147]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">100% Verified</h3>
              <p className="text-slate-600 leading-relaxed">
                Every listing and agent is manually verified. We check NIN/BVN to ensure zero scams and complete safety for every student.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8 text-[#002147] hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-black/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC72C]/10 rounded-bl-full group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-14 h-14 bg-[#002147]/5 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-[#002147]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Fast & Easy</h3>
              <p className="text-slate-600 leading-relaxed">
                No more walking under the sun. Find, view, and book your apartment from your phone in minutes, not days.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-8 text-[#002147] hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-black/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC72C]/10 rounded-bl-full group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-14 h-14 bg-[#002147]/5 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-[#002147]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Student First</h3>
              <p className="text-slate-600 leading-relaxed">
                Built by OAU students, for OAU students. We understand your needs and budget better than anyone else.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Locations - White Background */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#002147] mb-2">Popular Locations</h2>
              <p className="text-slate-600">Find apartments in student-favorite areas</p>
            </div>
            <Link href="/explore" className="hidden sm:flex items-center gap-2 text-[#002147] font-bold hover:text-[#FFC72C] transition-colors">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto pb-12 px-4 sm:px-6 lg:px-8 gap-6 no-scrollbar snap-x snap-mandatory max-w-7xl mx-auto">
          {[
            { name: 'Asherifa', img: '/locations/ife.jpg' },
            { name: 'Damico', img: '/locations/ife.jpg' },
            { name: 'Mayfair', img: '/locations/mayfair.jpg' },
            { name: 'Campus Gate', img: '/locations/campus gate.jpg' },
            { name: 'Moremi Estate', img: '/locations/ife.jpg' },
            { name: 'Parakin', img: '/locations/ife.jpg' }
          ].map((location, index) => (
            <Link
              key={location.name}
              href="/explore"
              className="flex-none w-72 sm:w-80 snap-center group relative rounded-3xl overflow-hidden aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={location.img}
                alt={location.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="flex items-center gap-2 text-[#FFC72C] mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase tracking-wider">Explore</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{location.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:hidden">
          <Link href="/explore" className="inline-flex items-center gap-2 text-[#002147] font-bold hover:text-[#FFC72C] transition-colors">
            View All Locations <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002147] text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shadow-md backdrop-blur-sm">
              <Home className="w-5 h-5 text-[#FFC72C]" />
            </div>
            <span className="font-bold text-xl">parteh</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} aparteh. Built with ❤️ for OAU.
          </p>
        </div>
      </footer>
    </div>
  );
}
