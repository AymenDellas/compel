"use client";

import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex w-full justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto relative flex w-full max-w-3xl items-center justify-between rounded-full p-2 pl-6 bg-background/80 backdrop-blur-xl border border-text/10 shadow-sm supports-[backdrop-filter]:bg-background/60">
        
        {/* Subtle top border highlight (static, no animations) */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-text/10 to-transparent rounded-t-full" />

        {/* Logo Section */}
        <Link 
          href="/"
          className="relative z-10 flex items-center cursor-pointer transition-opacity hover:opacity-70"
          aria-label="Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" className="h-7 sm:h-8 w-auto">
            <text x="45%" y="50%" dominantBaseline="central" textAnchor="middle" style={{ letterSpacing: '-0.02em' }}>
              <tspan className="font-outfit" style={{ fontWeight: 300, fontSize: '72px' }} fill="#FFFFFF">com</tspan>
              <tspan className="font-outfit" style={{ fontWeight: 700, fontSize: '72px' }} fill="#FFFFFF">pel</tspan>
            </text>
            <circle cx="264" cy="72" r="8" fill="#C8F135" />
          </svg>
        </Link>

        {/* CTA Button */}
        <div className="flex items-center">
          <a
            href="https://calendly.com/dellasaymen/discovery-call-compel"
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 rounded-full border border-transparent bg-accent text-background px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold cursor-pointer transition-colors hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Book Discovery Call
            <svg
              className="w-3.5 h-3.5 opacity-80 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </nav>
    </div>
  );
};
