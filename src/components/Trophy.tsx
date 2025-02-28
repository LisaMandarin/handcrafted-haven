import Image from "next/image";


export default function Trophy({index} : {index: number}) {
    let src =""

    if (index === 0) {
        src = "/trophy-1.webp"
    } else if (index === 1) {
        src = "/trophy-2.webp"
    } else if (index === 2) {
        src = "/trophy-3.webp"
    } else {
        src = ""
    }
    console.log('src: ', src)

    return (
        src ? (
            <div className="trophy absolute top-2 left-2 text-custom-yellow-2 bg-whtie rounded-full w-fit z-50">
                <Image src={src} width={33} height={33} alt="trophy" />
            </div>
        ) : null
    )
}