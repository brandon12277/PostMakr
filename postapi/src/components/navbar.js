import React, { useEffect, useState } from "react";
import logo from "../logo.png"
import { useNavigate } from 'react-router-dom';



export default function Navbar(){
    
    const [user,setUser] = useState(null)
   

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

<img style={{height:"50px",width:"auto"}} src={logo}></img>

<div className="w-full flex items-center justify-end mr-4 gap-4">
     

<img className="w-16 h-16 rounded-full border border-black" src={user.firebaseUid}></img>
<h1 className="text-xl font-semibold poppins">{user.name}</h1>
<button
                  type="submit"
                  onClick={Logout}
                  
                  className="flex  justify-center rounded-md border border-indigo-800 px-10 py-1.5 text-sm font-semibold leading-6  shadow-sm "
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

