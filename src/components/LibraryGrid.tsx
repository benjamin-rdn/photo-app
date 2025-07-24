import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Library {
  name: string;
  path: string;
  photos: string[];
}

const LibraryGrid = () => {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        const response = await fetch('/libraries.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLibraries(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load libraries. Please try again later.');
        setLoading(false);
        console.error('Error fetching libraries:', err);
      }
    };

    fetchLibraries();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>Loading libraries...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '2.5rem 0', color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Photo Libraries</h2>
      <div className="grid">
        {libraries.map((library) => (
          <Link 
            key={library.name} 
            to={`/library/${encodeURIComponent(library.name)}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="card">
              <div className="card-image">
                {library.photos.length > 0 ? (
                  <img
                    src={`${library.path}/${library.photos[0]}`}
                    alt={`Cover for ${library.name}`}
                  />
                ) : (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%', 
                    color: '#9ca3af' 
                  }}>
                    No photos
                  </div>
                )}
              </div>
              <div className="card-content">
                <h3 className="card-title">
                  {library.name.replace(/-/g, ' ')}
                </h3>
                <p className="card-subtitle">
                  {library.photos.length} photos
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {libraries.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '2.5rem 0', 
          color: '#6b7280' 
        }}>
          No photo libraries found. Add some photos to get started.
        </div>
      )}
    </div>
  );
};

export default LibraryGrid;
