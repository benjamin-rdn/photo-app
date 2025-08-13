import type { ReactElement } from 'react';
import type { ViewMode } from '@/types';
import { PhotoList } from '@/ui/photo-list';
import { useSearch } from './useSearch';

interface SearchPanelProps {
  viewMode: ViewMode;
}

export function SearchPanel({ viewMode }: SearchPanelProps): ReactElement {
  const { query, setQuery, results, handleSearch, loading, error } = useSearch();

  return (
    <div>
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

      {results.length > 0 && <PhotoList photos={results} viewMode={viewMode} />}

      {results.length === 0 && query && !loading && <div className="text-gray-500 mt-8">No photos found.</div>}
    </div>
  );
}
