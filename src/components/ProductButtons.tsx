'use client'

import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function ProductButtons({id}: {id: string}) {
  const deleteProduct = (id: string) => {
    alert(`${id} is going to be deleted`);
  };
  return (
    <div className="space-x-4 min-w-28">
      <Link href={`/products/${id}`} target="_blank">
        <EyeOutlined />
      </Link>
      <Link href={`/products/edit/${id}`}>
        <EditOutlined />
      </Link>
      <DeleteOutlined onClick={() => deleteProduct(id)} />
    </div>
  );
}
