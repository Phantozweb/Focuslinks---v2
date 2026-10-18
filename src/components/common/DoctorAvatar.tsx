import React, { useState } from 'react';
import { User, ShieldCheck } from 'lucide-react';

interface DoctorAvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  verified?: boolean;
  badgeSize?: 'sm' | 'md' | 'lg';
}

// Fallback high-reliability physician avatar URLs
const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80';

export const DoctorAvatar: React.FC<DoctorAvatarProps> = ({
  src,
  alt,
  name,
  size,
  className,
  verified = false,
  badgeSize = 'md',
}) => {
  const [hasError, setHasError] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);

  const displayName = name || alt || 'Doctor';

  // Compute size classes if size is given and className is not custom
  const sizeClasses = {
    xs: 'h-6 w-6 rounded-full',
    sm: 'h-8 w-8 rounded-full',
    md: 'h-10 w-10 rounded-full',
    lg: 'h-14 w-14 rounded-full',
    xl: 'h-20 w-20 rounded-full',
  };

  const finalClassName = className || (size ? sizeClasses[size] : 'h-10 w-10 rounded-full');

  // Generate initials from doctor name
  const initials = displayName
    ? displayName
        .replace(/Dr\.\s*/i, '')
        .split(' ')
        .map((n) => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'OD';

  const badgeSizeClasses = {
    sm: 'h-3.5 w-3.5 p-0.5 bottom-0 right-0',
    md: 'h-4.5 w-4.5 p-0.5 -bottom-0.5 -right-0.5',
    lg: 'h-6 w-6 p-1 bottom-1 right-1',
  };

  const currentSrc = !hasError && src ? src : !fallbackFailed ? FALLBACK_AVATAR : null;

  return (
    <div className={`relative inline-block shrink-0 ${finalClassName}`}>
      {currentSrc ? (
        <img
          src={currentSrc}
          alt={displayName}
          onError={() => {
            if (!hasError) {
              setHasError(true);
            } else {
              setFallbackFailed(true);
            }
          }}
          className="w-full h-full rounded-full object-cover object-center shadow-xs"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold text-xs select-none shadow-xs">
          {initials || <User className="w-1/2 h-1/2" />}
        </div>
      )}

      {verified && (
        <div
          className={`absolute ${badgeSizeClasses[badgeSize]} bg-blue-600 text-white rounded-full border-2 border-white dark:border-[#121216] shadow-sm flex items-center justify-center`}
          title="Verified Licensed Optometrist"
        >
          <ShieldCheck className="w-full h-full" />
        </div>
      )}
    </div>
  );
};
