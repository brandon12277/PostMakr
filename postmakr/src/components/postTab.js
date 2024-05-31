import React from "react";





const PostTab = ({name,photo,post}) =>{

  
     return(
         <>

          <div className=" rounded shadow p-2">

            <div className="flex items-center justify-start gap-4 p-4">

                <img className="w-16 h-16 rounded-full border border-black" src={photo}></img>
                <h1 className="text-xl font-semibold poppins">{name}</h1>

            </div>
            <div className="p-4 text-left poppins">
                <h3 className="text-medium">{post}</h3>

            </div>

          </div>
        
        </>
     )

}

export default PostTab