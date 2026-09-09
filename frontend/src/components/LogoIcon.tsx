import React from "react";

interface LogoIconProps {
  className?: string;
  size?: number;
}

export default function LogoIcon({ className = "w-6 h-6", size = 24 }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Modern Cyan to Electric Blue Gradient */}
        <linearGradient id="sdLogoGrad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Glowing Beacon Filter */}
        <filter id="beaconGlow" x="19" y="1" width="12" height="12" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0627 0 0 0 0 0.886 0 0 0 0 0.447 0 0 0 0.7 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>

      {/* Monitor Display Outline */}
      <rect
        x="3.5"
        y="4.5"
        width="25"
        height="18"
        rx="4"
        stroke="url(#sdLogoGrad)"
        strokeWidth="2.25"
        strokeLinecap="round"
      />

      {/* Terminal Prompt '>_' */}
      <path
        d="M8.5 10.5L12.5 13.5L8.5 16.5"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="15.5"
        y1="16.5"
        x2="19.5"
        y2="16.5"
        stroke="#93c5fd"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Monitor Stand Base */}
      <path
        d="M12.5 22.5L11 27.5H21L19.5 22.5"
        stroke="url(#sdLogoGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Active Service Status Beacon (Emerald Green Glow) */}
      <g filter="url(#beaconGlow)">
        <circle cx="25" cy="7" r="3.2" fill="#10b981" />
        <circle cx="25" cy="7" r="1.5" fill="#ecfdf5" />
      </g>
    </svg>
  );
}
