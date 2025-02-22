import React, {  useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { MdFavorite } from 'react-icons/md';
import { FaShoppingCart, FaUserPlus } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import { LuMenu } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { logout } from '../redux/appslice';
import { CiLogout } from 'react-icons/ci';
import { HashLink } from 'react-router-hash-link';

const Header = () => {
  const [isopened, setisopened] = useState(false);
  
  const location = useLocation();
  const dispatch=useDispatch()  
  
  const favoriteItems = useSelector((state) => state.appReducer.favorites);
  const cart=useSelector((state)=>state.appReducer.Products);
  const userinfo=useSelector((state)=>state.appReducer.userinfo );

  // تحديد إذا كان الرابط نشطًا
  const isActive = (path) => {
    return location.pathname === path ? 'text-[rgb(184,142,47)]' : 'text-[rgb(17,17,17)]';
  };


  
  const signout=()=>{
    const auth = getAuth();
    signOut(auth)
    .then(() => {
   localStorage.removeItem("userinfo");

   dispatch(logout());

   }).catch((error) => {
    console.log(error)
});
  }
  


  return (
   
          <div className=' bg-white w-full shadow-custom  sticky top-0 z-50' >

          <div className=' flex justify-between items-center mx-auto'>



          {/* left div */}
          <div >
          <Link to="/" className='font-firstname md:text-[25px] xs:text-[18px] sm:text-[20px] font-bold text-[#4A4A4A]  	'>
          Haven <span className='font-secondname md:text-[20px] xs:text-[15px] sm:text-[15px] text-[#A87E4D]'>Furnish</span>
          </Link>
          </div>



          {/*middel  */}
          <div className='hidden md:flex items-center gap-4' >
          <Link to="/"className={`font-semibold text-lg transition-colors duration-300 hover:text-[rgb(184,142,47)]	 ${isActive('/')}`}>
          Home
          </Link>  


          {/* Shop side */}
          <div className='relative group'>
            
          <Link to="/shop"className={`flex items-center gap-1 font-semibold text-lg transition-colors duration-300 hover:text-[rgb(184,142,47)]	 ${isActive('/shop')}`}>
          Shop <IoIosArrowDown className=' text-[11px] mt-1 '/>

          </Link>


          <div className="hidden group-hover:block absolute bg-white shadow-md p-3 top-[22px] w-48">
          <NavLink to="/shop#living-room-sets" className="block text-sm font-normal text-maincolor mb-2 transition-all duration-300 ease-in-out hover:scale-110 hover:text-[rgb(184,142,47)] ">
          Living Room Sets
          </NavLink>
          <NavLink to='/shop' className="block text-sm font-normal text-maincolor  mb-2 transition-all duration-300 ease-in-out hover:scale-110 hover:text-[rgb(184,142,47)]">Coffee Tables</NavLink >
          <NavLink to='/shop'         className="block text-sm font-normal text-maincolor mb-2 transition-all duration-300 ease-in-out hover:scale-110 hover:text-[rgb(184,142,47)]">Desks</NavLink >
          <NavLink to='/shop'     className="block text-sm font-normal text-maincolor mb-2 transition-all duration-300 ease-in-out hover:scale-110 hover:text-[rgb(184,142,47)]">TV Stands</NavLink >
          <NavLink to='/shop'  className="block text-sm font-normal text-maincolor mb-2 transition-all duration-300 ease-in-out hover:scale-110 hover:text-[rgb(184,142,47)]">Shoe Storage</NavLink >
          <NavLink to='/shop'        className="block text-sm font-normal text-maincolor mb-2 transition-all duration-300 ease-in-out hover:scale-110 hover:text-[rgb(184,142,47)] ">Chairs</NavLink >
          </div>


          </div>


          <HashLink to="/#About"className={`font-semibold text-lg transition-colors duration-300 hover:text-[rgb(184,142,47)]	${isActive('/About')}`}>
          About Us  
          </HashLink>  
          </div>



          {/* right */}
          <div className='flex items-center gap-3 mr-4  '>


          {userinfo ?(<div className='flex  items-center  '>
                <p className='my-[1px] text-maincolor sm:text-[12px] xs:text-[10px] transition-colors duration-300 hover:text-touch'>
                  {userinfo.username}
                  </p>

                {userinfo&&
                <button onClick={signout}><CiLogout className='font-bold   text-xl text-maincolor transition-colors duration-300 hover:text-touch' />
                </button>}
                
              </div>)
              
              :(<NavLink to='/Login' className='font-semibold text-[20px]   text-maincolor transition-colors duration-300 hover:text-touch'>
                <FaUserPlus />
                </NavLink>
                 )}


          <NavLink to='/Favorite' className='group  flex items-center font-semibold text-[20px] text-maincolor transition-colors duration-300 hover:text-touch '>
          <MdFavorite />

          {favoriteItems.length > 0 && 
          <span className="text-maincolor text-[20px] transition-colors duration-300 group-hover:text-touch">({favoriteItems.length})</span>} 


          </NavLink>


          <NavLink 
          to='/Maincart' 
          className='group flex items-center font-semibold text-lg text-maincolor transition-colors duration-300 hover:text-touch'
          >
          <FaShoppingCart className='text-xl' /> 

          {cart.length > 0 && 
          <span className="text-maincolor text-[20px] transition-colors duration-300 group-hover:text-touch">
            ({cart.length})
            </span>} 


          </NavLink>


          </div>




          {/* هخفي الزرار في الشاشة الكبيرة  */}
        <div className='md:hidden'>
        {
        !isopened ?
        (<LuMenu className='text-2xl cursor-pointer  text-maincolor transition-colors duration-300 hover:text-touch'onClick={()=>setisopened(true)}/>)
        :
        (<HiX  className='text-2xl cursor-pointer  text-maincolor transition-colors duration-300 hover:text-touch'onClick={()=>setisopened(false)}/>)
        }    
        </div>         


          </div>







{/* Menu */}
  {isopened&&
   (
    <div className='md:hidden flex flex-col items-center  bg-neutral-600 py-4  '>

<div className='flex flex-col gap-3'>
<Link to="/"className={`font-semibold text-lg transition-colors duration-300 hover:text-[rgb(184,142,47)]	 ${isActive('/')}`}>
Home
</Link>  


{/* Shop side */}
<div className='relative group'>

<Link to="/shop"className={`flex items-center gap-1 font-semibold text-lg transition-colors duration-300 hover:text-[rgb(184,142,47)]	 ${isActive('/shop')}`}>
Shop <IoIosArrowDown className=' text-[11px] '/>
</Link>


<div className="hidden group-hover:block absolute bg-white shadow-md p-3 top-[22px] w-48">
<NavLink to="/shop#living-room-sets" className="block text-sm font-normal text-maincolor mb-2 transition-all duration-300 ease-in-out hover:scale-110 hover:text-[rgb(184,142,47)] ">
Living Room Sets
</NavLink>
<NavLink to='/shop#coffee-tables' className="block text-sm font-normal text-maincolor  mb-2 transition-all duration-300 ease-in-out hover:scale-110 hover:text-[rgb(184,142,47)]">Coffee Tables</NavLink >
<NavLink to='/shop#desks'         className="block text-sm font-normal text-maincolor mb-2 transition-all duration-300 ease-in-out hover:scale-110 hover:text-[rgb(184,142,47)]">Desks</NavLink >
<NavLink to='/shop#tv-stands'     className="block text-sm font-normal text-maincolor mb-2 transition-all duration-300 ease-in-out hover:scale-110 hover:text-[rgb(184,142,47)]">TV Stands</NavLink >
<NavLink to='shop/#shoe-storage' className="block text-sm font-normal text-maincolor mb-2 transition-all duration-300 ease-in-out hover:scale-110 hover:text-[rgb(184,142,47)]">Shoe Storage</NavLink >
<NavLink to='shop/#chairs'        className="block text-sm font-normal text-maincolor mb-2 transition-all duration-300 ease-in-out hover:scale-110 hover:text-[rgb(184,142,47)] ">Chairs</NavLink >
</div>

</div>



  <HashLink to="/#About"className={`font-semibold text-lg transition-colors duration-300 hover:text-[rgb(184,142,47)]	${isActive('/About')}`}>
    About Us  
  </HashLink>  
</div>
 </div>
   )}


</div>  

  
  )}

export default Header




