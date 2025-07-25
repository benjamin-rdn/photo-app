import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetLibraryPhotos } from '@/features/library-view/useLibrary';
import { useViewMode, ViewModeSwitcher } from '@/features/view-mode-switcher';
import type { Photo } from '@/types';
import { PhotoList } from '@/ui/photo-list';

function BackToLibrariesLink() {
  return (
    <Link to="/" className="text-blue-500 no-underline">
      &larr; Back to Libraries
    </Link>
  );
}

export function Library() {
  const { libraryName } = useParams<{ libraryName: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { viewMode } = useViewMode();
  const getLibraryPhotos = useGetLibraryPhotos();

  useEffect(() => {
    if (libraryName) {
      setPhotos(getLibraryPhotos(libraryName));
    }
  }, [getLibraryPhotos, libraryName]);

  if (!libraryName) {
    return (
      <div className="mb-6 flex justify-between items-center">
        <BackToLibrariesLink />
        <div className="text-center py-10 text-gray-500">Library not found</div>
      </div>
    );
  }

  if (photos.length === 0) {
    <div className="mb-6 flex justify-between items-center">
      <BackToLibrariesLink />
      <div className="text-center py-10 text-gray-500">No photo found in this library</div>
    </div>;
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <BackToLibrariesLink />
          <h1 className="text-2xl font-semibold mt-2">{libraryName.replace(/-/g, ' ')}</h1>
        </div>
      </div>

      <div className="flex justify-end">
        <ViewModeSwitcher />
      </div>
      <PhotoList photos={photos} viewMode={viewMode} />
    </div>
  );
}
