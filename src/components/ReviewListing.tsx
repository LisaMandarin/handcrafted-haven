import dayjs from "dayjs"
import { Rate } from "antd"

type ReviewListingProps = {
    id: string;
    created_at: string;
    rate: number;
    comment: string;
    username: string
}

export default function ReviewListing({ created_at, rate, comment, username}: ReviewListingProps) {
    return (
        <div className="rounded-xl shadow-xl mb-3">
            <div className="bg-custom-brown-1 text-white p-2 rounded-t-xl flex flex-row gap-1 items-end">
                <p>{username}</p>
                <div className="flex-grow">
                    <Rate 
                        value={Number(rate)}
                        disabled    
                    />
                </div>
                <p className="text-xs text-custom-yellow-2">{dayjs(created_at).format('YYYY-MM-DD')}</p>
            </div>
            <p className="p-2">{comment}</p>
        </div>
    )
}