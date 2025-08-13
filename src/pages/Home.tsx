import { LibraryList } from '@/features/library-list/LibraryList';

export function Home() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Photo Libraries</h2>
      <LibraryList />
    </div>
  );
}
