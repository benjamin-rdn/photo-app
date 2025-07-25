import { useEffect, useState } from 'react';
import FlowPhotoView from '@/components/FlowPhotoView';
import GridPhotoView from '@/components/GridPhotoView';
import type { Photo } from '@/types';
import { PhotoModal } from '@/ui/PhotoModal';

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

  const handleNextClick = () => {
    if (selectedIndex >= 0 && selectedIndex < photos.length - 1) {
      setSelectedPhoto(photos[selectedIndex + 1]);
    }
  };

  const handlePreviousClick = () => {
    if (selectedIndex > 0) {
      setSelectedPhoto(photos[selectedIndex - 1]);
    }
  };

  // Find index of selected photo in results
  const selectedIndex = selectedPhoto ? photos.findIndex((p) => p.filename === selectedPhoto.filename) : -1;

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
          <PhotoModal
            photo={selectedPhoto}
            onClose={closePhotoModal}
            onNext={selectedIndex < photos.length - 1 ? handleNextClick : undefined}
            onPrev={selectedIndex > 0 ? handlePreviousClick : undefined}
          />
        )}
      </div>
    </div>
  );
}

export default PhotoList;
