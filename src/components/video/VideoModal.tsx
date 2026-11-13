import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ASSETS } from '../../data/products';

export const VideoModal: React.FC = () => {
  const { isVideoModalOpen, setIsVideoModalOpen } = useShop();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isVideoModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        
        {/* Header bar */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="p-2 rounded-full bg-black/60 text-white hover:bg-[#FF5500] transition-colors cursor-pointer"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas / Cinematic Athlete Stage */}
        <div className="relative aspect-video w-full bg-[#121316] flex items-center justify-center overflow-hidden">
          <img
            src={ASSETS.heroAthlete}
            alt="TennisPro Tour Cinema"
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isPlaying ? 'scale-105 filter brightness-95' : 'scale-100 filter brightness-75'
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

          {/* Center Play/Pause Overlay Indicator */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-10 w-20 h-20 rounded-full bg-[#FF5500]/90 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xl cursor-pointer"
            aria-label={isPlaying ? 'Pause film' : 'Play film'}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </button>

          {/* Film Details Info Bottom Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-10 text-white flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-[#FF5500] uppercase tracking-wider block">
                Short Film · 4K Master
              </span>
              <h3 className="text-xl sm:text-2xl font-display">
                The Anatomy of Contact
              </h3>
              <p className="text-xs text-stone-300 font-light hidden sm:block">
                High-speed 1000fps capture of the Pro Carbon 98 ball impact and flex response.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Progress bar simulation */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20">
            <div className="h-full bg-[#FF5500] w-3/5" />
          </div>
        </div>

      </div>
    </div>
  );
};
