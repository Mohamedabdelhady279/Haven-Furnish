import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from 'formik';
import * as Yup  from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { FaCheck } from 'react-icons/fa';
import { MdOutlineError } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setuser } from '../../redux/appslice';
import { Link } from 'react-router-dom';
const Login = () => {
  
  const navigat = useNavigate()
  const [loading, setloading] = useState(false)
  // علشان لما اليوزر ينجح ف التسجيل يطلعله تم النجاح
  const [sucssmassage, setsucssmassage] = useState ("")
  const [firebase, seterorrfirebase] = useState()
  const dispatch=useDispatch()
  


  const formik = useFormik({
    initialValues: { email: '',   password: '' },


    validationSchema: Yup.object({
   
      email: Yup.string().email("invalid Email")
      .required("required"),
      password: Yup.string().min(8, "Must be at least 8 char")
      .required("required")
    }),


    onSubmit: (values) => {
      const {email, password} = values;
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
       if(error.code.includes("auth/wrong-password")){
        seterorrfirebase("Wrong password.please try again.");
       }else if(error.code.includes("auth/user-not-found")){
        seterorrfirebase("User not found with this email.");
       }else{
        seterorrfirebase("An erorr occurred.please try again.");
       }
        });


    },
    })
      

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
    <input  className='w-full border border-gray-300 rounded px-2 py-2 focus:outline-none focus:border-blue-500'
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
          <MdOutlineError className='absolute right-3 top-3 text-red-500'/>
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
      <input  className='w-full border border-gray-300 rounded px-2 py-2 focus:outline-none focus:border-blue-500'
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
          <MdOutlineError className='absolute right-3 top-3 text-red-500'/>
          </>
        ) :
          (
            formik.touched.password && !formik.errors.password && (
              <>
                <FaCheck className='absolute right-3 top-3 text-green-500'/>
              </>
            )
          )

        }
      </div>

        


          <button type='submit' disabled={loading} className='w-full bg-blue-500 text-white py-2 rounded mt-2 hover:bg-blue-600 disabled:opacity-50'
          >
            {loading?"processing ...":"Login"}
          </button>
     

          <div className='mt-2 flex'>
        <h6 className='mr-1'>  Not registered yet?</h6>
        <Link to='/Signup'>Create account</Link>
        </div>
          {firebase&&<p className='text-red-500 text-center mt-4'>{firebase}</p>}

          


      </form>

    </div>


    </div>
  )
}

export default Login