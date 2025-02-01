import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addtocart, removeFavorite } from '../redux/appslice'; // قم بإضافة action لإزالة المنتج من المفضلة
import { Link } from 'react-router-dom';


const Favorite = () => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.appReducer.favorites); // احصل على قائمة المفضلة من Redux

  const handleRemove = (id) => {
    dispatch(removeFavorite(id)); // إزالة المنتج من المفضلة
  };

  
  
  return (

  
    <div className="container mx-auto my-5 py-10" data-aos="fade-right" data-aos-duration="1000">
      <h1 className="text-4xl text-maincolor font-bold text-center">Your Favorite Products</h1>
      {favoriteItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {favoriteItems.map((item) => (
            <div key={item.id} className="border-2 border-gray-300 rounded-lg flex flex-col justify-between min-h-[300px]">
              <img
                src={item.mainImage.url}
                alt={item.name}
               className="w-full h-[200px]  object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold px-2">{item.name}</h3>
              <p className="text-lg font-bold text-maincolor px-2">${item.price}</p>
              <span className='text-maincolor' >Rating: ({item.ratings})</span>
              <span className='text-green-600'> {item.ratingsCount} reviews</span>
              <div className="flex justify-between items-center px-2 pb-2">
                <button
                   className="  bg-gray-300 text-maincolor px-3 py-2 rounded-3xl border border-gray-400	  transition-colors duration-300 hover:bg-touch"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
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
                         }}>
                             Add to cart
                           </button>
               
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500 mt-5">
          No favorite products yet! add some from the <Link to="/shop" className="text-maincolor  ">Shop</Link>.
        </p>
      )}
    </div>
  )
}

export default Favorite
