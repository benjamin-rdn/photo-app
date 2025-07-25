import { Link } from 'react-router-dom';
import { usePhotoLibraries } from '../PhotoLibrariesProvider';

const LibraryGrid = () => {
  const { libraries, loading, error } = usePhotoLibraries();

  if (loading) {
    return <div className="text-center py-10">Loading libraries...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error.message}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Photo Libraries</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 mt-4">
        {libraries?.map((library) => (
          <Link
            key={library.name}
            to={`/library/${encodeURIComponent(library.name)}`}
            className="no-underline text-inherit">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:translate-y-[-3px] hover:shadow-md cursor-pointer">
              <div className="h-[200px] bg-gray-100 flex items-center justify-center">
                {library.photos.length > 0 ? (
                  <img
                    src={`${library.path}/${library.photos[0].filename}`}
                    alt={`Cover for ${library.name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No photos</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium m-0">{library.name.replace(/-/g, ' ')}</h3>
                <p className="text-sm text-gray-500 mt-1">{library.photos.length} photos</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {libraries && libraries.length === 0 && (
        <div className="text-center py-10 text-gray-500">No photo libraries found. Add some photos to get started.</div>
      )}
    </div>
  );
};

export default LibraryGrid;
