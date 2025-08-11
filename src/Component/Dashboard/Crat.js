// src/pages/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart,addToCart ,deletefromCart} from '../../app/storee/CartSlice';
// import { addToCart } from "../../app/storee/CartSlice"; 
import { Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
 
   const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
 
  const styleButton={
         cursor: 'pointer', padding:0,                         
          borderRadius:'50%',                       
            fontSize:'40px',
            maxWidth:'43px',
          height:'43px',
          minWidth:'43px',
          display: 'flex',            // عرض كـ flex
          alignItems: 'center',       // توسيط عمودي
          justifyContent: 'center',
            transition: 'all 0.2s ease-in-out',
            '&:hover':{
              backgroundColor: '#1976d2', // لون خلفية عند المرور
              color: '#fff', // لون النص
              transform: 'scale(1.1)', // تكبير الزر قليلاً
            }

  }
  // console.log(cart)
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>سلة المشتريات</Typography>      
      {cart.length === 0 ? (
        <Typography variant="h6">السلة فارغة</Typography>
      ) : (
        <>
          <List>
            {cart.map((item) =>{
                  const isDisabled = item.quantity === 1;
            return (               
              <ListItem key={item.id} divider sx={{  
                border:'2px solid',
                display:'flex',
                justifyContent:'space-between',
                flexWrap:'wrap'
              }}>
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  style={{ width: 60, height: 60, objectFit: 'cover', marginRight: 10  }}               
                />
                 
                  <Button                              
                      color="primary"
                      sx={styleButton}                                            
                      onClick={() => handleAddToCart(item)}
                  >
                    +                                   
                  </Button>
                  <Typography
                    edge="center"
                      variant="h5"
                      color="primary"                  
                  >
                    {item.quantity}                                   
                  </Typography>
                  <Button                    
                      color="primary"                     
                      aria-disabled={isDisabled}
                      onClick={() => {
                              if (!isDisabled) {
                                  dispatch(deletefromCart({ id: item.id }))                            
                              }
                          }}                 
                      sx={{ 
                        ...styleButton,                        
                        paddingBottom:'7px',
                          cursor: isDisabled ? 'not-allowed' : 'pointer',
                          opacity: isDisabled ? 0.5 : 1,
                          pointerEvents: isDisabled ? 'none' : 'auto', // لمنع النقر فعليًا                         
                        }}                  
                  >
                    -                                   
                  </Button>                
                <div   className=' d-flex gap-2     col-12 col-lg-3 col-md-3 col-sm-4 justify-content-end  '>
                <ListItemText                                 
                  primary={item.title}
                  secondary={`السعر: $${item.price} × ${item.quantity} = $${item.price * item.quantity}`}
                sx={{
                  maxWidth:'200px',
                    fontSize:'19px',
                    flex: 'unset',
                    // border: '2px solid lightblue',
                    padding: 1,
                     textAlign: 'left',                 
                    }}
                />                
                <IconButton
                  
                   edge="end"
                  aria-label="delete"
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                >
                  <DeleteIcon  sx={{ color:'red' ,margin:'10px',fontSize:'30px' }}/>                 
                </IconButton>

                </div>
               
                
              </ListItem>
            )})}
          </List>

          <Typography variant="h6" style={{ marginTop: 20 }}>
            الإجمالي: ${total.toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(clearCart())}
            sx={{ marginTop: 2 }}
          >
            تفريغ السلة
          </Button>
        </>
      )}
    </div>
  );
}
