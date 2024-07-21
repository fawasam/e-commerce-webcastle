import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <Wrapper>
      <div className="flex-[2] flex flex-col items-center pb-[30px]  mt-4">
        <Image
          src="/assets/images/empty-cart.jpg"
          alt="empty image"
          width={300}
          height={300}
          className="w-[300px] md:w-[400px]"
        />
        <span className="text-xl font-bold">Page not found</span>
        <span className="text-center mt-4">
          Looks like you are visiting a wrong page.
          <br />
          Go ahead and explore top products here.
        </span>
        <Link
          href="/"
          className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
        >
          Continue Shopping
        </Link>
      </div>
    </Wrapper>
  );
};

export default NotFound;
