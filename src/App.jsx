import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import Product from './pages/Product';
import CSR from './pages/CSR';
import Privacy from './pages/Privacy';
import ButtonContract from './components/ButtomContract';
import Certificates from './pages/Certificates';


function App() {
  return (
    <>
      <Navbar />
      <ButtonContract />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/product" element={<Product />} />
          <Route path="/csr" element={<CSR />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/certificate" element={<Certificates />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
