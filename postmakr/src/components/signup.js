

import axios from "axios"
import * as EmailValidator from 'email-validator';
import ClipLoader from "react-spinners/ClipLoader";

import { useState,useEffect,useRef,CSSProperties  } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import profile from "../profile (2).png"

export default function SignUp() {
  
  
  let [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  

  const LoginPage = () => {
    localStorage.setItem("created",true)
    navigate('/Login');
  };


  
  

  function validatePassword() {
    var password = formData.password;
    var confirmPassword = document.getElementById("c_password").value
    var message = document.getElementById('passwordMatchMessage');

    var icon = document.createElement('span');
    
    if (password === confirmPassword) {
        icon.innerHTML = '✓ Passwords match';
        icon.className = 'valid';
    } else {
        icon.innerHTML = '✗ Passwords do not match';
        icon.className = 'invalid';
    }

    
    message.innerHTML = '';

    
    message.appendChild(icon);
}



  const [file,setFile] = useState(null)
  const [img,setimg] = useState(null)
  const [formData, setFormData] = useState({
      name : "",
      email : "",
      password:"",
      c_password:""
      

  })

  const CheckEmail = () =>{
    

    if(!EmailValidator.validate(formData.email)){
      toast.error('🦄Email Invalid', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return false
    }

    return true
  }

    const fileInputRef = useRef(null);
  
    const handleButtonClick = () => {
      
      fileInputRef.current.click();
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSignup = async () => {
      try {
        console.log("Hi")
          
        let form_data = {}
        var confirmPassword = document.getElementById("c_password").value
        var password = formData.password;

        if(!file){

          toast.error('🦄Invalid Profile Picture!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

        }
      if(password!=confirmPassword ){
        toast.error('🦄Password do not match', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
        if(!CheckEmail() ){
          setLoading(null)
          return;
        }

        form_data['name'] = formData.name;
        form_data['email'] = formData.email;
        form_data['password'] = formData.password;
        form_data['file'] = file

        console.log(form_data)
       
        
          axios.post('https://postapi-i589.onrender.com/db/createUser', form_data,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        })
          .then((response)=>{
           LoginPage()
            console.log(response.data)
            
          })
          .catch(err=>{
            setLoading(null)
            console.log(err)
           
          })
         
          
       
      
       
         
        
        
  
       
      } catch (error) {
        setLoading(null)
        console.log(error)
      }
    };

    const handleImageChange = (e) => {
      
      
      const selectedFile = e.target.files[0];
      
     
      setFile(selectedFile)

      if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setimg(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
     
       
    };

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
      
        <div className="poppins bck flex h-screen  flex-col justify-center items-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 className="mt-14 text-center text-2xl font-bold leading-9 tracking-tight ">
              Sign Up 
            </h2>
          </div>
          <div className="w-full flex items-center justify-center">

          <div onClick={handleButtonClick} className="img_div mt-10 cursor" htmlFor="upload" style={{ backgroundImage: `url(${formData.image})` }}>
         <input ref={fileInputRef} style={{display:"none"}}  type="file" name="file" onChange={handleImageChange}  id="upload" accept="image/png, image/jpg, image/jpeg"></input>
         <div id="image_button cursor">

            {
              !file?
              <div className="flex items-center justify-center flex-col gap-4">
              
              <img className="w-20" src={profile}></img>
              </div>
              
              :
              <img className="w-24 h-24 rounded-full border border-black" src={img}></img>

            }
         
          
         </div>
        </div>

          </div>
  
          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6" action="#" method="POST">

            <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                  Name
                </label>
                
              </div>
              <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="block w-full p-4 placeholder-text-black rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
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
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
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

                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                    Confirm Password
                  </label>
                  
                </div>

                <div className="mt-2">
                  <input
                   onChange={validatePassword}
                    id="c_password"
                    name="c_password"
                    type="password"
                    placeholder="Confirm Password"
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
                    handleSignup()}}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
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
            </div>
  
       
          </div>
        </div>
      </>
    )
  }
  