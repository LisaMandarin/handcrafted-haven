import {
  FacebookOutlined,
  XOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

export default function Footer() {
  const thisYear = new Date().getFullYear();
  return (
    <div className="bg-custom-dark-brown text-custom-yellow-1 px-6 py-3 grid grid-cols-1 md:grid-cols-3">
      <div className="text-center md:text-right">
        <h1 className="text-white font-bold text-sm">Handcrafted Haven</h1>
      </div>
      <div className="text-center text-sm">
        &copy;{thisYear} All Right Reserved
      </div>

      <div className="text-center md:text-left space-x-1 ml-1">
        <span>Follow Us</span>
        <FacebookOutlined />
        <InstagramOutlined />
        <XOutlined />
        <YoutubeOutlined />
      </div>
    </div>
  );
}
