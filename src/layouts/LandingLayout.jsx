import { Navbar } from '../components/Navbar.jsx';
import { Footer } from '../components/Footer.jsx';

const LandingLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
