"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { message } from "@/lib/antd";
import { CategoryType } from "@/types/data";
import { fetchCategories } from "@/lib/util";
import { ProductType } from "@/types/data";
import { useRouter } from "next/navigation";

async function addProduct(formData: ProductType) {
  try {
    if (!formData) {
      console.error("Invalid form data");
      return false;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/artisan`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      console.error("Unable to add product");
      return false;
    }
    const { success } = await response.json();
    return success;
  } catch (error) {
    console.error("Error during adding product: ", error);
    return false;
  }
}

export default function ProductForm() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    product_name: "",
    price: 0,
    quantity: 0,
    description: "",
    image_url: "",
    artisan_id: id,
    category_id: "",
  });
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.price <= 0) {
      message.error("Price must be larger than zero");
      return;
    }
    if (formData.quantity <= 0) {
      message.error("Quantity must be larger than zero");
      return;
    }
   
    if (id) {
      const result = await addProduct(formData);
      if (result) {
        message.success("Add product successfully");
        router.push("/")
      } else {
        message.error("Unable to add product");
      }
    }
  };
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="max-w-[370px] md:max-w-[700px] w-full space-y-6 mb-6">
      <div className="flex flex-col md:flex-row md:gap-2 md:items-center">
        <label className="md:w-1/3 md:text-right text-lg text-custom-yellow-2">Product Name</label>
        <input
          required
          type="text"
          value={formData.product_name}
          onChange={(e) => handleChange("product_name", e.target.value)}
          className="w-full text-lg p-2 rounded-xl border border-custom-yellow-2 border-b-4 focus:border-custom-brown-1 focus:outline-none"
          placeholder="Enter product name"
        />
      </div>
      <div className="flex flex-col md:flex-row md:gap-2 md:items-center">
        <label className="md:w-1/3 md:text-right text-lg text-custom-yellow-2">Price</label>
        <input
          required
          type="number"
          value={formData.price}
          onChange={(e) => handleChange("price", Number(e.target.value))}
          className="w-full text-lg p-2 rounded-xl border border-custom-yellow-2 border-b-4 focus:border-custom-brown-1 focus:outline-none"
          placeholder="Enter price"
          min={0}
        />
      </div>
      <div className="flex flex-col md:flex-row md:gap-2 md:items-center">
        <label className="md:w-1/3 md:text-right text-lg text-custom-yellow-2">Quantity</label>
        <input
          required
          type="number"
          value={formData.quantity}
          onChange={(e) => handleChange("quantity", Number(e.target.value))}
          className="w-full text-lg p-2 rounded-xl border border-custom-yellow-2 border-b-4 focus:border-custom-brown-1 focus:outline-none"
          placeholder="Enter quantity"
          min={0}
        />
      </div>
      <div className="flex flex-col md:flex-row md:gap-2 md:items-center">
        <label className="md:w-1/3 md:text-right text-lg text-custom-yellow-2">Description</label>
        <textarea
          required
          rows={5}
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full text-lg p-2 rounded-xl border border-custom-yellow-2 border-b-4 focus:border-custom-brown-1 focus:outline-none"
          placeholder="Enter description"
          maxLength={500}
        />
      </div>
      <div className="flex flex-col md:flex-row md:gap-2 md:items-center">
        <label className="md:w-1/3 md:text-right text-lg text-custom-yellow-2">Image Url</label>
        <input
          required
          type="text"
          value={formData.image_url}
          onChange={(e) => handleChange("image_url", e.target.value)}
          className="w-full text-lg p-2 rounded-xl border border-custom-yellow-2 border-b-4 focus:border-custom-brown-1 focus:outline-none"
          placeholder="Enter image url"
        />
      </div>
      <div className="flex flex-col md:flex-row md:gap-2 md:items-center">
        <label className="md:w-1/3 md:text-right text-lg text-custom-yellow-2">Category</label>
        <select
          required
          value={formData.category_id}
          onChange={(e) => handleChange("category_id", e.target.value)}
          className="w-full text-lg p-2 rounded-xl border border-custom-yellow-2 border-b-4 focus:border-custom-brown-1 focus:outline-none"
        >
          <option value="">Choose a category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.category_name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <button
          type="submit"
          className="w-full text-lg p-2 rounded-xl text-white bg-custom-yellow-2 active:bg-custom-brown-1 focus:outline-none"
        >
          Post New Product
        </button>
      </div>
    </form>
  );
}
