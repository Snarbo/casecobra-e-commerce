'use client';

import { CaseColor } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import { AspectRatio } from './ui/aspect-ratio';
import { cn } from '@/lib/utils';

const PhonePreview = ({ croppedImageUrl, color }: { croppedImageUrl: string; color: CaseColor }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [renderedDimensions, setRenderedDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    if (!ref.current) return;

    const { width, height } = ref.current.getBoundingClientRect();
    setRenderedDimensions({ width, height });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [ref.current]);

  let caseBackgroundColor = 'bg-zinc-950';
  if (color === 'blue') caseBackgroundColor = 'bg-blue-950';
  if (color === 'rose') caseBackgroundColor = 'bg-rose-950';

  return (
    <AspectRatio className="relative" ref={ref} ratio={3000 / 2001}>
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          top: renderedDimensions.height / 6.22,
          left: renderedDimensions.width / 2 - renderedDimensions.width / (1216 / 121),
        }}
      >
        <img
          className={cn('phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]', caseBackgroundColor)}
          src={croppedImageUrl}
          width={renderedDimensions.width / (3000 / 637)}
        />
      </div>
      <div className="relative h-full w-full z-40">
        <img className="pinter-events-none h-full w-full antialiased rounded-md" src="/clearphone.png" alt="phone" />
      </div>
    </AspectRatio>
  );
};

export default PhonePreview;
