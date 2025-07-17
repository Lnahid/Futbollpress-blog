import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header() {
  return (
    <header className="bg-navy text-light py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold text-sky">FutbollPress</Link>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-sky transition">Ana səhifə</Link>
          <Link to="/haqqimizda" className="hover:text-sky transition">Haqqımızda</Link>
          <Link to="/elaqe" className="hover:text-sky transition">Əlaqə</Link>
        </nav>
        <div className="ml-4"><SearchBar /></div>
      </div>
    </header>
  );
}

export default Header; 