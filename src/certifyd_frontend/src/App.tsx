import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/SignupLoginPage/LoginPage';
import SignupPage from './pages/SignupLoginPage/SignupPage';
import HomePage from './pages/HomePage/homePage';
import StudentPage from './pages/StudentPage.tsx/StudentPage';
import UniversitiesPage from './pages/UniversityPage/UniversityPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import AuthenticationPage from './pages/AuthPage/AuthentificationPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import InstitutionDashboardPage from './pages/InstitutionDashboardPage/InstitutionDashboardPage';
import { FAQPage } from './pages/FAQPage/FAQPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/university" element={<UniversitiesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/auth/:id" element={<AuthenticationPage />} />
        <Route path="/institution-dashboard" element={<InstitutionDashboardPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;