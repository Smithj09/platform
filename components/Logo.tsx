
import React from 'react';

const Logo: React.FC<{ className?: string, isHeader?: boolean }> = ({ className = "w-auto", isHeader = false }) => {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Precision SVG recreation of the AD Circle Logo */}
      <svg 
        viewBox="0 0 100 100" 
        className={isHeader ? "h-10 w-10 mb-1" : "h-16 w-16 mb-2"} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" fill="#0D3156" />
        {/* Letter A */}
        <path 
          d="M46 32H28C24 32 22 36 22 40V68H32V56H40V68H46V32ZM36 46H32V40H36V46Z" 
          fill="#FFC600" 
        />
        {/* Letter D */}
        <path 
          d="M54 32H68C76 32 80 38 80 50C80 62 76 68 68 68H54V32ZM64 58C68 58 70 56 70 50C70 44 68 42 64 42H60V58H64Z" 
          fill="#FFC600" 
        />
      </svg>
      
      <div className="flex flex-col items-center">
        <span className={`font-black text-[#0D3156] leading-none ${isHeader ? 'text-xs tracking-[0.1em]' : 'text-lg tracking-[0.15em]'}`}>
          INNOVATION
        </span>
        <span className={`font-medium text-[#4A6278] leading-none mt-0.5 ${isHeader ? 'text-[7px] tracking-[0.2em]' : 'text-[10px] tracking-[0.3em]'}`}>
          SERVICES PLUS
        </span>
      </div>
    </div>
  );
};

export default Logo;
