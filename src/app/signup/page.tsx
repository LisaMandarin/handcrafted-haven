import Registration from "@/components/Registration"
import Image from "next/image"
import { racing } from "../styles/fonts"
// import SignUp from "@/components/SignUp"
// import Registration2 from "@/components/Registration2"

export default function SignupPage() {
    return (
        <div className="min-h-[calc(100vh-148px)] md:min-h-[calc(100vh-200px)] flex flex-row items-center md:gap-6 xl:gap-12 justify-center">
            <div className="hidden md:block md:max-w-xs xl:max-w-[500px]">
                <p className={`${racing.className} text-2xl xl:text-5xl text-center`}>Handcrafted-Haven</p>
                <Image src="/hero-image.webp" alt="logo image" width={1000} height={700} />
            </div>
            <Registration />
            {/* <SignUp /> */}
            {/* <Registration2 /> */}
        </div>
    )
}