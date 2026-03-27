import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Getproduct = () => {
    const [products, setProducts] = useState ([])
  const [loading,setLoading] = useState ("")
  const [error, setError] = useState ("")
  const [searchTerm, setSearchTerm] = useState("")
  const img_url = "http://raphaeltruham.alwaysdata.net/static/images/"
  const navigate = useNavigate()
    //  function to get products friom te database 
  const getproducts = async () =>{
    // updating thne loading message 
    setLoading("Please wait, we're retrieving the products......")
    // connectio axios to flask api to fetc data from the database 
    try {
      const response = await axios.get("http://raphaeltruham.alwaysdata.net/api/get_product_details")
      setLoading("")
      setProducts(response.data)
      
    } catch (error) {
      setLoading("")
      setError(error.message)      
    }
  }
  useEffect ( () =>{
    getproducts()
  }, [])
// filter prodcuts based on search item 
  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.product_description.toLowerCase().includes(searchTerm.toLowerCase())
  ) 

  return (
    <div className='row'>
        <h2 className='text-center text-info'>Our Products</h2>
        {loading}
        {error}
        {/* search input  */}
        <div className='justify-content-center row mb-4'>
          <div className='col-md-6'>
            <input type="text" className="form-inpud" placeholder='I am looking for...'
            value={searchTerm}onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
      </div>
        {/* mapping the card to all the products */}
        {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          
           <div className="col-md-3 justify-content-center mb-4" key={product.id}>
              <div className="card shadow bg-dark">
                <div className="card-header text-info">
                  <h5>{product.product_name}</h5>
                </div>
                <div className="card-body">
                  <img src={img_url + product.product_photo} alt="" className='product_img'  />
                </div>
              <div className="card-footer text-info">
              <span className='span text-light'>NewBrand</span>
              <p>{product.product_description}</p>
              <p>{product.product_cost}</p>
              <button className='gradient-button btn-dark mt-2 w-100' onClick={() => navigate('/makepayment',{state: {product}})}>Purchase Now</button>
              </div>
              </div>
              </div>

            
          
        ))
      ) : (
        <h5 className="text-center text-secondary">No products found.</h5>
      )}
    </div>
  )
}

export default Getproduct