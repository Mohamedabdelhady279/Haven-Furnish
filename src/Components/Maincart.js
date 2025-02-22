  import React, { useEffect } from 'react'
  import { useDispatch, useSelector } from 'react-redux';
  import { decrement, increment, removefromcart, updateProducts } from '../redux/appslice';
  import { Link } from 'react-router-dom';
  import { MdPayments } from 'react-icons/md';
  import { GiTakeMyMoney } from 'react-icons/gi';
  import { FaShippingFast } from 'react-icons/fa';
import ScrollToTop from 'react-scroll-to-top';

  const Maincart = () => {
    const Products = useSelector((state) => state.appReducer.Products);
    const subtotal = useSelector((state) => state.appReducer.subtotal); // جلب المجموع الفرعي

    const dispatch = useDispatch()





    // تحديث localStorage عند تغيير المنتجات
    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(Products));
    }, [Products]);





    // لما اضغط علي الصورة 
    const handleImageClick = (productId, newImage) => {
      const updatedProducts = Products.map((product) =>
        product.id === productId
          ? { ...product, mainImage: newImage }
          : product
      );
      // تحديث الحالة في Redux أو مباشرة في local state حسب طريقة الإدارة
      dispatch(updateProducts(updatedProducts)); // تحديث المنتجات في Redux
    };





    // حساب الكمية الكلية
    const totalQuantity = Products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);

    return (



      <div className='py-10' data-aos="fade-right" data-aos-duration="1000">
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
        <h1 className='font-bold text-maincolor text-center p-[20px]'>Your Cart</h1>

        {Products.length > 0 ?

          <section className='mt-5'>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-5">


      {/* المنتجات    */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {Products.map((item) => (
        <div key={item.id} className="border p-4 rounded-lg shadow-lg bg-white">
        <img src={item.mainImage} alt="mainImage" className="w-full h-[200px]  object-cover rounded mb-4" />
        <h1 className="text-lg font-semibold mb-3">{item.name}.</h1>
        <div className="flex items-center gap-2 mb-3">
        <button
        onClick={() => dispatch(decrement(item.id))}
        className="bg-gray-300 text-maincolor text-lg font-bold px-3 py-1 rounded"
        >
        -
        </button>
        <p className="text-lg font-bold mb-2 ">{item.quantity}</p>
        <button
        onClick={() => dispatch(increment(item.id))}
        className="bg-gray-300 text-maincolor text-lg font-bold px-3 py-1 rounded"
        >
        +
        </button>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
        <span>Rating: {item.rating}</span>
        <span className='text-green-600'>{item.ratingsCount} reviews</span>
        </div>
        <h1 className="text-xl font-bold mt-2">Price: ${(item.quantity * item.price).toFixed(2)}</h1>
        <button
        className="mt-3 w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
        onClick={() => dispatch(removefromcart(item.id))}
        >
        Remove
        </button>

        {/* الصور الفرعية */}
        <div className="flex gap-2 mt-4">
        {item.sideimage.map((image, index) => (
        <img
        key={index}
        src={image.url}
        alt={image.alt}
        className="w-16 h-16 object-cover rounded cursor-pointer"
        onClick={() => handleImageClick(item.id, image.url)}
        />
        ))}
        </div>
        </div>
        ))}
        </div>






    {/* تفاصيل الحساب  */}
        <div className="lg:col-span-1 w-30 h-[290px] border-2 border-gray-200 p-3 rounded-xl shadow-xl  bg-gray-200">
          <h1 className="text-3xl font-bold mb-3">Order Details</h1>
          <div className="text-lg ">
            <h2 className="text-xl font-bold text-gray-500 flex justify-between">
              Quantity: <span className="text-maincolor  ">{totalQuantity}</span>
            </h2>
            <h2 className="text-xl font-bold  text-gray-500 mt-2 flex justify-between">
              Total Price: <span className="text-maincolor">${subtotal.toFixed(2)}</span>
            </h2>
          </div>
          <Link to='/Chackout' className="mt-5">
            <button className="bg-maincolor text-white px-6 py-3 rounded-full hover:bg-opacity-80 transition-all">
              Proceed to Checkout
            </button>
          </Link>
          <div className='mt-2 flex   '>
            <h6 className='mr-1'><span className='text-red-700 text-xl font-bold '>!</span> You must <Link to='/login'>Log in</Link> First  !
            </h6>

          </div>
        </div>






            </div>








   {/* chosse us  */}
            <div className='container mx-auto m-[100px]'>
              <h1 className='text-[#333333] font-bold text-center text-3xl py-10'>
                Why should you choose us?
              </h1>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center'>
                {/* Free Shipping */}
                <div className='flex flex-col items-center'>
                  <FaShippingFast className='text-[60px] py-2' />
                  <h2 className='text-[16px] mt-6 font-sans font-bold text-center'>Free Shipping</h2>
                </div>

                {/* Money-Back Guarantee */}
                <div className='flex flex-col items-center'>
                  <GiTakeMyMoney className='text-[60px] py-2' />
                  <h2 className='text-[16px] mt-6 font-sans font-bold text-center'>Money-Back Guarantee</h2>
                </div>

                {/* Easy Payments */}
                <div className='flex flex-col items-center'>
                  <MdPayments className='text-[60px] py-2' />
                  <h2 className='text-[16px] mt-6 font-sans font-bold text-center'>Easy Payments</h2>
                </div>
              </div>
            </div>

          </section>

          :

          <div>
            <h1 className='font-bold text-3xl text-maincolor text-center py-5'>No products in cart</h1>
          </div>

        }

      </div>
    )}

  export default Maincart