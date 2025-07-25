import type { ViewMode } from '@/types';
import { PhotoList } from '@/ui/photo-list';
import { useGetLibraryPhotos } from './useLibrary';

interface LibraryViewProps {
  libraryName: string;
  viewMode: ViewMode;
}

export function LibraryView({ libraryName, viewMode }: LibraryViewProps) {
  const getLibraryPhotos = useGetLibraryPhotos();
  const photos = getLibraryPhotos(libraryName);

  if (photos.length === 0) {
    return <div className="text-center py-10 text-gray-500">No photos in this library</div>;
  }

  return <PhotoList photos={photos} viewMode={viewMode} />;
}
