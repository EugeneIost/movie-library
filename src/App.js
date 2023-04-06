import { Routes, Route } from 'react-router-dom';
import './assets/styles/index.scss';
import { register } from 'swiper/element/bundle';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SearchPage from './pages/SearchPage';

const App = () => {
  register();
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/search/:searchValue" element={<SearchPage />} />
      </Route>
    </Routes>
  );
};

export default App;
