import { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] =useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone,SetPhone] = useState("")
    // states for success, error and loading messages 
    const [loading, setLoading] = useState("")
    const [success,setSuccess] = useState("")
    const [error, setError] = useState("")
    // function to post user input to the database (arrow function)
    const submit = async(e) =>{
        // prevent the page from reloading before the data is saved 
        e.preventDefault()
        setLoading("Please Wait As We Upload Your Data")
        // sending user inputs to the database(using try catch)
        try {
            const data = new FormData()
            // appending data to formdata variable 
            data.append("username", username)
            data.append("email", email)
            data.append("password", password)
            data.append("phone", phone)
            // using axios to post our data to our database 
            const response = await axios.post("https://raphaeltruham.alwaysdata.net/api/signup" , data)
            // removing the loading message by setting it to empty  
            setLoading("")
            // adding success message after succesfull data posting to the database 
            setSuccess(response.data.Success)
            // clearing the form fields making the work easier for the user
            setUsername("")
            setEmail("")
            setPassword("")
            SetPhone("")
        } catch (error) {
            setLoading("")
            setError(error.message)            
        }
    }
    return(
        <div className="row mt-4 justify-content-center signup">
            <div className="col-md-6 card shadow p-4 ">
               <h2>SignUp</h2>

                <form action="" onSubmit={submit}>
                    {loading}
                    {success}
                    {error}
                    <i className="bx bxs-users"></i>
                    <input type="text" placeholder="Enter Username" className="form-input" value= {username} onChange={ (e) => setUsername(e.target.value)} required/><br />                 
                    <input type="email" placeholder="enter email" className="form-input" value = {email} onChange={(e) => setEmail(e.target.value)} required /><br />           
                    <input type="password" placeholder="Enter Password" value= {password}className="form-input" onChange={(e) => setPassword(e.target.value)} required/><br />
                    <input type="tel" placeholder="Enter Phone Number " value = {phone}className="form-input" onChange={(e) => SetPhone (e.target.value)} required/>        

                    <button className="btn btn-primary form-control" type="submit">
                        SignUp
                    </button>
                    <p>Already have an account? <Link to='/SignIn'>SignIn</Link></p>
                </form>
                </div>
        </div>
    )
}

export default Signup
