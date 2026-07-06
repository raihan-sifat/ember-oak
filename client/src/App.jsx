import { Routes, Route, useLocation } from 'react-router-dom';
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Admin from './pages/Admin';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <Splash />
      <Navbar />
      <main className="flex-1">
        <div
          key={location.pathname}
          className="animate-[page-enter_0.45s_ease-out_both] motion-reduce:animate-none"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}
