import { BrowserRouter, Route, Routes } from 'react-router';

import PageHeader from './components/PageHeader';
import ActivitesPage from './components/ActivitesPage';
import ActivitePage from './components/ActivitePage';
import SettingsPage from './components/SettingsPage';
import NotFoundPage from './components/NotFoundPage';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageHeader />} />
      </Routes>
      <Routes>
        <Route path="/activites" element={<ActivitesPage />} />
        <Route path="/activites/:activiteId" element={<ActivitePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
