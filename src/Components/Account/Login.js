import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setuser } from '../../redux/appslice';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { facebookProvider, GoogleProvider } from "../../firebaseConfig";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { FaCheck, FaFacebook } from 'react-icons/fa';
import { FaGoogle } from "react-icons/fa6";
import { MdOutlineError } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {

  const navigat = useNavigate()
  const [loading, setloading] = useState(false)
  const [sucssmassage, setsucssmassage] = useState("")
  const [firebase, seterorrfirebase] = useState()
  const dispatch = useDispatch()
  const auth = getAuth();



  const handleGoogleLogin = async () => {
    try {
      setloading(true);
      const result = await signInWithPopup(auth, GoogleProvider);
      const user = result.user;
      const userData = {
        __id: user.uid,
        email: user.email,
        username: user.displayName || "User",
      };

      localStorage.setItem("userinfo", JSON.stringify(userData));
      dispatch(setuser(userData));
      toast.success(`Welcome, ${user.displayName}!`, { position: "top-center", autoClose: 2000, hideProgressBar: true, theme: "dark", transition: Bounce });
      setTimeout(() => navigat("/"), 1000);
    } catch (error) {
      console.log("Google Login Error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        return; // لا تعرض رسالة خطأ
        
      }
      seterorrfirebase("Failed to login with Google. Please try again.");
      
    }
  };






  const handleFacebookLogin = async () => {
    try {
      setloading(true);
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      const userData = {
        __id: user.uid,
        email: user.email,
        username: user.displayName || "User",
      };
      localStorage.setItem("userinfo", JSON.stringify(userData));
      dispatch(setuser(userData));
      toast.success(`Welcome, ${user.displayName}!`, { position: "top-center", autoClose: 2000, hideProgressBar: true, theme: "dark", transition: Bounce });
      setTimeout(() => navigat("/"), 1000);
    } catch (error) {
      console.log("Facebook Login Error:", error);
      setloading(false);

      if (error.code === "auth/popup-closed-by-user") {
        console.log("User closed the popup.");
        return;
      }
      seterorrfirebase("Failed to login with Facebook. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },


    validationSchema: Yup.object({

      email: Yup.string().email("invalid Email")
        .required("required"),
      password: Yup.string().min(8, "Must be at least 8 char")
        .required("required")
    }),


    onSubmit: (values) => {
      const { email, password } = values;
      setloading(true)


      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          const userData = {
            __id: user.uid,
            email: user.email,
            username: user.displayName || "User",
          };
          localStorage.setItem("userinfo", JSON.stringify(userData));

          dispatch(setuser(userData))

          toast.success("Welcome to our site ✨", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          setsucssmassage("Welcome to our site")
          setloading(false)
          setTimeout(() => {
            navigat("/")
          }, 1000);
        })




        .catch((error) => {
          setloading(false);
          if (error.code.includes("auth/wrong-password")) {
            seterorrfirebase("Wrong password.please try again.");
          } else if (error.code.includes("auth/user-not-found")) {
            seterorrfirebase("User not found with this email.");
          } else {
            seterorrfirebase("An erorr occurred.please try again.");
          }
        });


    },
  });


  return (
    <div data-aos="fade-right" data-aos-duration="1000">


      <div className='container mx-auto flex flex-col justify-center items-center  py-10'>
        <ToastContainer />

        <div className='text-center mb-[50px]'>
          <h1 className='text-4xl font-bold text-center'>Login Now</h1>
          <p className='text-[#6D747C] font-normal	mt-4 text-[15px]'>Login now and discover the perfect furniture pieces to elevate your space! </p>
        </div>




        <form className='w-full max-w-sm' onSubmit={formik.handleSubmit} action=''>



          <div className='relative mb-6'>
            <input className='w-full border border-gray-300 rounded px-2 py-2 focus:outline-none focus:border-blue-500'
              type='email' name='email'
              placeholder='Enter your Email'
              autoComplete='on'
              onChange={formik.handleChange}
              value={formik.values.email}
              //  معناها لما اخرج من انبوت واورح علي انبوت تاني الاول بيحصل بلر 
              onBlur={formik.handleBlur}
            />


            {formik.touched.email && formik.errors.email ? (
              <>
                <p className='text-red-500 text-[15px] mt-1'>! {formik.errors.email}</p>
                <MdOutlineError className='absolute right-3 top-3 text-red-500' />
              </>
            ) :
              (
                formik.touched.email && !formik.errors.email && (
                  <>
                    <FaCheck className='absolute right-3 top-3 text-green-500' />
                  </>
                )
              )

            }
          </div>


          <div className='relative mb-6'>
            <input className='w-full border border-gray-300 rounded px-2 py-2 focus:outline-none focus:border-blue-500'
              type='password' name='password'
              placeholder='Enter your Password'
              autoComplete='on'
              onChange={formik.handleChange}
              value={formik.values.password}
              //  معناها لما اخرج من انبوت واورح علي انبوت تاني الاول بيحصل بلر 
              onBlur={formik.handleBlur}
            />


            {formik.touched.password && formik.errors.password ? (
              <>
                <p className='text-red-500 text-[15px] mt-1'>! {formik.errors.password}</p>
                <MdOutlineError className='absolute right-3 top-3 text-red-500' />
              </>
            ) :
              (
                formik.touched.password && !formik.errors.password && (
                  <>
                    <FaCheck className='absolute right-3 top-3 text-green-500' />
                  </>
                )
              )

            }
          </div>




          <button type='submit' disabled={loading} className='w-full bg-blue-500 text-white py-2 rounded mt-2 hover:bg-blue-600 disabled:opacity-50'
          >
            {loading ? "processing ..." : "Login"}
          </button>



          <div className='mt-2 flex '>
            <h6 className='mr-1'>  Not registered yet?</h6>
            <Link to='/Signup'>Create account!</Link>
          </div>
          {firebase && <p className='text-red-500 text-center mt-4'>{firebase}</p>}




        </form>

        <div className="flex flex-col items-center gap-3 mt-4 w-full max-w-[400px]">
          <p className='mt-2 text-[#7a7777]'>Or Continue with </p>


          <Link  onClick={handleGoogleLogin} className="w-full flex justify-center bg-red-600 text-white py-2 rounded hover:bg-red-500">
            <button className='flex items-center gap-2'  >
              <FaGoogle className=' text-[22px]' />Sign in with Google
            </button>
          </Link>

          <Link onClick={handleFacebookLogin} className="w-full flex justify-center  bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
            <button className='flex items-center gap-2'  >
              <FaFacebook className=' text-[22px]' />Sign in with Facebook
            </button>
          </Link>


        </div>

      </div>


    </div>
  )
}

export default Login