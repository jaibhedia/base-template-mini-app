"use client";

import React, { useRef } from 'react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';

interface LandingScreenProps {
  onStart: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      // Connect with the first available connector (Frame connector)
      const frameConnector = connectors[0];
      if (frameConnector) {
        connect({ connector: frameConnector });
      }
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col">
      {/* Full Screen Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        loop
      >
        <source src="./bg-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

      {/* Glass Morphism Header */}
      <div className="relative z-50 mx-4 mt-4 mb-2">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-[#0052FF]/30 shadow-lg shadow-[#0052FF]/10 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Logo/Title */}
            <div className="text-white text-lg font-semibold tracking-wide">
              Base Ninja
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={onStart}
                className="px-6 py-2 text-sm font-medium text-white bg-[#0052FF]/20 hover:bg-[#0052FF]/30 backdrop-blur-sm rounded-xl border border-[#0052FF]/40 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[#0052FF]/20"
              >
                Play
              </button>
              <button
                onClick={handleConnect}
                className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isConnected
                    ? 'text-green-400 bg-green-500/10 border-green-500/30'
                    : 'text-white bg-[#0052FF]/20 hover:bg-[#0052FF]/30 border-[#0052FF]/40 shadow-[#0052FF]/20'
                }`}
              >
                {isConnected ? (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    {truncateAddress(address!)}
                  </span>
                ) : (
                  'Connect'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Center Content - Base Ninja Branding */}
      <div className="relative z-40 flex-1 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-4 px-8">
          <div className="text-7xl drop-shadow-2xl animate-pulse" style={{ animationDuration: '3s' }}>
            
          </div>
          <h2 className="text-5xl font-black text-white drop-shadow-2xl leading-tight bg-gradient-to-r from-[#0052FF] via-white to-[#0052FF] bg-clip-text text-transparent">
          </h2>
          <div className="flex items-center justify-center gap-3 text-3xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>
      </div>

      {/* Large Play Button at Bottom */}
      <div className="relative z-50 px-4 pb-4">
        <button
          onClick={onStart}
          className="w-full py-4 text-xl font-bold text-white bg-[#0052FF] hover:bg-[#0052FF]/90 rounded-2xl shadow-lg shadow-[#0052FF]/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-[#0052FF]/50 pointer-events-auto"
        >
          <span className="flex items-center justify-center gap-3">
            <span className="text-2xl"></span>
            <span>Start Playing</span>
            <span className="text-2xl"></span>
          </span>
        </button>
      </div>

      {/* Glass Morphism Footer */}
      <div className="relative z-50 mx-4 mb-4 mt-2">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-[#0052FF]/30 shadow-lg shadow-[#0052FF]/10 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Copyright */}
            <div className="text-white/60 text-sm font-medium">
              Base Ninja 2025
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pointer-events-auto">
              <button
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                onClick={() => window.open('https://x.com/ShantanuSwami11', '_blank')}
              >
                <span className="text-white text-lg font-bold">𝕏</span>
              </button>
              <button
                className="w-10 h-10 bg-[#0052FF]/20 hover:bg-[#0052FF]/30 backdrop-blur-sm rounded-xl border border-[#0052FF]/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-[#0052FF]/20"
                onClick={() => window.open('https://t.me/shantanucsd', '_blank')}
              >
                <span className="text-[#0052FF] text-lg font-bold">TG</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0052FF]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0052FF]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>
    </div>
  );
};
