import { usePhotoLibraries } from '@/Providers/PhotoLibrariesProvider';
import type { Photo } from '@/types';

export function useGetLibraryPhotos(): (libraryName: string) => Photo[] {
  const { libraries } = usePhotoLibraries();
  const getLibraryPhotos = (libraryName: string): Photo[] => {
    return libraries?.find((lib) => lib.name.toUpperCase() === libraryName.toUpperCase())?.photos || [];
  };

  return getLibraryPhotos;
}
