import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePhotoLibraries } from '../PhotoLibrariesProvider';
import type { Library, Photo } from '../types';
import FlowPhotoView from './FlowPhotoView';
import PhotoModal from './PhotoModal';

type ViewMode = 'grid' | 'flow';

const LibraryView = () => {
  const { libraryName } = useParams<{ libraryName: string }>();
  const { libraries, loading, error } = usePhotoLibraries();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const savedViewMode = localStorage.getItem('photoViewMode');
    return savedViewMode === 'flow' || savedViewMode === 'grid' ? savedViewMode : 'grid';
  });

  const library = libraries?.find((lib: Library) => lib.name === libraryName) || null;

  useEffect(() => {
    localStorage.setItem('photoViewMode', viewMode);
  }, [viewMode]);

  const openPhotoModal = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

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

  if (loading) {
    return <div className="text-center py-10">Loading library...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error.message}</div>;
  }

  if (!library) {
    return <div className="text-center py-10">Library not found</div>;
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link to="/" className="text-blue-500 no-underline">
            &larr; Back to Libraries
          </Link>
          <h2 className="text-2xl font-semibold mt-2">{library.name.replace(/-/g, ' ')}</h2>
        </div>
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 border-none cursor-pointer text-sm ${
              viewMode === 'grid' ? 'bg-gray-100' : 'bg-transparent'
            }`}>
            Grid
          </button>
          <button
            type="button"
            onClick={() => setViewMode('flow')}
            className={`px-3 py-2 border-none cursor-pointer text-sm ${
              viewMode === 'flow' ? 'bg-gray-100' : 'bg-transparent'
            }`}>
            Flow
          </button>
        </div>
      </div>

      {library.photos.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No photos in this library</div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-[35px] mt-4">
          {library.photos.map((photo) => (
            <button
              key={photo.filename}
              className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:translate-y-[-3px] hover:shadow-md cursor-pointer text-left border-none bg-transparent p-0"
              onClick={() => openPhotoModal(photo)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openPhotoModal(photo);
                }
              }}
              aria-label={`View ${photo.filename}`}
              type="button">
              <div className="h-[250px] bg-gray-100 flex items-center justify-center">
                <img
                  src={`${library.path}/${photo.filename}`}
                  alt={photo.filename}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-4 py-2">
                <p className="text-xs text-gray-400 mt-1">
                  {photo.metadata.focalLength} - {photo.metadata.exposureTime}s - f/{photo.metadata.fNumber} - iso{' '}
                  {photo.metadata.iso}{' '}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <FlowPhotoView photos={library.photos} onPhotoClick={openPhotoModal} />
      )}

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={closePhotoModal}
          onNext={
            getNextPhoto()
              ? () => {
                  const next = getNextPhoto();
                  if (next) setSelectedPhoto(next);
                }
              : undefined
          }
          onPrev={
            getPrevPhoto()
              ? () => {
                  const prev = getPrevPhoto();
                  if (prev) setSelectedPhoto(prev);
                }
              : undefined
          }
        />
      )}
    </div>
  );
};

export default LibraryView;
