import { useEffect, useState } from "react";
import UseAuth from "../hooks/UseAuth";
import { Link } from "react-router-dom";


const Navbar2 = () => {
    const { user, logout } = UseAuth()

    // light/dark mode
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', localTheme)
    }, [theme])

    const handleToggle = e => {
        if (e.target.checked) {
            setTheme('synthwave')
        } else {
            setTheme('light')
        }
    }


    return (
        <div className="navbar mt-2 fixed z-10 bg-opacity-30 text-white font-bold px-6">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/need-volunteer'>Need volunteer</Link></li>
                        {user ? (
                            <li>
                                <a>My profile</a>
                                <ul className="p-2">
                                    <li><Link to='/add-post'>Add Volunteer Post</Link></li>
                                    <li><Link to='/manage-my-post'>Manage My Post</Link></li>
                                    <li><Link to='/my-requested'>My Volunteer Requested Post</Link></li>
                                    <li><button onClick={logout}>Logout</button></li>
                                </ul>
                            </li>
                        ) : (
                            <li><Link to='/login'>Login</Link></li>
                        )}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl"><span className="text-xl lg:text-3xl font-bold"><span className='text-red-300'>Soul</span><span className='text-violet-400'>Share</span></span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 z-50">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/need-volunteer'>Need volunteer</Link></li>
                    {user ? (
                        <li>
                            <details>
                                <summary>My profile</summary>
                                <ul className="p-2">
                                    <li><Link to='/add-post'>Add Volunteer Post</Link></li>
                                    <li><Link to='/manage-my-post'>Manage My Post</Link></li>
                                    <li><Link to='/my-requested'>My Volunteer Requested Post</Link></li>
                                    <li><button onClick={logout}>Logout</button></li>
                                </ul>
                            </details>
                        </li>
                    ) : (
                        <li><Link to='/login'>Login</Link></li>
                    )}
                </ul>
            </div>
            <div className="navbar-end gap-3">
                {/* light/dark mode */}
                <label className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input
                        onChange={handleToggle}
                        type="checkbox"
                        className="theme-controller"
                    />
                    {/* sun icon */}
                    <svg className="swap-off fill-current w-5 lg:w-8 h-5 lg:h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                    {/* moon icon */}
                    <svg className="swap-on fill-current w-5 lg:w-8 h-5 lg:h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                </label>
                <div className="relative z-50">
                    {user ? (
                        <div className="group">
                            <img className='h-8 w-8 rounded-full' src={user?.photoURL} alt="" />
                            {/* <FaUserCircle className="h-6 w-6 cursor-pointer" /> */}
                            <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                <div className="block px-4 py-2 text-sm text-gray-700">{user?.displayName}</div>
                                <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700">Logout</button>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar2;







// import { useEffect, useState } from 'react';
// import { Menu } from '@headlessui/react';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import UseAuth from '../hooks/UseAuth';
// import { Link } from 'react-router-dom';

// function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);
//     const { user, logout } = UseAuth()

//     // light/dark mode
//     const [theme, setTheme] = useState('light');

//     useEffect(() => {
//         localStorage.setItem('theme', theme)
//         const localTheme = localStorage.getItem('theme')
//         document.querySelector('html').setAttribute('data-theme', localTheme)
//     }, [theme])

//     const handleToggle = e => {
//         if (e.target.checked) {
//             setTheme('synthwave')
//         } else {
//             setTheme('light')
//         }
//     }

//     return (
//         <nav className="p-4 navbar bg-base-100 shadow-sm container px-4 mx-auto">
//             <div className="container mx-auto flex items-center justify-between">
//                 <div className="flex items-center">
//                     <span className="text-xl lg:text-3xl font-bold"><span className='text-red-300'>Soul</span><span className='text-violet-400'>Share</span></span>
//                 </div>
//                 <div className="hidden md:flex space-x-4">
//                     <Link to='/' className="">Home</Link>
//                     <Link to='/need-volunteer' className="">Need Volunteer</Link>
//                     {user ? (
//                         <Menu as="div" className="relative z-50 inline-block text-left">
//                             <div>
//                                 <Menu.Button className="">
//                                     My Profile
//                                 </Menu.Button>
//                             </div>
//                             <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
//                                 <div className="py-1">
//                                     <Menu.Item>
//                                         {({ active }) => (
//                                             <Link
//                                                 to='/add-post'
//                                                 className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}
//                                             >
//                                                 Add Volunteer Post
//                                             </Link>
//                                         )}
//                                     </Menu.Item>
//                                     <Menu.Item>
//                                         {({ active }) => (
//                                             <Link
//                                                 to='/manage-my-post'
//                                                 className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}
//                                             >
//                                                 Manage My Post
//                                             </Link>
//                                         )}
//                                     </Menu.Item>
//                                     <Menu.Item>
//                                         {({ active }) => (
//                                             <Link
//                                                 to='/my-requested'
//                                                 className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}
//                                             >
//                                                 My Volunteer Requested Post
//                                             </Link>
//                                         )}
//                                     </Menu.Item>
//                                     <Menu.Item>
//                                         {({ active }) => (
//                                             <button
//                                                 onClick={logout}
//                                                 className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}
//                                             >
//                                                 Logout
//                                             </button>
//                                         )}
//                                     </Menu.Item>
//                                 </div>
//                             </Menu.Items>
//                         </Menu>
//                     ) : (
//                         <Link to='/login' className="">Login</Link>
//                     )}
//                 </div>
//                 <div className="flex items-center space-x-4">
//                     {/* light/dark mode */}
//                     <label className="swap swap-rotate">
//                         {/* this hidden checkbox controls the state */}
//                         <input
//                             onChange={handleToggle}
//                             type="checkbox"
//                             className="theme-controller"
//                         />
//                         {/* sun icon */}
//                         <svg className="swap-off fill-current w-5 lg:w-8 h-5 lg:h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

//                         {/* moon icon */}
//                         <svg className="swap-on fill-current w-5 lg:w-8 h-5 lg:h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

//                     </label>
//                     <div className="relative z-50">
//                         {user ? (
//                             <div className="group">
//                                 <img className='h-8 w-8 rounded-full' src={user?.photoURL} alt="" />
//                                 {/* <FaUserCircle className="h-6 w-6 cursor-pointer" /> */}
//                                 <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
//                                     <div className="block px-4 py-2 text-sm text-gray-700">{user?.displayName}</div>
//                                     <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700">Logout</button>
//                                 </div>
//                             </div>
//                         ) : (
//                             <></>
//                         )}
//                     </div>
//                 </div>
//                 <div className="md:hidden">
//                     <button
//                         onClick={() => setIsOpen(!isOpen)}
//                         className=""
//                     >
//                         {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
//                     </button>
//                 </div>
//             </div>
//             {isOpen && (
//                 <div className="md:hidden lg:hidden">
//                     <Link to='/' className="block py-2">Home</Link>
//                     <Link to='/need-volunteer' className="block py-2">Need Volunteer</Link>
//                     {user ? (
//                         <div className="relative inline-block text-left">
//                             <div>
//                                 <button className="block w-full text-left py-2">
//                                     My Profile
//                                 </button>
//                             </div>

//                             <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">

//                                 <Link to='/add-post' className=''>Add Volunteer Post</Link>


//                                 <Link to='/manage-my-post'>Manage My Post</Link>


//                                 <Link to='/my-requested'>My Volunteer Requested Post</Link>


//                                 <button onClick={logout} className='block text-center'>Logout</button>

//                             </div>
//                         </div>
//                     ) : (
//                         <Link to='/login' className="block py-2">Login</Link>
//                     )}
//                 </div>
//             )}
//         </nav>
//     );
// }

// export default Navbar;