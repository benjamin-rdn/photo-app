import { useState } from 'react';
import type { Photo, ViewMode } from '@/types';
import { PhotoModal } from '@/ui/PhotoModal';
import FlowPhotoView from '@/ui/photo-list/view-modes/FlowPhotoView';
import GridPhotoView from '@/ui/photo-list/view-modes/GridPhotoView';

interface PhotoListProps {
  photos: Photo[];
  viewMode: ViewMode;
}

export function PhotoList({ photos, viewMode }: PhotoListProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Find index of selected photo in results
  const selectedIndex = selectedPhoto ? photos.findIndex((p) => p.filename === selectedPhoto.filename) : -1;

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
      <div>
        {viewMode === 'grid' ? (
          <GridPhotoView photos={photos} onPhotoClick={openPhotoModal} />
        ) : (
          <FlowPhotoView photos={photos} onPhotoClick={openPhotoModal} />
        )}

        <PhotoModal
          photo={selectedPhoto}
          onClose={closePhotoModal}
          onNext={selectedIndex < photos.length - 1 ? handleNextClick : undefined}
          onPrev={selectedIndex > 0 ? handlePreviousClick : undefined}
        />
      </div>
    </div>
  );
}
