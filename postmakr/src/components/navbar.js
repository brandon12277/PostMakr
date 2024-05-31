import React, { useEffect, useState } from "react";
import logo from "../logo.png"
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';


export default function Navbar(){
    
    const [user,setUser] = useState(null)
    const isMobile = useMediaQuery({ maxWidth: 900 });
   

    const Logout = () =>{
        localStorage.removeItem("user")
        window.location.href="/Login"
    }

    useEffect(()=>{
        const user_d = JSON.parse(localStorage.getItem("user"))

        setUser(user_d)

        if(user){

        }
    })

    return(

  <>

    
    
    <div className={` w-full flex items-center justify-center  shadow p-4`}>
    {

!user?

<img style={{height:"50px",width:"auto"}} src={logo}></img>



:
<>

<img style={ !isMobile? {height:"50px",width:"auto"} : {height:"35px",width:"auto"}} src={logo}></img>

<div className={` ml-4 w-full flex items-center justify-end ${ isMobile ? "mr-0" : "mr-4" } mr-4 gap-4 `}>
     

<img className= { ` ${isMobile ? "hidden" : "w-12 h-12" }  rounded-full border border-black`} src={user.firebaseUid}></img>
<p className={` ${isMobile ? "text-xs" : "text-md"}  font-semibold poppins`}>{user.name}</p>
<button
                  type="submit"
                  onClick={Logout}
                  
                  className={`flex  justify-center rounded-md border border-indigo-800 ${ isMobile ? "px-1 py-1 text-xs" : "px-10 py-1.5 text-sm" } font-semibold leading-6  shadow-sm `}
                >
                  Log out
                </button>
</div>
    </>
}

         

    </div>
    
    

    

  </>
    )

}

