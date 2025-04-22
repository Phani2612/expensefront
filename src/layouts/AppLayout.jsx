import { Footer } from '../components/Footer.jsx';
import AppHeader from '../components/Appbar.jsx';
const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
