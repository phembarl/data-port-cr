import { Button } from '@mui/material';
import Logo from '../assets/credrails-logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  showLinks: boolean;
}

const Navbar = ({ showLinks }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const uploadActive = location.pathname === '/';
  const detailsActive = location.pathname === '/details';

  const handleLogout = () => {
    localStorage.removeItem('credrails-user');
    navigate('/login');
  };
  return (
    <nav
      className={`flex justify-between items-center py-5 px-10 text-[#475467] border-[#dfe3e5] ${
        showLinks ? 'border-b shadow-xs' : ''
      }`}
    >
      <div className="flex items-center space-x-[12rem]">
        <div className="flex items-center space-x-5">
          <img
            src={Logo}
            alt=""
            className={`${
              showLinks ? 'w-[30px] h-[30px]' : 'w-[50px] h-[50px]'
            }`}
          />
          {!showLinks && (
            <p className="font-bold text-black text-xl">Credrails Take-Home</p>
          )}
        </div>

        {showLinks && (
          <ul className="flex space-x-20">
            <li
              className={`hover:text-[#4f54f8] ${
                uploadActive ? 'text-[#4f54f8]' : ''
              }`}
            >
              <Link to="/">Upload</Link>
            </li>
            <li
              className={`hover:text-[#4f54f8] ${
                detailsActive ? 'text-[#4f54f8]' : ''
              }`}
            >
              <Link to="/details">Details</Link>
            </li>
          </ul>
        )}
      </div>
      {showLinks && (
        <Button
          className="!bg-[#4f54f8] !text-white !rounded-[0.5rem] !text-[0.8rem] !px-3"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
