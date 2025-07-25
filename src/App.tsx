import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '@/App.css';
import { ViewModeProvider } from '@/features/view-mode-switcher';
import { PhotoLibrariesProvider } from '@/Providers/PhotoLibrariesProvider';
import { Home } from '@/pages/Home';
import { Library } from '@/pages/Library';
import { Search } from '@/pages/Search';

const App = () => {
  return (
    <PhotoLibrariesProvider>
      <ViewModeProvider>
        <Router>
          <div>
            <header className="bg-white shadow-sm py-4">
              <div className="max-w-[80%] mx-auto px-4 flex flex-row items-center gap-4">
                <Link to="/">
                  <span className="text-xl font-bold m-0">Photos</span>
                </Link>
                <Link to="/search" className="hover:underline">
                  Search
                </Link>
              </div>
            </header>
            <main className="max-w-[80%] mx-auto px-4 pt-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/library/:libraryName" element={<Library />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ViewModeProvider>
    </PhotoLibrariesProvider>
  );
};

export default App;
