
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function AutohideSnackbar({ open, onClose, message, severity = "success", duration = 2500 }) {
  return (
    <Snackbar
    className='mt-4  '
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{fontSize:'25px',fontWeight:'bold',color:'white'}}
    >
      <Alert onClose={onClose} severity={severity}
      //  sx={{ width: '200px' }}
       sx={{ 
          width: '200px',
          backgroundColor:
            severity === "success"
              ? "#075ba9bd"
              : severity === "error"
              ? "#f44336"
              : severity === "warning"
              ? "#ff9800"
              : "#2196f3",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
         backdropFilter: "blur(4px)",
          "& .MuiAlert-icon": {
            color:
              severity === "success"
                ? "#fff"
                : severity === "error"
                ? "#ffebee"
                : severity === "warning"
                ? "#fff3e0"
                : "#e3f2fd",
            fontSize: "24px",
            // padding:'10px'
          }
        }}


       
       >
        {message}
      </Alert>
    </Snackbar>
  );
}
