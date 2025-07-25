import { useState } from 'react';
import FlowPhotoView from './components/FlowPhotoView';
import PhotoModal from './components/PhotoModal';
import { usePhotoLibraries } from './PhotoLibrariesProvider';
import type { Photo, PhotoMetadata } from './types';

function fuzzyMatch(str: string, query: string) {
  return str.toLowerCase().includes(query.toLowerCase());
}

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const { photos: flatPhotos, loading, error } = usePhotoLibraries();

  const handleSearch = () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setResults(
      flatPhotos
        .filter((photo) => fuzzyMatch(photo.filename, query) || (photo.keywords && fuzzyMatch(photo.keywords, query)))
        .map((flat) => ({
          filename: flat.filename,
          keywords: flat.keywords
            .split(',')
            .map((k) => k.trim())
            .filter(Boolean),
          relativePath: flat.relativePath,
          metadata: flat.metadata as PhotoMetadata,
        })),
    );
  };

  const openPhotoModal = (photo: Photo) => setSelectedPhoto(photo);
  const closePhotoModal = () => setSelectedPhoto(null);

  // Find index of selected photo in results
  const selectedIndex = selectedPhoto ? results.findIndex((p) => p.filename === selectedPhoto.filename) : -1;

  const showPrevPhoto = () => {
    if (selectedIndex > 0) {
      setSelectedPhoto(results[selectedIndex - 1]);
    }
  };

  const showNextPhoto = () => {
    if (selectedIndex >= 0 && selectedIndex < results.length - 1) {
      setSelectedPhoto(results[selectedIndex + 1]);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Photo Search</h1>
      <div className="flex gap-2 mb-6 mx-auto w-[50%]">
        <input
          type="text"
          className="border rounded px-3 py-2 flex-1"
          placeholder="Search photos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSearch}
          type="button">
          Search
        </button>
      </div>
      {loading && <div className="text-gray-500 mt-8">Loading photos...</div>}
      {error && <div className="text-red-500 mt-8">Error loading photos: {error.message}</div>}
      {results.length > 0 && <FlowPhotoView photos={results} onPhotoClick={openPhotoModal} />}
      {results.length === 0 && query && !loading && <div className="text-gray-500 mt-8">No photos found.</div>}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={closePhotoModal}
          onPrev={selectedIndex > 0 ? showPrevPhoto : undefined}
          onNext={selectedIndex >= 0 && selectedIndex < results.length - 1 ? showNextPhoto : undefined}
        />
      )}
    </div>
  );
};

export default SearchPage;
