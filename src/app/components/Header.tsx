import logo from "../../assets/vt-logo.png";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-grow items-center justify-start bg-red-950 px-10 py-2">
        <div className="h-20 w-20 flex items-center justify-center">
          <Image alt="VT Logo" src={logo} />
        </div>
        <p className="text-4xl text-white font-semibold ml-10">
          Navigation Kiosk
        </p>
      </div>
    </div>
  );
};

export default Header;
