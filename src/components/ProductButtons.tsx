'use client'

import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Popconfirm, message} from "@/lib/antd"
import type { PopconfirmProps } from "antd";
import { useRouter } from "next/navigation";

async function deleteProductById(id: string) {
  try {
    if (!id) {
    console.error("Invalid product ID")
    return;
  }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/id/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      console.error("Unable to delete product");
      return false;
    }
    const {success} = await response.json();
    return success;
  } catch (error) {
    console.error("Error during deleting product: ", error)
    return false
  }
}

export default function ProductButtons({id}: {id: string}) {
    const router = useRouter();

    const confirmDelete: PopconfirmProps['onConfirm'] = async() => {
      const success = await deleteProductById(id)
      if (success) {
        message.success('This product is deleted.')
        router.refresh()
      } else {
        message.error('Failed to delete the product.')
      }
    }
    const cancelDelete: PopconfirmProps['onCancel'] = () => {
      return;
    }
  return (
    <div className="space-x-4 min-w-28">
      <Link href={`/products/${id}`} target="_blank">
        <EyeOutlined />
      </Link>
      <Link href={`/products/edit/${id}`}>
        <EditOutlined />
      </Link>
      <Popconfirm title="Warning" description="Are you sure you want to delete this product? It will be gone forever." onConfirm={confirmDelete} onCancel={cancelDelete} okText="Yes" cancelText="No">
        <DeleteOutlined />
      </Popconfirm>
    </div>
  );
}
