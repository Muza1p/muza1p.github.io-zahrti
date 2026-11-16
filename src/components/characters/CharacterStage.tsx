import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { CategoryIllustration, ZahrtiBlossomMark } from '@/src/components/ornaments/BotanicalArt';
import { KAWAII_CHARACTERS, KawaiiCharacterId } from '@/src/data/characters/kawaiiCharacters';

interface CharacterStageProps {
  characterId: KawaiiCharacterId;
  variant?: 'hero' | 'scene' | 'companion' | 'avatar';
  className?: string;
  eager?: boolean;
  interactive?: boolean;
  showCaption?: boolean;
  customQuote?: string;
  aspectClass?: string;
}

export function CharacterStage({
  characterId,
  variant = 'companion',
  className = '',
  eager = false,
  interactive = true,
  showCaption = false,
  customQuote,
  aspectClass,
}: CharacterStageProps) {
  const character = KAWAII_CHARACTERS[characterId];
  const [imgError, setImgError] = useState(false);
  const [isHopping, setIsHopping] = useState(false);
  const [sparkleKey, setSparkleKey] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const hopTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setImgError(false);
    setQuoteIdx(0);
  }, [characterId]);

  useEffect(() => {
    return () => {
      if (hopTimerRef.current) {
        window.clearTimeout(hopTimerRef.current);
      }
    };
  }, []);

  const triggerReaction = () => {
    if (!interactive) return;
    setIsHopping(true);
    setSparkleKey((k) => k + 1);
    setQuoteIdx((idx) => (idx + 1) % character.greetingsAr.length);
    if (hopTimerRef.current) window.clearTimeout(hopTimerRef.current);
    hopTimerRef.current = window.setTimeout(() => setIsHopping(false), 480);
  };

  const activeMessage = customQuote ?? character.greetingsAr[quoteIdx];

  const resolvedAspect =
    aspectClass ??
    (variant === 'hero' || variant === 'scene'
      ? 'aspect-[4/3]'
      : 'aspect-square');

  const framePadding =
    variant === 'avatar' ? 'p-1 rounded-2xl' : variant === 'companion' ? 'p-2 rounded-3xl' : 'p-2.5 rounded-[2rem]';

  const shouldEager = eager || variant === 'avatar';

  const content = (
    <div
      className={`group relative overflow-hidden border transition-transform duration-200 ${framePadding} ${
        isHopping ? 'kawaii-hop' : variant === 'hero' || variant === 'scene' ? 'kawaii-float' : ''
      } ${interactive ? 'cursor-pointer select-none h-full w-full' : className}`}
      style={{
        backgroundColor: character.accentBg,
        borderColor: character.accentBorder,
      }}
    >
      <div className={`relative w-full overflow-hidden rounded-[calc(1.5rem-4px)] ${resolvedAspect} bg-[#FFFDFB]`}>
        {!imgError ? (
          <img
            src={character.imageSrc}
            alt={character.altAr}
            loading={shouldEager ? 'eager' : 'lazy'}
            decoding={shouldEager ? 'sync' : 'async'}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className={`h-full w-full object-cover transition-transform duration-300 ${
              interactive ? 'group-hover:scale-[1.03]' : ''
            }`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-3 text-center bg-gradient-to-b from-[#FFFDFB] to-[#F7E7EB]">
            {character.fallbackCategory ? (
              <CategoryIllustration category={character.fallbackCategory} className="h-12 w-12" />
            ) : (
              <ZahrtiBlossomMark className="h-12 w-12" />
            )}
            <span className="font-display text-xs font-semibold text-[#381F2E]">
              {character.nameAr}
            </span>
          </div>
        )}

        {/* Click-triggered lightweight CSS hearts/stars burst (compositor-only) */}
        {sparkleKey > 0 && (
          <div
            key={sparkleKey}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <span className="kawaii-sparkle-1 absolute bottom-4 right-5 text-sm text-[#A9506C]">♥</span>
            <span className="kawaii-sparkle-2 absolute bottom-6 left-6 text-sm text-[#D4AF6A]">✦</span>
            <span className="kawaii-sparkle-3 absolute bottom-8 right-1/2 text-xs text-[#8E74A8]">✦</span>
          </div>
        )}

        {interactive && variant !== 'avatar' && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-[#FFFDFB]/90 px-2.5 py-1 text-[11px] font-medium text-[#69495B] shadow-xs backdrop-blur-xs opacity-90 group-hover:opacity-100 transition-opacity"
          >
            <Sparkles className="h-3 w-3 text-[#D4AF6A]" />
            <span>اضغطي للتفاعل</span>
          </span>
        )}
      </div>

      {showCaption && (
        <div className="px-2 pt-2.5 pb-1 text-center space-y-1">
          <p className="font-display text-xs font-bold text-[#381F2E]">
            {character.nameAr}
          </p>
          <p className="text-xs leading-relaxed text-[#573E4E]">
            {activeMessage}
          </p>
        </div>
      )}
    </div>
  );

  if (!interactive) {
    return content;
  }

  return (
    <button
      type="button"
      onClick={triggerReaction}
      aria-label={`${character.nameAr}: ${activeMessage}`}
      className={`block text-right focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A9506C] ${
        variant === 'avatar' ? 'rounded-2xl' : 'rounded-[2rem]'
      } ${className || 'w-full'}`}
    >
      {content}
    </button>
  );
}
