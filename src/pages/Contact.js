import { Divider } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail'; 
import { Link } from "react-router-dom";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
 
export default function Contact(){
       const phoneNumber = '967770515088';  
         const message = 'مرحباً! كيف يمكنني مساعدتك؟';  
         const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
         return(
             <div className="w-100 vh-90 py-4 px-4 d-flex align-items-center justify-content-center flex-column mt-2 flex-wrap">
            <h1> مرحبا بك ويشرفني زيارتك لموقعي 
                <Divider sx={{ border:'3px solid gray',width:'100%',marginTop:'6px'}} />
            </h1>
             <br></br>
          
            
            <h2> انا عزيز الضبري احمل الجنسية اليمنية  مقيم في الرياض </h2>
<br/>
            <h3 
            className="d-flex align-items-center justify-content-center  fs-3 flex-wrap"
             style={{ wordBreak: "break-word", whiteSpace: "normal" }}
            >
             
                azizaldhubri@gmail.com
                <MailIcon sx={{margin:'5px', color:'red',fontSize:'30px'}}/>
            </h3>
             
            <Link to={waLink} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center fs-3 flex-wrap">               
               WhatsApp                 
                <WhatsAppIcon
                   sx={{margin:'5px',fontSize:'32px',
                    color:'green'}}
               />                 
            </Link>

            

        </div>
    )
}