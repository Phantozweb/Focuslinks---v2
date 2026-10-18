import React from 'react';
import { Image as ImageIcon, Maximize2 } from 'lucide-react';

interface PostMediaGridProps {
  images: string[];
  /** Alt text per image (accessibility). Falls back to a generic descriptor. */
  imageAlts?: string[];
  /** Called with the image index when a tile is activated. Omit for non-interactive grids. */
  onImageClick?: (index: number) => void;
  /** Hide the hover zoom affordance (e.g. inside an already-zoomed context). */
  interactive?: boolean;
  className?: string;
}

/**
 * Responsive multi-image grid used by media/case post cards.
 * 1 image → full-width · 2 → side-by-side · 3 → hero + pair · 4+ → 2×2 with +N overflow tile.
 * Fluid width, no fixed pixel sizes (320px → 1600px+).
 */
export const PostMediaGrid: React.FC<PostMediaGridProps> = ({
  images,
  imageAlts,
  onImageClick,
  interactive = true,
  className = '',
}) => {
  if (images.length === 0) return null;

  const altFor = (i: number) => imageAlts?.[i] || `Attached clinical photo ${i + 1}`;
  const remaining = images.length - 4;
  const countLabel = `${images.length} photo${images.length === 1 ? '' : 's'}`;

  const baseTile =
    'relative block w-full h-full overflow-hidden bg-neutral-950 group/tile';
  const imgClass =
    'w-full h-full object-cover transition-transform duration-300 group-hover/tile:scale-[1.04]';
  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1';

  const renderTile = (index: number, extraClass = '') => {
    const content = (
      <>
        <img
          src={images[index]}
          alt={altFor(index)}
          loading="lazy"
          className={imgClass}
        />
        {interactive && (
          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/tile:opacity-100 transition-opacity bg-black/25">
            <span className="p-1.5 rounded-full bg-neutral-900/80 backdrop-blur-xs text-white">
              <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </span>
        )}
      </>
    );

    if (!interactive || !onImageClick) {
      return (
        <div key={index} className={`${baseTile} ${extraClass}`}>
          {content}
        </div>
      );
    }

    return (
      <button
        key={index}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onImageClick(index);
        }}
        aria-label={`View photo ${index + 1} of ${countLabel}: ${altFor(index)}`}
        className={`${baseTile} cursor-zoom-in ${focusRing} ${extraClass}`}
      >
        {content}
      </button>
    );
  };

  const shell = `w-full overflow-hidden ${className}`;

  // 1 image — full width hero
  if (images.length === 1) {
    return (
      <div className={`${shell} rounded-xl`}>
        {renderTile(0, 'aspect-[4/3] sm:aspect-[16/10]')}
      </div>
    );
  }

  // 2 images — side by side
  if (images.length === 2) {
    return (
      <div className={`${shell} rounded-xl`}>
        <div className="grid grid-cols-2 gap-0.5">
          {renderTile(0, 'aspect-square')}
          {renderTile(1, 'aspect-square')}
        </div>
      </div>
    );
  }

  // 3 images — wide hero + pair
  if (images.length === 3) {
    return (
      <div className={`${shell} rounded-xl space-y-0.5`}>
        {renderTile(0, 'aspect-[16/9]')}
        <div className="grid grid-cols-2 gap-0.5">
          {renderTile(1, 'aspect-square')}
          {renderTile(2, 'aspect-square')}
        </div>
      </div>
    );
  }

  // 4+ — 2×2 grid with +N overflow tile on the 4th cell
  return (
    <div className={`${shell} rounded-xl`}>
      <div className="grid grid-cols-2 gap-0.5" role="group" aria-label={countLabel}>
        {renderTile(0, 'aspect-square')}
        {renderTile(1, 'aspect-square')}
        {renderTile(2, 'aspect-square')}
        <div className="relative">
          {renderTile(3, 'aspect-square')}
          {remaining > 0 && (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/65 text-white pointer-events-none"
            >
              <ImageIcon className="h-5 w-5" />
              <span className="text-base font-black tracking-tight">+{remaining}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
