import { Routes, Route, useLocation } from 'react-router-dom'; 
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
import Login from './pages/admin/Login'
import AdminPage from './pages/admin/AdminPage';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import ProductDetail from './pages/ProductDetail';


function App() {
  const location = useLocation();
  const adminRoutes = ['/login', '/adminpage', '/unauthorized'];
  const hideLayout = adminRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      {!hideLayout && <ButtonContract />}
      <main className={`${hideLayout ? '' : 'container mx-auto px-4 py-8'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/product" element={<Product />} />
          <Route path="/csr" element={<CSR />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/product/:id" element={<ProductDetail />} />
    
          
          {/* Protected Admin Route */}
          <Route 
            path="/adminpage" 
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
