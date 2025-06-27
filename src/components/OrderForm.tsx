"use client";

import React, { useEffect, useState } from "react";
import { orderFormType } from "@/types/data";
import { ProductDetailType } from "@/types/data";
import { message } from "@/lib/antd";

async function addToCart(formData: orderFormType) {
    console.log('formData: ', formData)
    return true;
}

export default function OrderForm({product}: {product: ProductDetailType} ) {
    const [currentQuantity, setCurrentQuantity] = useState(product.quantity);
    const [formData, setFormData] = useState<orderFormType>({
    id: product.id ?? "",
    quantity: 1,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleChange = (field: string, value: number) => {
    if (value > currentQuantity) {
        setAlertMsg(`The maximum order quantity is ${currentQuantity}`);
        setShowAlert(true)
        return
    }
    if (value < 1) {
        setAlertMsg("The minumum order quantity is 1")
        setShowAlert(true);
        return
    }
    setShowAlert(false)
    setFormData(prev => ({...prev, [field]: value}))
  };

  const handleIncrement = () => {
    handleChange("quantity", formData.quantity + 1)
  }

  const handleDecrement = () => {
    handleChange("quantity", formData.quantity - 1)
  }

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.quantity < 1) {
        setAlertMsg("The minumum order quantity is 1")
        setShowAlert(true)
        return
    }
    if (formData.quantity > currentQuantity) {
        setAlertMsg(`The maximum order quantity is ${currentQuantity}`)
        setShowAlert(true)
        return
    }
    const success = await addToCart(formData);
    if (success) {
        const curQ = currentQuantity;  // quantity before added to cart
        const qToCart = formData.quantity // quantity in the cart

        if ((curQ - qToCart) <=0) {
            setAlertMsg("Out of Stock")
            setShowAlert(true);
            setCurrentQuantity(0);
            setFormData(prev => ({...prev, ['quantity']: 0}))
            return
        }
        setCurrentQuantity(prev => prev-formData.quantity)
        setFormData({
            id: product.id ?? "",
            quantity: 1
        })
        message.success(`${formData.quantity} of ${product.product_name} added to your cart`)
    } else {
        message.error("Error while adding the product to your shopping cart.  Please contact IT support.")
        return;
    }
}

useEffect(() => {
    console.log('currentQuantity: ', currentQuantity)
}, [currentQuantity])
  return (
    <div className="w-full flex justify-center">
      <form 
        onSubmit={handleSubmit}  
        className="w-[370px] md:w-[700px] bg-white rounded-2xl flex gap-6 p-6"
    >
        <div className="w-1/2 flex flex-col items-end gap-2">
          <div className="w-1/2 flex items-center justify-end">
            <label className="mr-1">Quantity</label>
            <button 
                disabled={currentQuantity <=0}
                type="button"
                onClick={handleDecrement}
                className={`py-1 px-2 bg-gray-300 rounded-md border border-gray-400 ${currentQuantity <=0 ? "text-gray-400" : "text-custom-dark-brown hover:bg-gray-200"} `}
            >
              -
            </button>
            <input 
                disabled={currentQuantity <=0}
                className="w-[40px] px-2" 
                value={formData.quantity} 
                onChange={(e) => handleChange('quantity', Number(e.target.value))} 
                type="number"
            />
            <button 
                disabled={currentQuantity <=0}
                type="button"
                onClick={handleIncrement}
                className={`py-1 px-2 bg-gray-300 rounded-md border border-gray-400 ${currentQuantity <=0 ? "text-gray-400" : "text-custom-dark-brown hover:bg-gray-200"} `}
            >
              +
            </button>
          </div>
          { showAlert && (
            <div className="text-red-600 font-bold text-sm text-right">{alertMsg}</div>
          )}
        </div>
        <div className="w-1/2 flex items-start">
          <button 
            disabled={currentQuantity <=0}
            type="submit"
            className={`px-3 py-1 lg:px-6 h-fit ${currentQuantity <=0 ? "bg-gray-300 text-gray-400" : "bg-custom-brown-1 border-custom-dark-brown text-custom-yellow-1 hover:bg-custom-yellow-2"} rounded-3xl`}>
            Add to Cart
          </button>
        </div>
      </form>
    </div>
  );
}
