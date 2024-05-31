

import axios from "axios"

import { useState,useEffect,useRef } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
export default function Login() {

  
    const navigate = useNavigate();
    let [loading, setLoading] = useState(null);
 
    const notify = () => {


        toast.success('🦄 User Signed Up succesfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    
         
      };

  
  const [formData, setFormData] = useState({
      name : "",
      email : "",
      password:"",
      c_password:""
      

  })

   
  
   
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleLogin = async () => {
      try {
          
        let form_data = {}

       
        form_data['email'] = formData.email;
        form_data['password'] = formData.password;
       

        console.log(form_data)
       
        
          axios.post('https://postapi-i589.onrender.com/db/Login', form_data)
          .then((response)=>{
            console.log(response.data.user)
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("user",JSON.stringify(response.data.user))
           
            
            window.location.href="/"

          })
          .catch(err=>{
            console.log(err)
           
          })
         
          
       
      
       
         
        
        
  
       
      } catch (error) {
        console.log(error)
      }
    };

    useEffect(()=>{
        
        
         const created = localStorage.getItem("created")
         console.log(created)

         if(created){
            console.log("HI")
            notify()
            
            localStorage.removeItem("created")
         }
         
         
    },[])

   
    return (
      <>
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

        
      
        <div className=" poppins bck flex h-screen  flex-col justify-center items-center px-6 py-12 lg:px-8">
       <div className="shadow-lg w-full sm:w-[30rem] py-10 px-6">

       
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
              Log in
            </h2>
          </div>
       
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6" action="#" method="POST">


              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                  Email address
                </label>
                
              </div>
              <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="block w-full p-4 placeholder-text-black rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
  
              
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                    Password
                  </label>
                  
                </div>

                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="block w-full p-4 placeholder-text-black rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                
                <div>
                  <p id="passwordMatchMessage"></p>
                </div>
               
  
              <div>
              {
                  !loading?
                <button
                  type="submit"
                  onClick={()=>{setLoading(1) 
                    handleLogin()}}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
                :
                <ClipLoader
        color={"blue"}
        loading={loading}
        size={50}
        aria-label=""
        data-testid="loader"
      />
           }
              </div>
              <div className="w-full flex items-center justify-center">
                <p className="poppins">Dont have an account? <a className="text-indigo-800" href="/SignUp">Sign Up</a></p>

              </div>
            </div>
  
       
          </div>
          </div>
        </div>
      </>
    )
  }
  