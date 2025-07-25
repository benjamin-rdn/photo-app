import { useViewMode } from './ViewModeProvider';

export function ViewModeSwitcher() {
  const BASE_BUTTON_CLASS = 'px-3 py-2 flex grow-0 border-none cursor-pointer text-sm';
  const getSelectionClass = (selected: boolean) => (selected ? 'bg-gray-100' : 'bg-transparent');

  const { viewMode, setViewMode } = useViewMode();

  return (
    <div className="w-auto border border-gray-200 rounded-lg overflow-hidden mb-4 flex flex-row">
      <button
        type="button"
        onClick={() => setViewMode('grid')}
        className={`${BASE_BUTTON_CLASS} ${getSelectionClass(viewMode === 'grid')}`}>
        Grid
      </button>
      <button
        type="button"
        onClick={() => setViewMode('flow')}
        className={`${BASE_BUTTON_CLASS} ${getSelectionClass(viewMode === 'flow')}`}>
        Flow
      </button>
    </div>
  );
}
