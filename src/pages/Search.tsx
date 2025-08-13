import type { ReactElement } from 'react';
import { SearchPanel } from '@/features/search';
import { useViewMode, ViewModeSwitcher } from '@/features/view-mode-switcher';

export function Search(): ReactElement {
  const { viewMode } = useViewMode();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Photo Search</h1>

      <div className="flex justify-end mb-6">
        <ViewModeSwitcher />
      </div>
      <SearchPanel viewMode={viewMode} />
    </div>
  );
}
