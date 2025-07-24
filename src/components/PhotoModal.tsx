import { useCallback, useEffect } from 'react';

interface PhotoModalProps {
  photoUrl: string;
  photoName: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const PhotoModal = ({ photoUrl, photoName, onClose, onNext, onPrev }: PhotoModalProps) => {
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
    // Add keyboard event listeners when the modal is opened
    document.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling on the body while modal is open
    document.body.style.overflow = 'hidden';

    // Cleanup function to remove listeners and restore scrolling
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="max-w-[80vw] bg-white rounded-lg overflow-hidden shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white border-none rounded-full p-2 cursor-pointer transition-colors duration-200 hover:bg-opacity-70"
          aria-label="Close"
          type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <title>Close</title>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="bg-gray-900 flex items-center justify-center">
          <img src={photoUrl} alt={photoName} className="max-h-[80vh] max-w-full object-contain" />
        </div>

        <div className="flex justify-between items-center p-4 bg-white">
          <p className="text-lg font-medium m-0">{photoName}</p>

          <div className="flex gap-2">
            {onPrev && (
              <button
                onClick={onPrev}
                className="bg-gray-200 text-gray-900 border-none rounded-full p-2 cursor-pointer transition-colors duration-200 hover:bg-gray-300"
                aria-label="Previous photo"
                type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true">
                  <title>Previous</title>
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            {onNext && (
              <button
                onClick={onNext}
                className="bg-gray-200 text-gray-900 border-none rounded-full p-2 cursor-pointer transition-colors duration-200 hover:bg-gray-300"
                aria-label="Next photo"
                type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true">
                  <title>Next</title>
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
