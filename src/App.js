import { Routes, Route } from 'react-router-dom';
import './assets/styles/index.scss';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SearchPage from './pages/SearchPage';
import { register } from 'swiper/element/bundle';
import PersonDetailsPage from './pages/PersonDetailsPage';

const App = () => {
  register();
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/movie/:id" element={<MovieDetailsPage />}></Route>
      <Route path="/search/:searchValue" element={<SearchPage />}></Route>
      <Route path="/person/:id" element={<PersonDetailsPage />}></Route>
    </Routes>
  );
};

export default App;
