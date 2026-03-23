import React, { useState } from 'react'
import axios from 'axios'

const Addproducts = () => {
 const [productname, setProductname] = useState("")
  const [description, setDescription] = useState("")
  const [cost, setCost] = useState("")
  const [productphoto, setProductphoto] = useState("")
  const [loading, setLoading] = useState("")
  const [Success,setSuccess] = useState("")
  const [error, setError] = useState("")
  

const submit = async(e) =>{
    e.preventDefault()
    setLoading("Please wait as we Upload your data")
    try {
      const data = new FormData()
      // appending data to form data variable 
      data.append("product_name",productname)
      data.append("product_description",description)
      data.append("product_cost",cost )
      data.append("product_photo",productphoto)
      const response = await axios.post("https://raphaeltruham.alwaysdata.net/api/add_product", data)
      setLoading("")     
      setSuccess(response.data.Message)
      setProductname("")
      setDescription("")
      setCost("")
      setProductphoto("")
    } catch (error) {
      setLoading("")
      setError(error.message)
    }
  }
  return (
    <div className='row mt-4 justify-content-center'>
       <div className=" col-md-6 card shadow p-4">
        <h2 className='text-center'>Add Products </h2>
        <form  onSubmit={submit}>
          {loading}
          {Success}
          {error}
          
          <label htmlFor="" >Product Name</label><br />
          <input type="text"className='form-input'  value = { productname}  onChange={ (e) => setProductname(e.target.value)}required /><br />
         

          <label htmlFor="" >Description</label><br />
          <textarea name="" id="" className='form-input' value={description}  onChange={(e) => setDescription(e.target.value)}required></textarea> <br />
         

          <label htmlFor="" >Cost(Ksh)</label><br />
          <input type="text" className='form-input' value = {cost}  onChange={(e) =>setCost(e.target.value)}required  /><br />
          

          <label htmlFor="" >Product photo</label><br />
          <input type="file" accept='_/image/*' className='form-input' onChange={(e) => setProductphoto(e.target.files[0])} required/><br />

          <button className='btn btn-primary form-control' type = "submit">
            Add Product
          </button>

        </form>
       </div> 

    </div>
  )
}


export default Addproducts