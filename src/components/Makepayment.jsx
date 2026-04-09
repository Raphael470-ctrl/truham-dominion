import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Makepayment = () => {
    const {product} = useLocation().state || {}
    const img_url = "http://raphaeltruham.alwaysdata.net/static/images/"
    
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // FIXED Phone validation & formatting
    const validatePhone = (phoneNumber) => {
        const kenyaPhoneRegex = /^254[17]\d{8}$/;
        return kenyaPhoneRegex.test(phoneNumber) && phoneNumber.length === 12;
    };

    const formatPhone = (phoneNumber) => {
        let cleaned = ('' + phoneNumber).replace(/\D/g, '');
        
        // If already starts with 254, keep it (no duplication)
        if (cleaned.startsWith('254')) {
            return cleaned.substring(0, 12);
        }
        
        // If starts with 0, convert to 254
        if (cleaned.startsWith('0')) {
            cleaned = '254' + cleaned.substring(1);
        }
        
        // Limit to 13 characters max
        return cleaned.substring(0, 12);
    };

    // FIXED Payment function
    const submit = async(e) => {
        e.preventDefault()
        
        const formattedPhone = formatPhone(phone);
        
        if (!validatePhone(formattedPhone)) {
            setError("Please enter a valid Kenyan phone number (2547xxxxxxxx or 2541xxxxxxxx)")
            return;
        }

        setMessage("Please wait as we process your request...")
        setError("")
        setLoading(true)

        try {
            const data = new FormData()
            data.append("phone", formattedPhone)
            data.append("amount", product.product_cost)
            
            console.log("Sending payment request:", { phone: formattedPhone, amount: product.product_cost });
            
            const response = await axios.post(
                "http://raphaeltruham.alwaysdata.net/api/mpesa_payment", 
                data,
                { 
                    timeout: 30000,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            )
            
            console.log("Payment response:", response.data);
            setMessage(`✅ Success! ${response.data?.message || 'Check your phone for M-Pesa PIN prompt'}`)
            
        } catch (error) {
            console.error("Payment error:", error.response?.data || error.message);
            setError(error.response?.data?.message || error.message || "Payment failed. Please try again.")
            setMessage("")
        } finally {
            setLoading(false)
        }
    }

    if (!product) {
        return (
            <div className="payment-container">
                <div className="payment-card">
                    <div className="no-product">
                        <div className="no-product-icon">🛒</div>
                        <h3>No Product Selected</h3>
                        <p>Please go back and select a product</p>
                    </div>
                </div>
            </div>
        )
    }

    const formattedPhone = formatPhone(phone);
    const isValidPhone = validatePhone(formattedPhone);

    return (
        <div className="payment-container">
            <div className="payment-card ">
                {/* Header */}
                <div className="payment-header">
                    <div className="payment-icon">💳</div>
                    <h2 className="payment-title">Lipa na M-Pesa</h2>
                    <p className="payment-subtitle">Complete your purchase securely</p>
                </div>

                {/* Product Preview */}
                <div className="product-preview">
                    <div className="product-image-container">
                        <img 
                            src={img_url + product.product_photo} 
                            alt={product.product_name}
                            className="product-image"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    </div>
                    
                    <div className="product-info">
                        <h3 className="product-name">{product.product_name}</h3>
                        <p className="product-description">{product.product_description}</p>
                        <div className="product-price-container">
                            <span className="product-price">KSh {product.product_cost}</span>
                            <span className="payment-badge">Secure Payment</span>
                        </div>
                    </div>
                </div>

                {/* Messages/Alerts */}
                {message && (
                    <div className="alert alert-success">
                        <span className="alert-icon">✅</span>
                        {message}
                        <button 
                            type="button" 
                            className="alert-close"
                            onClick={() => setMessage("")}
                        >
                            ×
                        </button>
                    </div>
                )}
                
                {error && (
                    <div className="alert alert-error">
                        <span className="alert-icon">❌</span>
                        {error}
                        <button 
                            type="button" 
                            className="alert-close"
                            onClick={() => setError("")}
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={submit} className="payment-form">
                    <div className="form-group">
                        <label className="form-label">
                            Phone Number
                            <span className="required">*</span>
                        </label>
                        <div className="phone-input-wrapper">
                            <span className="country-code">🇰🇪</span>
                            <input 
                                type="tel" 
                                className={`phone-input ${!isValidPhone ? 'input-error' : ''}`}
                                placeholder='Enter Phone 2547xxxxxx'
                                value={formattedPhone}
                                onChange={(e) => setPhone(e.target.value)}
                                maxLength="12"
                                required 
                                disabled={loading}
                                autoComplete="off"
                            />
                        </div>
                        <small className="form-hint">
                            {formattedPhone.length > 0 && (
                                isValidPhone ? 
                                `✅ Valid: ${formattedPhone}` : 
                                `📱 Enter full number (${12 - formattedPhone.length} digits left)`
                            )}
                            {formattedPhone.length === 0 && "We'll send payment prompt to this M-Pesa number"}
                        </small>
                    </div>
                    
                    <button 
                        type='submit' 
                        className={`pay-button ${loading || !isValidPhone ? 'disabled' : ''}`}
                        disabled={loading || !isValidPhone}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Processing...
                            </>
                        ) : (
                            <>
                                <span className="pay-icon">💰</span>
                                Pay For Your Product
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="payment-footer">
                    <div className="security-info">
                        <span className="security-icon">🔒</span>
                        <span>Safaricom M-Pesa Secure</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Makepayment