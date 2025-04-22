import Dashboard from '../pages/dashboard/Dashboard.jsx';
import Login from '../pages/auth/Login.jsx';
import Signup from '../pages/auth/Signup.jsx';
import HeroSection from '../pages/landingpage/Hero.jsx';
import OTPmodal from '../pages/auth/OTPmodal.jsx';
import ForgotPassword from '../pages/forgotpassword/ForgotPassword.jsx';
import ResetPassword from '../pages/resetpassword/ResetPassword.jsx';
import NotFound from '../pages/notfound/Notfound.jsx';
import ExpenseTable from '../components/tables/ExpenseTable.jsx';
import IncomeTable from '../components/tables/IncomeTable.jsx';
import Graph from '../components/graph/graph.jsx';
import ProfilePage from '../pages/dashboard/ProfilePage.jsx';
import Settings from '../pages/dashboard/Settings.jsx';
import LandingPage from '../pages/landingpage/LandingPage.jsx';
import About from '../pages/about/About.jsx';
import Contact from '../pages/contact/Contact.jsx';
import Services from '../pages/services/service.jsx';
export const AppRoutes = [
  {
    path: '/login',
    element: <HeroSection />,
    layout: 'landing',
    protection: false,
  },
  {
    path: '/register',
    element: <Signup />,
    layout: 'landing',
    protection: false,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    layout: 'app',
    protection: true,
    childpath: [
      { path: 'expense', element: <ExpenseTable /> },
      { path: 'income', element: <IncomeTable /> },
      { path: 'graph', element: <Graph /> },
    ],
  },
  { path: '/otp', element: <OTPmodal />, layout: 'app', protection: false },
  {
    path: '/',
    element: <LandingPage />,
    layout: 'landing',
    protection: false,
  },
  {
    path: '/forgot',
    element: <ForgotPassword />,
    layout: 'landing',
    protection: true,
  },

  {
    path: '/reset/:token',
    element: <ResetPassword />,
    layout: 'landing',
    protection: true,
  },
  {
    path: '*',
    element: <NotFound />,
    layout: 'landing',
    protection: false,
  },

  {
    path: '/profile',
    element: <ProfilePage />,
    layout: 'app',
    protection: true,
  },

  {
    path: '/settings',
    element: <Settings />,
    layout: 'app',
    protection: true,
  },

  {
    path: '/about',
    element: <About />,
    layout: 'landing',
    protection: false,
  },

  {
    path: '/contact',
    element: <Contact />,
    layout: 'landing',
    protection: false,
  },

  {
    path: '/services',
    element: <Services />,
    layout: 'landing',
    protection: false,
  },
];
