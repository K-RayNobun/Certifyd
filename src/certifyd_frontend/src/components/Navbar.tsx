import { NavLink } from 'react-router-dom';
import logo from "./../assets/logo.png"

const Navbar = () => {

  const linkClass = ({ isActive }) => {
    console.log('This is active');
    return isActive ? "text-blue-600 bg-white hover:bg-gray-900 hover:text-blue-800 rounded-md px-3 py-2" : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";
  }

  return (
    <>
    <div className="navbar px-20 py-2 bg-gradient-to-t from-blue-700 to-blue-800">
        <NavLink to="/" className="flex flex-shrink-0 items-center mr-4">
          <img src={ logo } className='size-12 rounded-full' alt="" />
          <span className="hidden md:block text-white text-2xl font-bold ml-2"> Certifyd</span>
        </NavLink>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            <li><NavLink to="/" className={ linkClass }>Home</NavLink></li>
            <li><NavLink to="/dashboard" className={ linkClass }>Dashboard</NavLink></li>
            <li><NavLink to="/auth" className={ linkClass }>Auth</NavLink></li>
            <li><NavLink to="/about-us" className={ linkClass }>Info</NavLink></li>
            </ul>
            <div className='ml-10'>
              <button className="mt-2 mx-2 px-3 py-2 rounded-full bg-white font-bold text-blue-600 hover:bg-blue-700">
                Sign In
              </button>
              <button className="mt-2 mx-2 px-3 py-2 rounded-full bg-white font-bold text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white">
                Register
              </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar