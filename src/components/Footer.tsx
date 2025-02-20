import { FacebookOutlined, XOutlined, YoutubeOutlined, InstagramOutlined } from "@ant-design/icons"

export default function Footer() {
    const thisYear = new Date().getFullYear()
    return (
        <div className="bg-custom-dark-brown text-custom-yellow-1 px-6 py-3 flex flex-col items-center">
            <div className="slogan">
                <h1 className="text-white font-bold text-sm">Handcrafted Haven</h1>
            </div>
            <div className="copyright text-sm">&copy;{thisYear} All Right Reserved</div>
            <div className="social-media flex flex-row">
                <p>Follow Us</p>
                <div className="flex flex-row justify-center gap-1 ml-1">
                    <FacebookOutlined />
                    <InstagramOutlined />
                    <XOutlined />
                    <YoutubeOutlined />
                </div>
            </div>
        </div>
    )
}