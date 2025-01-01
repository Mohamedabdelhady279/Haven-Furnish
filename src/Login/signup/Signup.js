import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup  from "yup";
import { useFormik } from 'formik'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FaCheck } from 'react-icons/fa';
import { MdOutlineError } from 'react-icons/md';
import './Signup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { Link } from 'react-router-dom';




const Signup = () => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  // علشان لما اليوزر ينجح ف التسجيل يطلعله تم النجاح
  const [sucssmassage, setsucssmassage] = useState("")
  const [firebase, seterorrfirebase] = useState()



  const formik=useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      repassword:""
    },
    validationSchema:Yup.object({
      name:Yup.string().max(12,"Must be 12 char").required("required"),
      email:Yup.string().email("Invaild Email ").required(" required"),
      password:Yup.string().min(8,"Must be at least 8 char") .required("required"),
      repassword:Yup.string().oneOf([Yup.ref("password")],"password not match").required("required"),
    }),
    onSubmit:(values,{resetForm})=>{
      const{name,email,password}=values
      setloading(true)

      const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ... 
    console.log(user);
    
    updateProfile(auth.currentUser, {
      displayName: name,
    });
    toast.success("Account Created Successfully!", {
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
    setsucssmassage("Account Created Successfully")
    setTimeout(() => {
      navigate("/Login")
    }, 1000);

  })
  .catch((error) => {

    // لو حصل مشكلة وقف التحميل 
    setloading(false)
    if (error.code.includes("auth/email-already-in-use")) {
      seterorrfirebase("Email already in use")
   
    }
  });

    }

  })



  return (
    <div className='container mx-auto flex flex-col justify-center items-center  py-10'>
      <ToastContainer />

    <div className='text-center mb-[50px]'data-aos="fade-right" data-aos-duration="1000">
      <h1 className='text-4xl font-bold text-center'>Sign Up Now</h1>
      <p className='text-[#6D747C] font-normal	mt-4 text-[15px]'>Sign up now and discover the perfect furniture pieces to elevate your space! </p>
    </div>




      <form className='w-full max-w-sm' onSubmit={formik.handleSubmit} action='' data-aos="fade-right" data-aos-duration="1000">


     <div className='relative mb-6'> 
     <input      className='w-full border border-gray-300 rounded px-2 py-2 focus:outline-none focus:border-blue-500'
          type='text' name='name'
          placeholder='Name'
          autoComplete='on'
          onChange={formik.handleChange}
          value={formik.values.name}
          //  معناها لما اخرج من انبوت واورح علي انبوت تاني الاول بيحصل بلر 
          onBlur={formik.handleBlur}
        />


        {formik.touched.name && formik.errors.name ? (
          <>
          <p className='text-red-500 text-[15px] mt-1'>! {formik.errors.name}</p>

            <MdOutlineError className='absolute right-3 top-3 text-red-500'/>

          </>
        ) :
          (
            formik.touched.name && !formik.errors.name && (
              <>
                <FaCheck  className='absolute right-3 top-3 text-green-500'/>

              </>
            )
          )

}
     </div>

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

        

        <div className='relative mb-6'>
        <input className='w-full border border-gray-300 rounded px-2 py-2 focus:outline-none focus:border-blue-500'
          type='password' name='repassword'
          placeholder=' repassword'
          autoComplete='on'
          onChange={formik.handleChange}
          value={formik.values.repassword}
          //  معناها لما اخرج من انبوت واورح علي انبوت تاني الاول بيحصل بلر 
          onBlur={formik.handleBlur}
        />


        {formik.touched.repassword && formik.errors.repassword ? (
          <>
          <p className='text-red-500 text-[15px] mt-1'>! {formik.errors.repassword}</p>
          <MdOutlineError className='absolute right-3 top-3 text-red-500'/>
            </>
        ) :
          (
            formik.touched.repassword && !formik.errors.repassword && (
              <>
                <FaCheck className='absolute right-3 top-3 text-green-500'/>
              </>
            )
          )
        }
        </div>


          <button type='submit' disabled={loading} className='w-full bg-blue-500 text-white py-2 rounded mt-2 hover:bg-blue-600 disabled:opacity-50'
          >
            {loading?"processing ...":"Register account"}
          </button>


        <div className='mt-2 flex'>
        <h6 className='mr-1'>Already have an account?</h6>
        <Link to='/login'>Log in</Link>
        </div>
          {firebase&&<p className='text-red-500 text-center mt-4'>{firebase}</p>}

          



      </form>

    </div>
  )
}

export default Signup