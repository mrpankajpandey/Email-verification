import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import API from '../api/axios';
import toast from 'react-hot-toast';

const SignUp = () => {
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
  }
  );
   // Handle input change
   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  const {
    register,
    handleSubmit,
    formState:{errors},
    reset


  } = useForm();
  
const onSubmit =  async(e)=>{
  

  try {

    

    const response = await API.post("/signup",formData);
      if(response.data.success){

        // console.log(response);
      toast.success(response.data.message,);
      setFormData({name:"",email:"",password:""});
      reset();
    }else {
      toast.error(response.data.message);
    }
    
  } catch (error) {
    console.log(error);
    
   toast.error(error.response.data.message);

  }
}
  return (
    <>
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full  flex flex-col gap-2'>
                <input {...register("name", { required: true })} name='name' value={formData.name} onChange={handleChange} className='w-full h-[50px] rounded-full leading-tight border border-black py-2 px-4 dark:bg-[#1c1b23]' type="text" placeholder='Name'/>
                {errors.name && <span className='text-red-300 mx-4' >This field is required</span>}

            </div>
            <div className='w-full flex flex-col gap-2'>
                <input {...register("email",  { required: true }, )} name='email'  value={formData.email}  onChange={handleChange} className='w-full h-[50px] rounded-full border border-black py-2 px-4  dark:bg-[#1c1b23]' type="email" placeholder='Email'  />
                {errors.email && <span className=' mx-4 text-red-300'>This field is required</span>}
               
            </div>
            <div className='w-full  flex  flex-col gap-2'>
            <input {...register("password",  { required: true }, )} name='password' value={formData.password}  onChange={handleChange} className='w-full h-[50px] rounded-full border border-black py-2 px-4  dark:bg-[#1c1b23]' type="text" placeholder='Password'  />
                {errors.password && <span className='mx-4 text-red-300'>This field is required</span>}

            </div>
            <div className='w-full flex items-center justify-center'>
                    <button type='submit' className='px-10 text-white font-medium py-3 bg-blue-400 outline-none hover:bg-blue-900 border  rounded-full' >Send</button>
            </div>
            <h2> Already account . <Link to="/login">Login</Link></h2>
        </form>
        </div>
        </div>
    </>
  )
}

export default SignUp