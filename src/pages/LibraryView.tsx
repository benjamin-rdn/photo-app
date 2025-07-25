import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PhotoList from '@/components/PhotoList';
import { usePhotoLibraries } from '@/Providers/PhotoLibrariesProvider';
import type { Library, Photo } from '@/types';
import { PhotoModal } from '@/ui/PhotoModal';

export function LibraryView() {
  const { libraryName } = useParams<{ libraryName: string }>();
  const { libraries } = usePhotoLibraries();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const library = libraries?.find((lib: Library) => lib.name === libraryName) || null;

  // Modal navigation helpers
  const getNextPhoto = () => {
    if (!library || !selectedPhoto) return null;
    const currentIndex = library.photos.findIndex((p) => p.filename === selectedPhoto.filename);
    if (currentIndex === -1 || currentIndex === library.photos.length - 1) return null;
    return library.photos[currentIndex + 1];
  };

  const getPrevPhoto = () => {
    if (!library || !selectedPhoto) return null;
    const currentIndex = library.photos.findIndex((p) => p.filename === selectedPhoto.filename);
    if (currentIndex <= 0) return null;
    return library.photos[currentIndex - 1];
  };

  const handleNext = () => {
    const next = getNextPhoto();
    if (next) setSelectedPhoto(next);
  };
  const handlePrev = () => {
    const prev = getPrevPhoto();
    if (prev) setSelectedPhoto(prev);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link to="/" className="text-blue-500 no-underline">
            &larr; Back to Libraries
          </Link>
          <h2 className="text-2xl font-semibold mt-2">{library ? library.name.replace(/-/g, ' ') : ''}</h2>
        </div>
      </div>

      {library && <PhotoList photos={library.photos} />}

      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={closePhotoModal} onNext={handleNext} onPrev={handlePrev} />
      )}
    </div>
  );
}
