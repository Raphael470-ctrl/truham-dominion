import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Makepayment = () => {
    const {product} = useLocation().state || {}
    const img_url = "http://raphaeltruham.alwaysdata.net/static/images/"
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    // function for makepayment
    const submit = async(e) => {
        // preventing the default loading behaviour of a form
        e.preventDefault()
        // set message 
        setMessage("Please wait as we process your request")
        //  connecting t axios to flask api using try and catch 
        try {
            // attaching user inout to data variable 
            const data = new FormData()
            data.append("phone", phone)
            data.append("amount", product.product_cost)
            // posting the data to the database 
            const response = await axios.post("http://raphaeltruham.alwaysdata.net/api/mpesa_payment", data)
            // update the message 
            setMessage(response)

        } catch (error) {
            setMessage("")
            setError(error.message)
            
        }
    }
  return (
    <div>
    <div className='row mt-4 justify-content-center'>
        <div className=" col-md-6 card shadow p-4 ">
            <h2>Make Payment-Lipa na M-Pesa</h2>
            <img src={img_url + product.product_photo} alt="" className='product_image'/>
            <p>The product Name is: {product.product_name}</p>
            <p>The product description is: {product.product_description}</p>
            <p>The product cost is: {product.product_cost}</p>
            <form onSubmit={submit}>
                {message}
                {error}
                <div className='form-group'>
                <input type="tel" placeholder='EnterPhone254xxxx' value={phone} onChange={(e) => setPhone(e.target.value)} required className='form-input'/>
                </div>
                
                <button type='submit' className='btn btn-secondary form-control' > pay For Your Product</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Makepayment