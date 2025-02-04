import React from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Home = () => {
  

  const datas = useLoaderData(); // البيانات المحملة من الـ loader
  const products = datas.data;  // قائمة المنتجات داخل الكائن 'data'






  const groundimg = {
    backgroundImage: "url('/Images/home.png')", // رابط الصورة الخلفية
    backgroundSize: 'cover',     // يغطي العنصر بالكامل
    backgroundPosition: 'center', // تمركز الخلفية
    backgroundRepeat: 'no-repeat', // عدم تكرار الصورة
    width: "100%",
    height: "95vh",
}






  return (
    <section>
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




      {/* first part */} 
     <div style={groundimg} className='max-w-auto relative 'data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500" >
     {/* pointer-events-none إلى العنصر الذي يحتوي على  حتى لا يؤثر على التفاعل مع العناصر الأخرى. */}
     <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
   
    <div className='grid grid-cols-1 md:grid-cols-2 text-center-center gap-6 place-items-center min-h-[600px] mx-[20px] '>

  {/* left part */}
    <div className='flex flex-col'>


    <h1 className='text-3xl font-bold md:text-left  smd:text-2xl  '>Discover Timeless Elegance and Comfort with Our Premium Furniture Collection.
    </h1>


    <div className='mt-10'>
    <Link to='/Shop'>
        <button className="bg-slate-200 text-maincolor font-bold px-5 py-2 rounded-full transition duration-300 hover:bg-touch cursor-pointer">
        Shop

        </button>
        </Link>
    </div>

    </div>




    </div>
      </div>


 
{/* swiper data */}

  <div className=' my-[100px]' data-aos="zoom-in-up" data-aos-duration="1000">
  <Swiper 
         spaceBetween={30}
         centeredSlides={false}
         autoplay={{
           delay: 2000,
           disableOnInteraction: false,
         }}
 
  pagination={{
    clickable: true,
  }}

  modules={[Autoplay, Pagination, Navigation]}
  breakpoints={{
    375: {
      slidesPerView: 1, // عرض شريحة واحدة في الشاشات الصغيرة
    },
    568: {
      slidesPerView: 2, // عرض شريحتين في الشاشات المتوسطة
    },
    768: {
      slidesPerView: 3, // عرض شريحتين في الشاشات المتوسطة
    },
    1024: {
      slidesPerView: 4, // عرض 3 شرائح في الشاشات الكبيرة
    },
  }}

 
>
  {products.slice(1, 20).map((item) => (
    <SwiperSlide key={item.id}>
      <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
        <img src={item.mainImage.url} alt={item.name} className="w-[300px] h-[250px] object-cover rounded-lg mb-4" />
        <h1 className="text-xl font-semibold text-center mb-2">{item.name}</h1>
        <p className="text-lg text-maincolor font-bold">${item.price}</p>
        
        <Link to='/Shop'>
        <button className="bg-slate-200 text-maincolor font-bold px-5 py-2 rounded-full transition duration-300 hover:bg-touch">
          View More
        </button>
        </Link>

      </div>
    </SwiperSlide>
  ))}
</Swiper>

  </div>






{/* جزء view more تروح علي الجزء بتاعها ف shop  */}
<div className='container mx-auto my-[100px]' >
  <h2 className='text-3xl font-bold text-maincolor text-center py-3' data-aos="fade-down" >New Arrivals </h2>
<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>



<div className="relative" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="700">

<img
src="Images/Chairs/Ashtabula/Ashtabula+Genuine+Leather+Square+Arm+Accent+Chair.webp"
alt="Chair"
className="w-full h-[400px] object-cover"
/>

<div className="absolute inset-0 flex flex-col items-start justify-center px-5 space-y-4  bg-black/30">
<h3 className="text-3xl font-bold text-white md:text-2xl sm:text-xl">
  Ashtabula Leather
</h3>


<NavLink to="/shop#coffee-tables">
  <button className="bg-slate-200 text-maincolor font-bold px-5 py-2 rounded-full transition duration-300 hover:bg-touch">
    View More
  </button>
</NavLink>
</div>


</div>



<div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="700">
<img
src="Images\Coffee Tables\20\51ozBTok4FL._AC_.jpg"
alt="Inniss TV"
className="w-full h-[400px] object-cover"
/>

<div className="absolute inset-0 flex flex-col items-start justify-center px-5 space-y-4 bg-black/30">
<h3 className="text-3xl font-bold text-white md:text-2xl sm:text-xl">
  Inniss TV Stand
</h3>
<NavLink to="/shop#coffee-tables">
  <button className="bg-slate-200 text-maincolor font-bold px-5 py-2 rounded-full transition duration-300 hover:bg-touch">
    View More
  </button>
</NavLink>
</div>


</div>


</div>
</div>




    {/* part about */}
<div id='About' className='container mx-auto' data-aos="zoom-out" data-aos-duration="500" >
      <div className='text-center'>
      <h1 className='text-4xl font-bold'>About Us</h1>

<p className='my-3'>Welcome to <span className='font-bold text-[#A87E4D]'>[Haven Furnish]!</span> We specialize in offering high-quality furniture that meets your needs and adds a touch of elegance to your home or office. Since [2024], we’ve been committed to providing the best designs that blend comfort with style.</p>



      </div>
    

    </div>

    </section>

  )
}

export default Home