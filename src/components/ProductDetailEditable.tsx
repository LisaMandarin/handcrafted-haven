'use client'
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "antd";
import dayjs from "dayjs";
import { ProductDetailType } from "@/types/data";
import { useEffect, useState } from "react";
import UpdateButton from "./UpdateButton";

async function updateProduct(id: string, data: ProductDetailType) {
  try {
    if (!id) {
      console.error("Invalid ID");
      return null;
    }
    if (!data) {
      console.error("Invalid Data");
      return null;
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/id/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    if (response.ok) {
      const {success}= await response.json();
      return success;
    }
  } catch (error) {
    console.error("Error during updating product: ", error);
    return null;
  }
}

export default function ProductDetailEditable({product}: {product: ProductDetailType}) {
  const breadcrumbItems = [
    { title: (
      <Link href='/'>
        Home
      </Link>
    )},
    { title: (
      <Link href='/categories'>
        Categories
      </Link>
    )

    },
    {
      title: (
        <Link
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/categories/${product.category_id}`}
        >
          {product.category_name}
        </Link>
      ),
    },
    { title: product.product_name },
  ];
  const postDate = dayjs(product.created_at).format("YYYY-MM-DD");
  const [editMode, setEditMode] = useState(true);
  const [oldProduct, setOldProduct] = useState(product);
  const [newProduct, setNewProduct] = useState(product);
  const handleChange = (field: string, value: string) => {
    setNewProduct(prev => ({...prev, [field]: value}))
  } 

  const handleCancel = () => {
    setNewProduct(oldProduct)
    setEditMode(false)
  }
  
  const handleUpdate = async() => {
    console.log('updating...')
    console.log("newProduct.id: ", newProduct?.id)
    if (newProduct?.id) {
      const success = await updateProduct(newProduct.id, newProduct)
      if (success) {
        console.log('success')
        setOldProduct(newProduct)
        setNewProduct(newProduct)
      } else {
        console.log('not successful')
      }
    }
    setEditMode(false)
    console.log('updated')
  }
  useEffect(() => {
    console.log('newProduct changed')
  }, [newProduct])

  return (
    <>
      <Breadcrumb items={breadcrumbItems} className="mb-4" />
      <div className="flex flex-col items-center">

        {/* product header card */}
        <div className="flex flex-col items-center w-[332px] bg-white">
          <Image
            src={newProduct.image_url}
            alt={`image of ${newProduct.product_name}`}
            width={300}
            height={300}
            className="mt-4 mx-4"
          />
          {editMode ? <input value={newProduct.product_name} onChange={(e) => handleChange('product_name', e.target.value)} className="p-4 font-bold text-lg"/> 
          : <p className="bg-white w-[300px] text-lg font-bold p-4">{newProduct.product_name}</p>}
        </div>

        {/* product detail section */}
        <div className="space-y-2 my-2 max-w-[550px]">
          <div className="flex flex-row gap-2">
            <p className="w-[100px] flex-shrink-0">Price:</p>
            {editMode ? <input value={newProduct.price} onChange={(e) => handleChange('price', e.target.value)} className="w-full sm:w-[300px] md:w-[500px] px-2 rounded-sm" />
            : <div>{oldProduct.price}</div>}
          </div>
          <div className="flex flex-row gap-2">
            <p className="w-[100px] flex-shrink-0">Quantity:</p>
            {editMode ? <input value={newProduct.quantity} onChange={(e) => handleChange('quantity', e.target.value)} className="w-full sm:w-[300px] md:w-[500px] px-2 rounded-sm" />
            : <div>{oldProduct.quantity}</div>}
          </div>
          <div className="flex flex-row gap-2">
            <p className="w-[100px] flex-shrink-0">Description:</p>
            {editMode ? <textarea value={newProduct.description} onChange={(e) => handleChange('description', e.target.value)} className="w-full sm:w-[300px] md:w-[500px] px-2 rounded-sm" rows={4} />
            : <div>{oldProduct.description}</div>}
          </div>
          <div className="flex flex-row gap-2">
            <p className="w-[100px] flex-shrink-0">Artisan:</p>
            <div className="underline"><Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/artisans/${product.artisan_id}`}>{product.first_name} {product.last_name}</Link></div>
          </div>
          <div className="flex flex-row gap-2">
            <p className="w-[100px] flex-shrink-0">Post Date:</p>
            <div>{postDate}</div>
          </div>
        </div>
        <UpdateButton editMode={editMode} onEdit={() => setEditMode(true)} onCancel={handleCancel} onUpdate={handleUpdate} />
      </div>
    </>
  );
}
