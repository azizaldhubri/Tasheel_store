 import { Outlet, useNavigate } from 'react-router-dom'; 
import NavBar from '../Component/Dashboard/Navbar'; 
import { useState } from 'react';
import Topbar_home from '../Component/Dashboard/Topbar';
 
 
const Dashboard = () => {  
   const navigate = useNavigate();  
  const [anchorEl, setAnchorEl] = useState(null);
  const [subItems, setSubItems] = useState([]);
    
  const handleTabHover = (event, subCategories) => {
    setSubItems(subCategories);
    setAnchorEl(event.currentTarget);
  };

  const handleSubClick = (subValue) => {
    // setType(subValue);    
    navigate(`/dashboard/${subValue}`); 
    setAnchorEl(null);
  };

  const handleClose = () => setAnchorEl(null); 
  return (
    <div  className="position-relative w-100   "  >
      <div className='w-100 ' style={{position:'fixed',height:'100px',top:0,zIndex:100}}>
        
          <Topbar_home/>              
            <NavBar        
              anchorEl={anchorEl}
              subItems={subItems}
              handleTabHover={handleTabHover}
              handleSubClick={handleSubClick}
              handleClose={handleClose}
              />
      </div>             
                
                <div  className='w-100   border  '
                style={{ overflow:'auto',background:'rgba(211, 224, 230, 0.2)' ,marginTop:'140px' }} >              
                 <Outlet />                
                </div>              
                
            </div> 


 
  );
};

export default Dashboard;



