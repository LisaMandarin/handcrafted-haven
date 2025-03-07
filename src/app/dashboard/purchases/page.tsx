import { getSession } from "@/utils/session"
import LoginButton from "@/components/LoginButton"

export default async function Purchases() {
    const session = await getSession()    
    if (!session) {
        return (
            <div className="text-center">
                Please <LoginButton />
            </div>
        )
    }

    const headings = [
        "Product", "Purchase Date", "Review", "Review Date"
    ]

    return (
        <>
            {session && (
                <div className="w-full overflow-auto">
                    <h1 className="font-bold text-xl">Products I have purchased</h1>
                    <table className="max-w-5xl min-w-[710px] w-full mx-auto">
                        <thead className="border-b-2 border-custom-yellow-2 h-[50px]">
                            <tr className="text-left">
                                {headings && headings.map((h) => (
                                    <th key={h} className="px-2">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}