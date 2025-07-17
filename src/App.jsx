import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PostDetail from './pages/PostDetail';
import Search from './pages/Search';

function App() {
  return (
    <div className="bg-light min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/haqqimizda" element={<About />} />
        <Route path="/elaqe" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App; 