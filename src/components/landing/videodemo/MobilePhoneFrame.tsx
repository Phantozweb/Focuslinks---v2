import React from 'react';

interface MobilePhoneFrameProps {
  children: React.ReactNode;
}

export const MobilePhoneFrame: React.FC<MobilePhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto w-[310px] h-[610px] sm:w-[330px] sm:h-[650px] max-w-[calc(100vw-2.5rem)] bg-[#09090d] rounded-[50px] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-4 border-neutral-800 dark:border-neutral-900 ring-1 ring-neutral-700/30 flex flex-col justify-between overflow-hidden select-none group">
      
      {/* 3D Glass Reflection Overlay Sweep */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-40 rounded-[36px]" />
      <div className="absolute -left-1/2 top-0 w-1/3 h-full bg-white/5 skew-x-12 pointer-events-none z-40 animate-[sweep_8s_ease-in-out_infinite]" />

      {/* Side Buttons Visual accents */}
      <div className="absolute left-[-4px] top-28 w-[4px] h-10 bg-neutral-700 rounded-l-lg z-30" />
      <div className="absolute left-[-4px] top-40 w-[4px] h-14 bg-neutral-700 rounded-l-lg z-30" />
      <div className="absolute left-[-4px] top-58 w-[4px] h-14 bg-neutral-700 rounded-l-lg z-30" />
      <div className="absolute right-[-4px] top-32 w-[4px] h-20 bg-neutral-700 rounded-r-lg z-30" />

      {/* Internal Phone Bezel Canvas container */}
      <div className="grow w-full h-full bg-white dark:bg-[#0c0c10] rounded-[36px] overflow-hidden relative flex flex-col border border-neutral-200/20 dark:border-white/5">
        
        {/* Dynamic Island Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-3.5">
          {/* Camera Lens */}
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-900/90 border border-neutral-800 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-blue-900/60" />
          </div>
          {/* Sensor indicator */}
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse" />
        </div>

        {/* Dynamic Mobile Status Bar */}
        <div className="h-10 bg-neutral-950 dark:bg-[#07070a] text-neutral-400 dark:text-neutral-300 flex items-end justify-between px-6 pb-1.5 select-none shrink-0 text-[10px] font-bold z-40">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
            {/* Cellular strength */}
            <div className="flex items-end gap-[1px] h-2.5">
              <span className="w-[2px] h-[3px] bg-neutral-400 rounded-[1px]" />
              <span className="w-[2px] h-[5px] bg-neutral-400 rounded-[1px]" />
              <span className="w-[2px] h-[7px] bg-neutral-400 rounded-[1px]" />
              <span className="w-[2px] h-[9px] bg-blue-500 rounded-[1px]" />
            </div>
            <span>5G</span>
            {/* Battery icon */}
            <div className="w-5 h-2.5 border border-neutral-400 rounded-[4px] p-[1px] flex items-center relative">
              <div className="h-full w-4/5 bg-emerald-500 rounded-[2px]" />
              <span className="absolute right-[-3px] top-[3px] w-0.5 h-1 bg-neutral-400 rounded-r-sm" />
            </div>
          </div>
        </div>

        {/* Live app viewport contents */}
        <div className="grow w-full h-full overflow-hidden relative flex flex-col bg-neutral-50 dark:bg-[#0e0e13]">
          {children}
        </div>

        {/* Dynamic iOS Home Bar */}
        <div className="h-6 bg-white dark:bg-[#0c0c10] flex items-center justify-center shrink-0 z-40 select-none">
          <div className="w-32 h-1 bg-neutral-300 dark:bg-neutral-800 rounded-full" />
        </div>

      </div>
    </div>
  );
};
