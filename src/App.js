import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Home from './Home';
import Shop from './Shop/Shop';
import Login from './Login/login/Login';
import Signup from './Login/signup/Signup';
import Favorite from './Favorite/Favorite';
import Maincart from './Cart/Maincart';
import { productdata } from './api';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import Chackout from './Chackout/Chackout';
import ProtectedRoute from './ProtectedRoute';
import AOS from "aos";
import "aos/dist/aos.css";

const Layout = () => {
  
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}

      />

      
    </>
  )
}


const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);
  const router = createBrowserRouter(createRoutesFromElements(

    <Route>

      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} loader={productdata} ></Route>
        <Route path='/shop' element={<Shop />} loader={productdata}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/Login' element={<Login />}></Route>

        <Route path='/Maincart' element={<Maincart />}></Route>

        <Route path='/Favorite' element={<Favorite />}></Route>
        <Route path='/Chackout' element={
          <ProtectedRoute>
            <Chackout />
          </ProtectedRoute>
        }></Route>


      </Route>

    </Route>

  ))



  return (

    <div>
      <RouterProvider router={router} />


    </div>
  )
}

export default App