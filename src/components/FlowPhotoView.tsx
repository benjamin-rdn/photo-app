import { useEffect, useState } from 'react';
import type { Photo } from '../types';

interface FlowPhotoViewProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
  height?: number;
}

const FlowPhotoView = ({ photos, onPhotoClick, height = 200 }: FlowPhotoViewProps) => {
  const [photoHeight, setPhotoHeight] = useState<number>(() => {
    const savedHeight = localStorage.getItem('photoHeight');
    return savedHeight ? parseInt(savedHeight) : height;
  });

  const [photoMargin, setPhotoMargin] = useState<number>(() => {
    const savedMargin = localStorage.getItem('photoMargin');
    return savedMargin ? parseInt(savedMargin) : 5;
  });

  useEffect(() => {
    localStorage.setItem('photoHeight', photoHeight.toString());
  }, [photoHeight]);

  useEffect(() => {
    localStorage.setItem('photoMargin', photoMargin.toString());
  }, [photoMargin]);

  return (
    <div>
      <div className="mb-4 flex gap-4 flex-col">
        <div className="flex items-center gap-4">
          <label htmlFor="photoHeight" className="text-sm text-gray-500">
            Height:
          </label>
          <input
            id="photoHeight"
            type="range"
            min="100"
            max="800"
            step="10"
            value={photoHeight}
            onChange={(e) => setPhotoHeight(parseInt(e.target.value))}
            className="w-[120px]"
          />
          <span className="text-sm text-gray-500 min-w-[40px]">{photoHeight}px</span>
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="photoMargin" className="text-sm text-gray-500">
            Margin:
          </label>
          <input
            id="photoMargin"
            type="range"
            min="0"
            max="50"
            step="1"
            value={photoMargin}
            onChange={(e) => setPhotoMargin(parseInt(e.target.value))}
            className="w-[120px]"
          />
          <span className="text-sm text-gray-500 min-w-[40px]">{photoMargin}px</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-start mt-4">
        {photos.map((photo) => (
          <button
            key={photo.filename}
            onClick={() => onPhotoClick(photo)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onPhotoClick(photo);
              }
            }}
            aria-label={`View ${photo.filename}`}
            type="button"
            className="border-none bg-transparent p-0 cursor-pointer transition-transform duration-200 hover:-translate-y-[3px]"
            style={{ margin: `${photoMargin}px` }}>
            <div className="flex justify-center items-center" style={{ height: `${photoHeight}px` }}>
              <img
                src={`${photo.relativePath}`}
                alt={photo.filename}
                className="h-full object-contain shadow-sm transition-shadow duration-200 hover:shadow-md"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlowPhotoView;
