 import React, { useEffect, useMemo, useState } from 'react'
import { MdFavoriteBorder } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom'
import { addtocart, favorites } from '../redux/appslice';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import ScrollToTop from "react-scroll-to-top";
import Sidefilter from './Sidefilter';

const Shop = () => {
  const dispatch=useDispatch()
  const [data, setdata] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const datas = useLoaderData(); // البيانات المحملة من الـ loader
  const products = datas.data;  // قائمة المنتجات داخل الكائن 'data'
  
  useEffect(() => {
    setdata(products);
   
    }, [products]);





//  داله اظهار الاشعار 
const notification = (name, id) => {
  // التحقق إذا كان المنتج قد تم إضافته من قبل باستخدام الـ localStorage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const words = name.split(' ');
  const firstTwoWords = words.slice(0, 2).join(' ');  // دمج أول كلمتين
  if (cartItems.includes(id)) {
    // إذا كان العنصر موجودًا بالفعل في العربة، عرض إشعار بأن المنتج مضاف مسبقًا
    toast.info(
      `${firstTwoWords} has  been added again!`,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
        
      }
    );
  } else {
    // إذا لم يكن العنصر موجودًا من قبل، إضافته إلى العربة
    cartItems.push(id);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    toast.success(
      `${firstTwoWords} has been added !`,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
       
      }
    );
  }
};

// جزء الفلتر 
const filteredItems = useMemo(() => {
  const min = minPrice === '' ? 0 : Number(minPrice);
  const max = maxPrice === '' ? Infinity : Number(maxPrice);

  return data
    // 1. فلترة الفئة
    .filter(item =>
      !selectedCategory || item.category === selectedCategory
    )
    // 2. فلترة بالسعر
    .filter(item =>
      item.price >= min && item.price <= max
    );
}, [data, selectedCategory, minPrice, maxPrice]);


  return (
    <div className=" container mx-auto my-5  py-10">
      <ToastContainer />
          
      {/* تطلع علي اول */}
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
          color: 'rgb(184,142,47)', // تخصيص اللون
        }}
      />

      {/* filter */}
      <div className='mb-5' data-aos="fade-right" data-aos-duration="1000">
  <h1 className='text-4xl text-maincolor font-bold text-center'>
    Our Elegant Furniture Collection
  </h1>
  <div className='text-center mt-5 py-3 flex flex-wrap gap-2 justify-center'>
    {/* زر “الكل” */}
    <button
      className={`px-3 py-2 rounded-full border-2 ${
        !selectedCategory
          ? 'bg-maincolor text-white'
          : 'bg-white text-maincolor border-gray-300'
      }`}
      onClick={() => setSelectedCategory('')}
    >
      All Collection
    </button>
    {/* أزرار الفئات الثابتة */}
    {[
      'Living Room Sets',
      'Shoe Storage',
      'Tv Stands MediaConsoles',
      'Chairs',
      'Desks',
      'Coffee Tables'
    ].map(cat => (
      <button
        key={cat}
        className={`px-3 py-2 rounded-full border-2 ${
          selectedCategory === cat
            ? 'bg-maincolor text-white'
            : 'bg-white text-maincolor border-gray-300'
        }`}
        onClick={() => setSelectedCategory(cat)}
      >
        {cat}
      </button>
    ))}
  </div>
</div>






        <Sidefilter data={data}  minPrice={minPrice} maxPrice={maxPrice} onMinChange={setMinPrice} onMaxChange={setMaxPrice}/>
{/*البيانات  */}
      <div className="grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 mdl:grid-cols-3 lg:grid-cols-4 gap-4" data-aos="fade-up" data-aos-duration="1000">
        {/* استعراض المنتجات */}
        {filteredItems.map((item) => (
          <div key={item.id} className="relative border-2 border-gray-300 rounded-lg flex flex-col  justify-between min-h-[300px] ">
            {/* صورة المنتج */}
            <img src={item.mainImage.url} alt={item.mainImage.alt} className="w-full h-40 mb-3 object-cover rounded-md" />
            
            <h3 className="text-lg font-semibold ">{item.name.substring(0, 40)} ...</h3>
            
            {/* سعر المنتج */}
            <p className="text-lg font-bold text-maincolor">${item.price}</p>
            
            {/* زر عرض المزيد */}
          <button className='absolute right-5 bottom-2 bg-maincolor p-2 rounded-full transition-colors duration-300 hover:bg-touch'>
             <MdFavoriteBorder className='font-semibold text-3xl text-white' 
             onClick={() => {
              dispatch(favorites(item)); // إضافة المنتج إلى المفضلة
              toast.success(`${item.name.split(' ').slice(0, 2).join(' ')} added to favorites!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "light",
              });
            }}
             
             />
             </button>

          
          <div className=' items-center m-2'>
          <button  className="  bg-white-50 text-maincolor px-3 py-2 rounded-3xl border border-black	  transition-colors duration-300 hover:bg-touch" 
          onClick={() => {
            dispatch(addtocart({
              id: item.id,
              name: item.name,
              price: item.price,
              mainImage: item.mainImage.url,
              sideimage: item.images.slice(0, 4),
              quantity: 1,
              rating: item.ratings,
              ratingsCount: item.ratingsCount
            }));
            notification(item.name, item.id);  // استدعاء دالة الإشعار بعد إضافة المنتج إلى العربة
          }}>
              Add to cart
            </button>

            
          </div>


          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;