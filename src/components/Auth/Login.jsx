import React,{useState} from 'react'
// import CompanyLogo from '../../images/CompanyLogo.png'
import Router from 'next/router'
import toast from 'react-hot-toast'
import axios from 'axios'
import { auth, provider } from '../../../firebase.config'
import {signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider} from "firebase/auth";





const Login = () => {	
  const [loginform,setLoginform] = useState({
         email:'',
		 password:''
  })

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log("User:", user);
    const {uid} = user;
    console.log(uid);
        toast.success("Sign In Successfull!!");
        
        Router.push({
          pathname: '/${uid}/success',
          query:{
            name:user.displayName
          }
      })
  }).catch((error) => {
    console.log("Error",error);
  });
  
  }


  

  const handleChange = (e) => {
	setLoginform(
		{
			...loginform,
			[e.target.name]:e.target.value,
		}
	)
  }

  const isdisabled = loginform.email && loginform.password;

  const handleFormSubmit = async (e) => {
	e.preventDefault();
  const {email,password} = loginform;
  console.log(email);
  console.log(password);


  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    toast.success("Login Successful!");
    console.log(user);
    const {uid} = user;
    Router.push(`${uid}/success`)
  })
  .catch((error) => {
   console.log("Error",error);
   toast.error("Unsuccessfull!");
  });
		   
  }
  return (
    
      (<div className="flex flex-col max-w-md w-[400px] mx-4 p-6 rounded-[20px] sm:p-10 bg-white">
	<div className="mb-8 flex flex-col items-center justify-center text-center">
    <img className="w-3/4 mb-8" src="/CompanyLogo.png" />
		<p className="text-xs pt-2 text-[#808080]">Enter your email address and password</p>
	</div>
	<form onSubmit={handleFormSubmit} className="w-full space-y-6 ng-untouched ng-pristine ng-valid">
		<div className="space-y-4">
			<div>
				<input type="email" name="email" onChange={handleChange} id="email" placeholder="Email" className="w-full text-xs px-3 py-2 border rounded-md border-gray-200" />
			</div>
			<div>
				<input type="password" name="password" onChange={handleChange} id="password" placeholder="Password" className="w-full text-xs px-3 py-2 border rounded-md border-gray-200" />
			</div>
     
			<div>
				<button type="submit" disabled={!isdisabled} className={`w-full hover:cursor-pointer px-8 py-3 font-semibold rounded-md ${!isdisabled?"bg-[#D9D9D9]":"bg-gradient-to-b from-cyan-500 to-blue-500"} text-white`}>Login</button>
			</div>
		</div>
        <div className='google-auth flex items-center justify-center mt-8'>

    <button onClick={handleGoogleSignIn} className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
  <svg class="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
  Sign in with Google
</button>
        </div>
		<div>
			<p className="px-6 text-xs mt-20 text-sm font-bold text-black text-center">
                Dont have an account?
				<button onClick={() => Router.push('/auth/signup')} rel="noopener noreferrer" href="#" className="hover:underline text-[#11ABDB] pl-2 underline"> Sign up</button>
			</p>
		</div>
	</form>
    
</div>)

  
  )
}

export default Login