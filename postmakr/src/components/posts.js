import React, { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import PostTab from "./postTab";

const PostPage = () =>{

    const[post,setPost] = useState(null)
    const[newposts,setNewPost] = useState([])
    const[postTabs,setTabs] = useState(null)
    const navigate = useNavigate();
    useEffect(()=>{

        const CheckToken = async () =>{

            let form_data = {}
            const token = localStorage.getItem("token")
            const user_d = JSON.parse(localStorage.getItem("user"))
            form_data["token"] = token

            if(!user_d){
                navigate("/Login")
            }

            const check = await axios.post('https://postapi-i589.onrender.com/db//CheckToken',form_data)
            if(!check.data){
                navigate("/Login")

            }
            else{

                const check = await axios.get('https://postapi-i589.onrender.com/db//GetPosts')

                console.log(check.data)

                setTabs(check.data.map(post=>(

                    <PostTab
                     
                       name={post.name}
                       post={post.post}
                       photo={post.firebaseUid}
                    
                    />

                )))
                

            }
            

        }

        CheckToken()
    
       
         
          
    },[])

    const handleSubmit = async  () =>{
        console.log("submit")
        try{
            document.getElementById("post").value = "";
            const user = JSON.parse(localStorage.getItem("user"))
            
            let form_data = {}
            form_data["post"] = post;
            form_data["name"] = user.name
            form_data["firebaseUid"] = user.firebaseUid

            const posts = newposts

            const new_post = (<PostTab
              name={user.name}
              post={post}
              photo={user.firebaseUid}
            />)

            console.log(posts)

            setNewPost([...newposts, new_post]);
       
            let res = await axios.post('https://postapi-i589.onrender.com/db/MakePost',form_data)
        }
        catch(err){
            console.log(err)

        }

    }

    const handleChange = (e) =>{
         
         const {name,value} = e.target

         setPost(value)
    }
   
    return(
        <>
            
            <div className="w-full flex items-center justify-center gap-4 p-10">

            <input
                    id="post"
                    name="post"
                    type="text"
                    onChange={handleChange}
                    
                    placeholder="Type Something to post"
                    required
                    className="block w-full p-4 placeholder-text-black rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6"
                  />
                   <button
                  type="submit"
                  onClick={handleSubmit}
                  
                  className="flex  justify-center rounded-md bg-indigo-600 px-10 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm "
                >
                  Post
                </button>


            </div>
            <div  className="posts w-full p-10 flex flex-col gap-10">

                {
                    postTabs?
                    <>
                    {postTabs}
                    {newposts}
                    </>
                    :
                    <></>
                }

            </div>
            
        </>
    )


}

export default PostPage;