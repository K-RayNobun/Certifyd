import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";


const NotFoundPage = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
        <FontAwesomeIcon icon={ faTriangleExclamation } className=" text-yellow-400 text-6xl mb-4" />
        <h2 className="text-6xl font-bold mb-4">404 Not Found</h2>
        <p className="text-xl mb-5">This Page does not exist</p>

        <Link to="/" className='text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2'>
            Go Back
        </Link>
    </section>
  );
}

export default NotFoundPage