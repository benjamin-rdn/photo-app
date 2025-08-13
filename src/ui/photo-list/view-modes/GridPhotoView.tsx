import type { ReactElement } from 'react';
import type { Photo } from '@/types';

interface GridPhotoViewProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

function GridPhotoView({ photos, onPhotoClick }: GridPhotoViewProps): ReactElement {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[35px] mt-4">
      {photos.map((photo) => (
        <button
          key={photo.filename}
          className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:translate-y-[-3px] hover:shadow-md cursor-pointer text-left border-none bg-transparent p-0"
          onClick={() => onPhotoClick(photo)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onPhotoClick(photo);
            }
          }}
          aria-label={`View ${photo.filename}`}
          type="button">
          <div className="h-[250px] bg-gray-100 flex items-center justify-center">
            <img src={photo.relativePath} alt={photo.filename} className="w-full h-full object-cover" />
          </div>
          <div className="px-4 py-2">
            <p className="text-xs text-gray-400 mt-1">
              {photo.metadata.focalLength} - {photo.metadata.exposureTime}s - f/{photo.metadata.fNumber} - iso{' '}
              {photo.metadata.iso}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

export default GridPhotoView;
