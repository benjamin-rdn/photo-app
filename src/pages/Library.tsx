import { Link, useParams } from 'react-router-dom';
import { LibraryView } from '@/features/library-view';
import { useViewMode, ViewModeSwitcher } from '@/features/view-mode-switcher';

function BackToLibrariesLink() {
  return (
    <Link to="/" className="text-blue-500 no-underline">
      &larr; Back to Libraries
    </Link>
  );
}

export function Library() {
  const { libraryName } = useParams<{ libraryName: string }>();
  const { viewMode } = useViewMode();

  if (!libraryName) {
    return (
      <div className="mb-6 flex justify-between items-center">
        <BackToLibrariesLink />
        <div className="text-center py-10 text-gray-500">Library not found</div>
      </div>
    );
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
      <LibraryView libraryName={libraryName} viewMode={viewMode} />
    </div>
  );
}
