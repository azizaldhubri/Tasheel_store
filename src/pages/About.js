import { Divider } from "@mui/material";

export default function About(){
    return(
        <div className="w-100 vh-90 py-4 px-4 d-flex align-items-center justify-content-center flex-column mt-2 ">
            <h1> مرحبا بك ويشرفني زيارتك لموقعي 
                <Divider sx={{ border:'3px solid gray',width:'100%',marginTop:'6px'}} />
            </h1>
             <br></br>
          
            
            <h2>هذا المشروع تم بناءة لغرض اضافتة للبروفايل تبعي فقط وهو عبارة عن موقع تجارة الكترونيه مبنية باستخدام الفرونت فقط </h2>
            <h2>تم بناء المشروع باستخدام المكونات التاليه:</h2>
            <h2>React.js , Redux ,Context ,Bootstrap,localstorage to save Purches </h2>
      <br/>
            <h4>تم بناء المشروع خلال سته ايام بمعدل 5 ساعات كل يوم </h4>
      <br/>
            <h5>اتمنى انه نال اعجابكم </h5>

            

        </div>
    )
}