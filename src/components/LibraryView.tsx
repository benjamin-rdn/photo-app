import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FlowPhotoView from './FlowPhotoView';
import PhotoModal from './PhotoModal';

interface Library {
  name: string;
  path: string;
  photos: string[];
}

type ViewMode = 'grid' | 'flow';

const LibraryView = () => {
  const { libraryName } = useParams<{ libraryName: string }>();
  const [library, setLibrary] = useState<Library | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const savedViewMode = localStorage.getItem('photoViewMode');
    return savedViewMode === 'flow' || savedViewMode === 'grid' ? savedViewMode : 'grid';
  });

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await fetch('/libraries.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Library[] = await response.json();
        const foundLibrary = data.find((lib) => lib.name === libraryName);

        if (foundLibrary) {
          setLibrary(foundLibrary);
        } else {
          setError('Library not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load library. Please try again later.');
        setLoading(false);
        console.error('Error fetching library:', err);
      }
    };

    if (libraryName) {
      fetchLibrary();
    }
  }, [libraryName]);

  useEffect(() => {
    localStorage.setItem('photoViewMode', viewMode);
  }, [viewMode]);

  const openPhotoModal = (photoFilename: string) => {
    setSelectedPhoto(photoFilename);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

  const getNextPhoto = () => {
    if (!library || !selectedPhoto) return null;

    const currentIndex = library.photos.indexOf(selectedPhoto);
    if (currentIndex === -1 || currentIndex === library.photos.length - 1) return null;

    return library.photos[currentIndex + 1];
  };

  const getPrevPhoto = () => {
    if (!library || !selectedPhoto) return null;

    const currentIndex = library.photos.indexOf(selectedPhoto);
    if (currentIndex <= 0) return null;

    return library.photos[currentIndex - 1];
  };

  if (loading) {
    return <div className="text-center py-10">Loading library...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
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
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 mt-4">
          {library.photos.map((photo) => (
            <button
              key={photo}
              className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:translate-y-[-3px] hover:shadow-md cursor-pointer text-left border-none bg-transparent p-0"
              onClick={() => openPhotoModal(photo)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openPhotoModal(photo);
                }
              }}
              aria-label={`View ${photo}`}
              type="button">
              <div className="h-[200px] bg-gray-100 flex items-center justify-center">
                <img src={`${library.path}/${photo}`} alt={photo} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">{photo}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <FlowPhotoView photos={library.photos} basePath={library.path} onPhotoClick={openPhotoModal} />
      )}

      {selectedPhoto && (
        <PhotoModal
          photoUrl={`${library.path}/${selectedPhoto}`}
          photoName={selectedPhoto}
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
