import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import { useSelector } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';

const Chackout = () => {
  const subtotal = useSelector((state) => state.appReducer.subtotal); // جلب المجموع الفرعي
  const discount = useSelector((state) => state.appReducer.discount); // جلب قيمة الخصم
  const [isSuccess, setIsSuccess] = useState(false); // حالة للتحكم في ظهور التنبيه

  // إعداد Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      zip: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Full Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      address: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      zip: Yup.string()
        .matches(/^\d{5}$/, 'ZIP code must be 5 digits')
        .required('ZIP Code is required'),
    }),
    onSubmit: (values,{resetForm}) => {
      console.log('Form Data:', values);
      setIsSuccess(true);
      resetForm();
    },
  });

  return (

    <div className="max-w-7xl mx-auto p-5 font-sans">
       <ScrollToTop
        smooth
        component={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="40"
            height="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V6m0 0L5 13m7-7l7 7" />
          </svg>
        }
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          cursor: 'pointer',
          color: '#007bff', // تخصيص اللون
        }}
      />

      <h1 className="text-3xl font-bold mb-6" data-aos="fade-right" data-aos-duration="1000">Checkout</h1>
    

      <div className="flex flex-col lg:flex-row gap-5">
        {/*  التفاصيل  */}
        <div className="flex-1 p-5 border border-gray-300 rounded-lg bg-gray-100" data-aos="fade-right" data-aos-duration="1000">
          <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                className={`w-full p-3 border ${
                  formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
                } rounded-lg`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className={`w-full p-3 border ${
                  formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 mb-1">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                className={`w-full p-3 border ${
                  formik.touched.address && formik.errors.address ? 'border-red-500' : 'border-gray-300'
                } rounded-lg`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-700 mb-1">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
                className={`w-full p-3 border ${
                  formik.touched.city && formik.errors.city ? 'border-red-500' : 'border-gray-300'
                } rounded-lg`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="zip" className="block text-gray-700 mb-1">ZIP Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                placeholder="Enter your ZIP code"
                className={`w-full p-3 border ${
                  formik.touched.zip && formik.errors.zip ? 'border-red-500' : 'border-gray-300'
                } rounded-lg`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.zip}
              />
              {formik.touched.zip && formik.errors.zip && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.zip}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-all"
            >
              Place Order
            </button>
            
          </form>
          {isSuccess && (
        <div role="alert" className="alert alert-success mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your order has been successfully placed!</span>
        </div>
      )}
        </div>



        {/* Order Summary */}
        <div className="flex-1 p-5 border h-[230px] border-gray-300 rounded-lg bg-gray-100" data-aos="fade-left" data-aos-duration="2000">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-3">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span>Discount (5%):</span>
            <span>${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold mb-6">
            <span>Total:</span>
            <span>${(subtotal - discount).toFixed(2)}</span>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Chackout;
