import { useCallback, useEffect } from 'react';
import type { Photo } from '@/types';
import { SvgClose, SvgNext, SvgPrevious } from '@/ui/svg';

interface PhotoModalProps {
  photo?: Photo | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function PhotoModal({ photo, onClose, onNext, onPrev }: PhotoModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      }
    },
    [onClose, onNext, onPrev],
  );

  useEffect(() => {
    if (!photo) return;

    // Add keyboard event listeners when the modal is opened
    document.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling on the body while modal is open
    document.body.style.overflow = 'hidden';

    // Cleanup function to remove listeners and restore scrolling
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown, photo]);

  if (!photo) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="max-w-[80vw] bg-white bordered border-white border-x-[70px] border-t-[70px] rounded-lg overflow-hidden shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white border-none rounded-full p-2 cursor-pointer transition-colors duration-200 hover:bg-opacity-70"
          aria-label="Close"
          type="button">
          <SvgClose />
        </button>

        <div className="bg-gray-900 flex items-center justify-center">
          <img src={photo.relativePath} alt={photo.filename} className="max-h-[80vh] max-w-full object-contain" />
        </div>

        <div className="flex justify-between items-center p-4 bg-white">
          <p className="font-small m-0 text-gray-700">
            {photo.metadata.focalLength} - {photo.metadata.exposureTime}s - f/{photo.metadata.fNumber} - iso{' '}
            {photo.metadata.iso}{' '}
          </p>

          <div className="flex gap-2">
            {onPrev && (
              <button
                onClick={onPrev}
                className="bg-gray-200 text-gray-900 border-none rounded-full p-2 cursor-pointer transition-colors duration-200 hover:bg-gray-300"
                aria-label="Previous photo"
                type="button">
                <SvgPrevious />
              </button>
            )}

            {onNext && (
              <button
                onClick={onNext}
                className="bg-gray-200 text-gray-900 border-none rounded-full p-2 cursor-pointer transition-colors duration-200 hover:bg-gray-300"
                aria-label="Next photo"
                type="button">
                <SvgNext />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
