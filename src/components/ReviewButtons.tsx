'use client'

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function ReviewButtons({id} : {id: string}) {
    const deleteReview = (id: string) => {
        alert(`${id} is going to be deleted`);
    }

    return (
        <div className="space-x-4 min-w-20">
            <Link href={`/reviews/edit/${id}`}><EditOutlined /></Link>
            <DeleteOutlined onClick={() => deleteReview(id)} />
        </div>
    )
}