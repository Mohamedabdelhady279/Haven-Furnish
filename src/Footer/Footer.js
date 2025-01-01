import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div data-aos="fade-right"
    data-aos-duration="1000" >
      
      <footer className="footer bg-white text-maincolor-content mt-[50px] p-10">
  <div>
    <h6 className="footer-title">Call us</h6>
    <a >Hotline-19657</a>
    <a >Mobile-01557117992</a>
    
  </div>
  <div>
    <h6 className="footer-title">Address</h6>
    <a >Egypt-Dakahlia (Mansoura-Shoha)</a>

  </div>
  <div>
    <h6 className="footer-title">Worktime</h6>
    <a>Week days: 9AM - 6Pm</a>
    <a>Saturday: 8Am - 2Pm</a>
  </div>
</footer>


<footer className="footer footer-center bg-base-200 text-base-content p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()}- <span><Link to="/" className='font-firstname text-[18px] font-bold text-[#4A4A4A] 	'>
Haven <span className='font-secondname text-[18px] text-[#A87E4D]'>Furnish</span>
</Link></span> - All right reserved.</p>
  </aside>
</footer>    
      
      
   </div>
  )
}

export default Footer