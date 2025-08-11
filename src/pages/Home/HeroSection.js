import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (     
       <div className="home-container p-5"  >
                <video autoPlay muted loop playsInline className="bg-video"
                src={require('../../Assets/images/v4.mp4')}
                >              
                المتصفح لا يدعم الفيديو.
                </video>
                <div className="overlay-content w-100">
              <p style={{fontSize:'50px',color:'blue'}}>مرحبًا بك في متجر تسهيل</p>            
              <p style={{fontSize:'30px',color:'blue'}}>      نموذج مصغر للعرض فقط</p>
            </div>
               </div> 
     
  );
};

export default HeroSection;
