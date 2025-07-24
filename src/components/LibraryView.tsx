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
    return <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>Loading library...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2.5rem 0', color: 'red' }}>{error}</div>;
  }

  if (!library) {
    return <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>Library not found</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            &larr; Back to Libraries
          </Link>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '0.5rem' }}>
            {library.name.replace(/-/g, ' ')}
          </h2>
        </div>
        <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden' }}>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            style={{
              padding: '0.5rem 0.75rem',
              backgroundColor: viewMode === 'grid' ? '#f3f4f6' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}>
            Grid
          </button>
          <button
            type="button"
            onClick={() => setViewMode('flow')}
            style={{
              padding: '0.5rem 0.75rem',
              backgroundColor: viewMode === 'flow' ? '#f3f4f6' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}>
            Flow
          </button>
        </div>
      </div>

      {library.photos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2.5rem 0', color: '#6b7280' }}>No photos in this library</div>
      ) : viewMode === 'grid' ? (
        <div className="grid">
          {library.photos.map((photo) => (
            <button
              key={photo}
              className="card"
              onClick={() => openPhotoModal(photo)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openPhotoModal(photo);
                }
              }}
              aria-label={`View ${photo}`}
              type="button"
              style={{ textAlign: 'left', cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}>
              <div className="card-image">
                <img src={`${library.path}/${photo}`} alt={photo} />
              </div>
              <div className="card-content">
                <p
                  className="card-subtitle"
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {photo}
                </p>
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
