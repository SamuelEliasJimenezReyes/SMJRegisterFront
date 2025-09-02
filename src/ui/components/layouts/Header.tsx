import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const hasJWT = localStorage.getItem('jwtToken');
  const isDirectivoRoute = location.pathname.startsWith('/directivo');

  if (!hasJWT || !isDirectivoRoute) {
    return null;
  }

  return (
    <header className="bg-base-100 px-[40px] text-white p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-[25px] font-bold">SMJ Register</h1>
        
        <nav className="flex gap-6">
          <Link 
            to="/directivo/dashboard" 
            className={`hover:text-primary transition-colors ${
              location.pathname === '/directivo/dashboard' ? 'text-primary font-semibold' : ''
            }`}
          >
            Caja Chica
          </Link>
          <Link 
            to="/directivo/campers" 
            className={`hover:text-primary transition-colors ${
              location.pathname === '/directivo/campers' ? 'text-primary font-semibold' : ''
            }`}
          >
            Campistas
          </Link>
          <Link 
            to="/directivo/rooms" 
            className={`hover:text-primary transition-colors ${
              location.pathname === '/directivo/rooms' ? 'text-primary font-semibold' : ''
            }`}
          >
            Habitaciones
          </Link>
          <Link 
            to="/directivo/granted-codes" 
            className={`hover:text-primary transition-colors ${
              location.pathname === '/directivo/granted-codes' ? 'text-primary font-semibold' : ''
            }`}
          >
            Códigos de Beca
          </Link>
          <Link 
            to="/directivo/payments" 
            className={`hover:text-primary transition-colors ${
              location.pathname === '/directivo/payments' ? 'text-primary font-semibold' : ''
            }`}
          >
            Pagos
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;