import React,{useState, useEffect} from 'react'
import Router, { useRouter } from 'next/router'
import axios from 'axios';

const Success = (props) => {

  const {id} = props;
  const [email,setEmail] = useState('');

  const sendMail = async () => {
    console.log("Email",email);
    console.log(id);

    const obj = {
      email,
      accessToken:id
    }

    try{
    const res = await axios.post('http://localhost:3000/api/sendgrid',JSON.stringify(obj),
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
    )
    console.log("Response",res);
    Router.push('/success')

    } catch (error) {
      console.log("Error",error);
    }

  }
  
  const router = useRouter();
  useEffect(()=> {
  
  },[router.query])
  return (
    <div className="px-6 h-screen flex items-center justify-center">

  
  <section className="mb-32 text-gray-800 text-center lg:text-left">
    <div className="block rounded-lg shadow-lg bg-white">
      <div className="flex flex-wrap items-center">
        <div className="grow-0 shrink-0 basis-auto hidden lg:flex lg:w-6/12 xl:w-4/12">
        <img className="w-3/4 h-3/4" src="/cctv.jpg" />
        </div>
        <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
          <div className="px-6 py-12 md:px-12">
            <h2 className="text-2xl text-left mb-6 font-bold text-slate-600">👋🏻 Welcome {router.query.name}</h2>
            <h2 className="text-3xl font-bold mb-6">
              You are just one step behind to get access to Smart Surveillance System!
              <br />
            </h2>
             <h2 className="text-3xl font-bold mb-6"> <span className="text-blue-600 mt-8">Get your API key</span> </h2>
            <p className="text-gray-500 mb-12">
              You will receive the API Access Token on the email!
            </p>
            <div className="md:flex flex-row">
              <input
              onChange = {(e) => setEmail(e.target.value) }
                type="text" 
                name="email"
                className="form-control block w-full px-4 py-2 mb-2 md:mb-0 md:mr-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Enter your email"
              />
              <button
              onClick={sendMail}
                type="submit"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  
</div>

  )
}

export const getServerSideProps = async ({params}) => {
  const {id} = params;
  console.log(id);

  return {
    props: {
      id
    },
  }
}

export default Success