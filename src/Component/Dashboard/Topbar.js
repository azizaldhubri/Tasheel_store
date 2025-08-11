 import {  useEffect, useRef } from "react"; 
 
import Badge from '@mui/material/Badge'; 
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import {  Link, useNavigate } from "react-router-dom"; 
import { Box} from "@mui/material";
 
  export default function Topbar_home(){        
  
   const cart = useSelector((state) => state.cart);
  const navigate = useNavigate(); 
   const scrollYRef = useRef(0);
  const topbarRef = useRef(null);


 const navItems = [{name:'Home',link:'/'},{name:'About',link:'/dashboard/About'},  {name:'Contact',link:'/dashboard/Contact'}];

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;

      if (topbarRef.current) {
        if (scrollYRef.current > 100) {            
          // topbarRef.current.style.backgroundColor = 'rgb(36, 158, 214)'; // لون عند التمرير
          topbarRef.current.style.backgroundColor = '#b0cfdd'; // لون عند التمرير          
          topbarRef.current.style.color = 'black';
        } else {         
             topbarRef.current.style.backgroundColor = 'rgb(235, 237, 240)';          
            //  topbarRef.current.style.backgroundColor = '#86b2db61';          
             topbarRef.current.style.color = 'black';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
//=============================================================================
  
     
    return(      
   <div className="w-100   "
       style={{
        height:'14vh',
        position:'relative',       
           overflow:'hidden' }}           
            >          
        <div  ref={topbarRef} className="h-100" > 

         <div  className=" h-100 col-lg-12 col-md-12  col-sm-12 col-12    
               d-flex align-items-center justify-content-around   " 
                 style={{border:'4px solid rgb(13, 44, 85)' ,background:'#86b2db61'}}>

              <div className="  d-flex align-items-center gap-2 justify-content-center      "         >            
                <p className="m-0 fs-3 ">  تسهيل ستور  </p>   
                {/* <img src={require('../../img/3.png')} style={{width:'70px',borderRadius:'100%'}}></img>  */}
                <img src={require('../../Assets/images/3.png')} style={{width:'70px',borderRadius:'100%'}} alt="tasaheel"></img> 
                   
               </div>
         

            <div className="  fs-5  " style={{borderRadius:'10px'}}>                 
                  <Box sx={{ display: { xs: 'none', sm: 'block' ,color:'black'} }}>
                            {navItems.map((item) => (
                               <Link   key={item}
                               to={item.link}   rel="noopener noreferrer"
                               sx={{ color: '#000',  }} 
                               className="ms-3"                               
                               > {item.name}</Link>               
                             
                            ))}                            
                             
                          </Box>                      
            </div>  

          
                <div className="   text-center   fs-5  text-primary "> 
               <IconButton color="inherit" onClick={() => navigate('/cart')}>
                    <Badge badgeContent={cart.length} color="error">
                      <ShoppingCartIcon sx={{fontSize:'35px'}}/>
                    </Badge>
                  </IconButton>  

           </div>  
            </div>

        </div>           
       </div>
    )
}
