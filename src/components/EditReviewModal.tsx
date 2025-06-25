'use client'

import Image from "next/image";
import { DashboardPurchaseType } from "@/types/data";
import dayjs from "dayjs";
import { Rate } from "antd";

export default function EditReviewModal({formData, onChange} : {formData: DashboardPurchaseType; onChange: (field: string, value: string | number) => void}) {
    const formattedDate = dayjs(formData.created_at).format('YYYY-MM-DD')
    
  return (
    <div className="max-w-[370px] md:max-w-[700px] w-full flex flex-col gap-4">
      <div className="flex flex-row items-center justify-center space-x-4">
        <div className="w-[100px] xl:w-[200px] flex-shrink-0">
          <Image src={formData.image_url} alt={formData.product_name} width={300} height={300} className="rounded-lg"/>
        </div>
        <div>
            <p className="text-lg font-bold">{formData.product_name}</p>
            <p className="text-gray-400">{`Purchased on ${formattedDate}`}</p>
        </div>
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col">
            <label>Rate</label>
            <Rate 
                value={formData.rate} 
                allowHalf
                onChange={(value) => onChange('rate', value)}/>
        </div>
        <div className="flex flex-col">
          <label>Comment</label>
          <textarea 
            rows={5} 
            value={formData.comment} 
            onChange={(e) => onChange('comment', e.target.value)}
            className="border border-custom-brown-1 rounded-lg p-2"
        />
        </div>
      </form>
    </div>
  );
}
