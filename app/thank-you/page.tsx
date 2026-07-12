"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-background text-text flex flex-col font-sans selection:bg-accent selection:text-black">
      <Navbar />

      <section className="flex-1 flex flex-col items-center justify-start pt-32 pb-24 px-6 relative w-full">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0A1205_0%,#000000_70%)] z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 z-0 pointer-events-none" />

        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4 uppercase">
              Almost <span className="text-accent italic font-serif lowercase font-extralight tracking-normal">there</span>
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              We&apos;ve saved your details. Please pick a time below for your free discovery call so we can discuss scaling your business.
            </p>
          </div>

          {/* Calendly Direct Iframe Embed */}
          <div className="w-full rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50 z-20" />
            <iframe
              src="https://calendly.com/dellasaymen/discovery-call-revlane?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=e5e5e5&primary_color=c8f135"
              width="100%"
              height="700"
              frameBorder="0"
              title="Schedule a Discovery Call"
              className="border-0"
            />
          </div>
          
          <div className="mt-12">
            <Link href="/" className="text-neutral-500 hover:text-white transition-colors text-sm underline underline-offset-4">
              Return to Homepage
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
