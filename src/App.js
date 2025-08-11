import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom'; 
import Dashboard from './pages/Dashboard'; 
import './index.css'
import Homepage from './pages/Home/HomePage'; 
import Error403 from './pages/Auth/403';  
import ElectronicGrid from './pages/ElectronicGrid';
import Cart from './Component/Dashboard/Crat'; 
 import { ProductProvider } from './Component/Context/ProductContext'; 
import About from './pages/About';
import Contact from './pages/Contact';



function App() {
 
  
  return (
    <div className='border  body w-100   ' style={{width:'100%'   }}>
        <Router>
        <Routes>       
        <Route path='/*' element={<Error403/>}></Route>            
        <Route path='/' element={<Dashboard />}>  
          <Route path='/' element={
              <ProductProvider>
                  <Homepage />
                </ProductProvider>
            
            }></Route>     
          <Route path='/cart' element={<Cart/>}></Route>             
           <Route path="dashboard/:type" element={<ElectronicGrid />} />
          <Route path='dashboard/About' element={ <About />}></Route>  
          <Route path='dashboard/Contact' element={ <Contact />}></Route>  

           
              <Route path='/dashboard/categoris' >                   
                <Route path='Electronic' element={ <ElectronicGrid />}></Route>                      
                                    
              </Route>             
        </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
