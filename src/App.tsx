import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LibraryGrid from './components/LibraryGrid';
import LibraryView from './components/LibraryView';

const App = () => {
  return (
    <Router>
      <div>
        <header className="bg-white shadow-sm py-4">
          <div className="max-w-[80%] mx-auto px-4">
            <h1 className="text-xl font-bold m-0">Photos</h1>
          </div>
        </header>
        <main className="max-w-[80%] mx-auto px-4 pt-4">
          <Routes>
            <Route path="/" element={<LibraryGrid />} />
            <Route path="/library/:libraryName" element={<LibraryView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
