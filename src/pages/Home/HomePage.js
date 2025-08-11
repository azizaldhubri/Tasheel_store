 import { useContext,   useRef } from "react";   
import Footer from "./Footer"; 
import CallToActionSection from "./CallToActionSection"; 
import { ProductContext } from "../../Component/Context/ProductContext";
import ProductImagesSlider from "../ProductImagesSlider";
import HeroSection from "./HeroSection";

export default function Homepage(){ 

  const { groceries, fragrances, loading } = useContext(ProductContext);    
  const callToActionRef = useRef(null);

 
  //   ref.current?.scrollIntoView({ behavior: 'smooth' });
  // };
      return(      
     
     <div className="   d-flex align-items-center justify-content-center flex-column"> 

          <HeroSection />     
        <ProductImagesSlider images={groceries} loading={loading} />
         <ProductImagesSlider images={fragrances} loading={loading} />
   
       <div className="  w-100 mt-1  "  ref={callToActionRef}><CallToActionSection /></div>
       <Footer />
    </div>      
       
    )
}
