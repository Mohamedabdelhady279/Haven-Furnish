import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, ScrollRestoration } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Shop from './Components/Shop';
import Signup from './Components/Account/Signup';
import Login from './Components/Account/Login';
import Maincart from './Components/Maincart';
import Favorite from './Components/Favorite';
import Chackout from './Components/Chackout';
import ProtectedRoute from './Components/Account/ProtectedRoute';
import { productdata } from './api';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';  
import AOS from "aos";
import "aos/dist/aos.css";





const Layout = () => {
  
  return (
    <>
      <Header />
      {/* خاص ب scroll position */}
      <ScrollRestoration />

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