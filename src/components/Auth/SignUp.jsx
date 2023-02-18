import React,{useState} from 'react'
// import CompanyLogo from '../../images/CompanyLogo.png'
import Router from 'next/router'
import toast from 'react-hot-toast'
import axios from 'axios'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from '../../../firebase.config';

const Signup = () => {	
  const [signupform,setSignupform] = useState({
    name:'',
    email:'',
	password:''
  })

  

  const handleChange = (e) => {
	setSignupform(
		{
			...signupform,
			[e.target.name]:e.target.value,
		}
	)
  }

  const isdisabled = signupform.name && signupform.email && signupform.password;

  const handleFormSubmit = async (e) => {
	e.preventDefault();
	const {email, password} = signupform;
	
	
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
	toast.success("Signup Successful!");
	Router.push('/');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
	toast.error("Unsuccessfull!");
  });
  

  }
  return (
    <div className="flex flex-col max-w-md w-[400px] mx-4 p-4 rounded-[20px] sm:p-10 bg-white">
	<div className="mb-2 flex flex-col items-center justify-center text-center">
    <img className="w-3/4 mb-8" src="/CompanyLogo.png" />
        
		<p className="text-xs pt-2 text-[#808080]">Enter your email address and password</p>
	</div>
	<form onSubmit={handleFormSubmit} className="w-full space-y-8 ng-untouched ng-pristine ng-valid">
		<div className="space-y-4">
			<div>
				<input type="text" name="name" onChange={handleChange} placeholder="Full Name" className="w-full text-xs px-3 py-2 border rounded-md border-gray-200" />
			</div>
			
			<div>
				<input type="email" name="email" onChange={handleChange} id="email" placeholder="Email" className="w-full text-xs px-3 py-2 border rounded-md border-gray-200" />
			</div>
			<div>
				<input type="password" name="password" onChange={handleChange} id="password" placeholder="Password" className="w-full text-xs px-3 py-2 border rounded-md border-gray-200" />
			</div>
      
			<div>
				<button type="submit" disabled={!isdisabled} className={`w-full hover:cursor-pointer px-8 py-3 font-semibold rounded-md ${!isdisabled?"bg-[#D9D9D9]":"bg-gradient-to-b from-cyan-500 to-blue-500"} text-white`}>Signup</button>
			</div>
    <p className="px-8 text-center text-xs">By registering you agree to the Forcasting. <span className='text-[#000000] font-semibold underline'>Terms of Use</span> and <span className='text-[#000000] font-semibold underline'>Privacy Policy.</span></p>
		</div>

		<div>
			<p className="px-6 text-xs font-bold text-black text-center">Already have an account?
				<button onClick={()=> Router.push('/')} rel="noopener noreferrer" href="#" className="hover:underline text-[#11ABDB] pl-2 underline">Login</button>
			</p>
		</div>
	</form>
</div>

  )
}

export default Signup;