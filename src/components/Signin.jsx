import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setloading] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  // function to submitt data to the database
  const submit = async(e) => {
    // preventing the data form reloading before the data is saved 
    e.preventDefault()
    setloading("Please wait as we log you In")
    // sending user inputs to the database (using tryh and catch )
    try {
        const data = new FormData()
        // appending data to FormData 
        data.append("email", email)
        data.append("password", password)
        // connecting the UI and posting to the database 
        const response = await axios.post("https://raphaeltruham.alwaysdata.net/api/signin", data)
        // uploading the loading message to empty 
        setloading("")
        // checking if the user exists
        if (response.data.user) {
          // storing the user in the browser local storage
          localStorage.setItem("user",JSON.stringify(response.data.user))
          // redirecting the login user to the landing page 
          navigate('/')
        } else {
          // error for login failed 
          setError(response.data.message)
        }
    } catch (error) {
      //updating loading message to empty
      setloading("")
      // updating the error message 
      setError(error.response.data.message) 
    }
  }
  return (
    <div className='row mt-4 justify-content-center'>
        <div className='col-md-6 card shadow p-4'>
          <h2>SignIn</h2>
            <form onSubmit={submit}>
              {loading}
              {error}
              <input type="email" placeholder='Email' className='form-input' value = {email} onChange={(e) => setEmail(e.target.value)} required /><br />

             <input type="password" placeholder='Password' className='form-input' value={password} onChange={(e) => setPassword(e.target.value)} required/><br />
            
             <button className='btn btn-primary' type='submit' >
              SigIn
             </button>
             <p>Don't have an account? <Link to ='/SignUp'>SignUp</Link></p>
            </form>
          
        </div>
    </div>
  )
}

export default Signin