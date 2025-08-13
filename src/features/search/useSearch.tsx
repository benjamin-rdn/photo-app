import { useState } from 'react';
import { usePhotoLibraries } from '@/Providers/PhotoLibrariesProvider';
import type { Photo, PhotoMetadata } from '@/types';

function fuzzyMatch(str: string, query: string): boolean {
  return str.toLowerCase().includes(query.toLowerCase());
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Photo[]>([]);

  const { photos: flatPhotos, loading, error } = usePhotoLibraries();

  const handleSearch = () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults = flatPhotos
      .filter((photo) => fuzzyMatch(photo.filename, query) || (photo.keywords && fuzzyMatch(photo.keywords, query)))
      .map((flat) => ({
        filename: flat.filename,
        keywords: flat.keywords
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean),
        relativePath: flat.relativePath,
        metadata: flat.metadata as PhotoMetadata,
      }));

    setResults(searchResults);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return {
    query,
    setQuery,
    results,
    handleSearch,
    clearSearch,
    loading,
    error,
  };
}
