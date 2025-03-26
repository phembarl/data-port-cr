import { Routes, Route, useLocation } from 'react-router-dom';
import SignUp from './views/signup';
import Navbar from './components/Navbar';
import Login from './views/login';
import { Bounce, ToastContainer } from 'react-toastify';
import ProtectedRoute from './ProtectedRoute';
import UploadFile from './views/upload-file';
import Details from './views/details';

const App = () => {
  const location = useLocation();
  return (
    <>
      <Navbar
        showLinks={
          location.pathname !== '/signup' && location.pathname !== '/login'
        }
      />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<UploadFile />} />
          <Route path="/details" element={<Details />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
