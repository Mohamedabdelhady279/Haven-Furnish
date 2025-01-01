 import React, { useEffect, useState } from 'react'
import { MdFavoriteBorder } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom'
import { addtocart, favorites } from '../redux/appslice';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import ScrollToTop from "react-scroll-to-top";

const Shop = () => {
  const dispatch=useDispatch()
  const [data, setdata] = useState([]);
  const [fliter, setfliter] = useState([]);

  const datas = useLoaderData(); // البيانات المحملة من الـ loader
  const products = datas.data;  // قائمة المنتجات داخل الكائن 'data'
  useEffect(() => {
    setdata(products);
    setfliter(products);
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


const filterproduct=(cat)=>{
  const updatelist=data.filter((x)=>x.category===cat);
  setfliter(updatelist)
}



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
          color: '#007bff', // تخصيص اللون
        }}
      />
    <div className='mb-5' data-aos="fade-right" data-aos-duration="1000" >
    <h1 className='text-4xl text-maincolor font-bold text-center'>Our Elegant Furniture Collection</h1>

      <div className='text-center mt-5 py-3 flex flex-wrap gap-2 justify-center'>
      <button  className=' bg-white-100 text-l text-maincolor  px-3 py-2 rounded-full  border-4 border-gray-300 transition-colors duration-300  hover:bg-touch items-center'  onClick={()=>setfliter(data)} >All Collection </button>
      <button id="living-room-sets" className=' bg-white-100 text-l text-maincolor  px-3 py-2 rounded-full  border-4 border-gray-300 transition-colors duration-300  hover:bg-touch items-center' onClick={()=>filterproduct("Living Room Sets")} >Living Room Sets</button>
      <button id="shoe-storage"className=' bg-white-100 text-l text-maincolor  px-3 py-2 rounded-full  border-4 border-gray-300 transition-colors duration-300  hover:bg-touch items-center' onClick={()=>filterproduct("Shoe Storage")}  >Shoe Storage</button>
      <button id="tv-stands"className=' bg-white-100 text-l text-maincolor  px-3 py-2 rounded-full  border-4 border-gray-300 transition-colors duration-300  hover:bg-touch items-center' onClick={()=>filterproduct("Tv Stands MediaConsoles")} >Tv Stands</button>
      <button id="chairs" className=' bg-white-100 text-l text-maincolor  px-3 py-2 rounded-full  border-4 border-gray-300 transition-colors duration-300  hover:bg-touch items-center' onClick={()=>filterproduct("Chairs")} >Chairs</button>
      <button id="desks" className=' bg-white-100 text-l text-maincolor  px-3 py-2 rounded-full  border-4 border-gray-300 transition-colors duration-300  hover:bg-touch items-center' onClick={()=>filterproduct("Desks")} >Desks</button>
      <button id="coffee-tables" className=' bg-white-100 text-l text-maincolor  px-3 py-2 rounded-full  border-4 border-gray-300 transition-colors duration-300  hover:bg-touch items-center' onClick={()=>filterproduct("Coffee Tables")} >Coffee Tables</button>
    </div>
    </div>


      <div className="grid grid-cols-2 md:grid-cols-2 mdl:grid-cols-3 lg:grid-cols-4 gap-4" data-aos="fade-up" data-aos-duration="1000">
        {/* استعراض المنتجات */}
        {fliter.map((item) => (
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