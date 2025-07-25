import { useEffect, useState } from 'react';
import type { Photo } from '../types';
import FlowPhotoView from './FlowPhotoView';
import GridPhotoView from './GridPhotoView';
import PhotoModal from './PhotoModal';

type ViewMode = 'grid' | 'flow';

interface PhotoListProps {
  photos: Photo[];
}

function PhotoList({ photos }: PhotoListProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const savedViewMode = localStorage.getItem('photoViewMode');
    return savedViewMode === 'flow' || savedViewMode === 'grid' ? savedViewMode : 'grid';
  });

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    localStorage.setItem('photoViewMode', viewMode);
  }, [viewMode]);

  // Modal navigation helpers
  const getNextPhoto = () => {
    if (!photos || !selectedPhoto) return null;
    const currentIndex = photos.findIndex((p) => p.filename === selectedPhoto.filename);
    if (currentIndex === -1 || currentIndex === photos.length - 1) return null;
    return photos[currentIndex + 1];
  };

  const getPrevPhoto = () => {
    if (!photos || !selectedPhoto) return null;
    const currentIndex = photos.findIndex((p) => p.filename === selectedPhoto.filename);
    if (currentIndex <= 0) return null;
    return photos[currentIndex - 1];
  };

  const handleNext = () => {
    const next = getNextPhoto();
    if (next) setSelectedPhoto(next);
  };
  const handlePrev = () => {
    const prev = getPrevPhoto();
    if (prev) setSelectedPhoto(prev);
  };

  const openPhotoModal = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

  if (!photos || photos.length === 0) {
    return <div className="text-center py-10 text-gray-500">No photos in this library</div>;
  }

  return (
    <div>
      <div className="flex justify-end">
        <div className="w-auto border border-gray-200 rounded-lg overflow-hidden mb-4 flex flex-row">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 flex grow-0 border-none cursor-pointer text-sm ${
              viewMode === 'grid' ? 'bg-gray-100' : 'bg-transparent'
            }`}>
            Grid
          </button>
          <button
            type="button"
            onClick={() => setViewMode('flow')}
            className={`px-3 py-2  grow-0 border-none cursor-pointer text-sm ${
              viewMode === 'flow' ? 'bg-gray-100' : 'bg-transparent'
            }`}>
            Flow
          </button>
        </div>
      </div>
      <div>
        {viewMode === 'grid' ? (
          <GridPhotoView photos={photos} onPhotoClick={openPhotoModal} />
        ) : (
          <FlowPhotoView photos={photos} onPhotoClick={openPhotoModal} />
        )}

        {selectedPhoto && (
          <PhotoModal photo={selectedPhoto} onClose={closePhotoModal} onNext={handleNext} onPrev={handlePrev} />
        )}
      </div>
    </div>
  );
}

export default PhotoList;
