import type { Libraries, Library, Photo } from '@/types';
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';

interface FlatPhoto extends Omit<Photo, 'keywords'> {
  keywords: string;
}

interface PhotoLibrariesContextValue {
  libraries: Libraries | null;
  loading: boolean;
  error: Error | null;
  photos: FlatPhoto[];
}

const PhotoLibrariesContext = createContext<PhotoLibrariesContextValue | undefined>(undefined);

export function PhotoLibrariesProvider({ children }: PropsWithChildren) {
  const [libraries, setLibraries] = useState<Libraries | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [photos, setPhotos] = useState<FlatPhoto[]>([]);

  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        const response = await fetch('/libraries.json');
        if (!response.ok) throw new Error('Failed to fetch libraries.json');
        const data = await response.json();
        setLibraries(data as Libraries);

        // Flatten all photos and join keywords
        const flatPhotos: FlatPhoto[] = (data as Libraries).flatMap((library: Library) =>
          (library.photos || []).map((photo: Photo) => ({
            ...photo,
            keywords: Array.isArray(photo.keywords) ? photo.keywords.join(', ') : '',
          })),
        );
        setPhotos(flatPhotos);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchLibraries();
  }, []);

  return (
    <PhotoLibrariesContext.Provider value={{ libraries, loading, error, photos }}>
      {children}
    </PhotoLibrariesContext.Provider>
  );
}

export const usePhotoLibraries = () => {
  const context = useContext(PhotoLibrariesContext);
  if (context === undefined) {
    throw new Error('usePhotoLibraries must be used within a PhotoLibrariesProvider');
  }
  return context;
};
