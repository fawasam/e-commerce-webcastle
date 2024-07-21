import Wrapper from "../Wrapper";
import Link from "next/link";
import Navbar from "./Navbar";
import { FaOpencart } from "react-icons/fa";
import HeaderUser from "./HeaderUser";

const Header = () => {
  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-tranform duration-300 $`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.1] cursor-pointer relative">
            <FaOpencart className="text-[25px] md:text-[30px]" />
          </div>
        </Link>
        <Navbar />
        <div className="flex items-center gap-2 text-black">
          <HeaderUser />
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
