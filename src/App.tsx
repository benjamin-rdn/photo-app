import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '@/App.css';

import { Link } from 'react-router-dom';
import { PhotoLibrariesProvider } from '@/Providers/PhotoLibrariesProvider';
import { Home } from '@/pages/Home';
import { LibraryView } from '@/pages/LibraryView';
import { Search } from '@/pages/Search';

const App = () => {
  return (
    <PhotoLibrariesProvider>
      <Router>
        <div>
          <header className="bg-white shadow-sm py-4">
            <div className="max-w-[80%] mx-auto px-4 flex flex-row items-center gap-4">
              <Link to="/">
                <h1 className="text-xl font-bold m-0">Photos</h1>
              </Link>
              <Link to="/search" className="hover:underline">
                Search
              </Link>
            </div>
          </header>
          <main className="max-w-[80%] mx-auto px-4 pt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/library/:libraryName" element={<LibraryView />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
        </div>
      </Router>
    </PhotoLibrariesProvider>
  );
};

export default App;
