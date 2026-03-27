import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom';
// import {ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const PageLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        {/* <ToastContainer /> */}
        <Footer />
    </>
  )
}

export default PageLayout