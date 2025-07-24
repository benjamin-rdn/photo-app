import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LibraryGrid from './components/LibraryGrid';
import LibraryView from './components/LibraryView';

const App = () => {
  return (
    <Router>
      <div>
        <header className="header">
          <div className="container">
            <h1>Photography Portfolio</h1>
          </div>
        </header>
        <main className="container">
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
