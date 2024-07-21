import Wrapper from "@/components/Wrapper";
import dynamic from "next/dynamic";

const DynamiProduct = dynamic(() => import("@/components/product/Products"));
const ProductPage = () => {
  return (
    <Wrapper>
      <div className=" mb-5  text-center mt-12 flex flex-col">
        <span className="text-[28px] md:text-[34px] font-semibold leading-tight">
          All Products
        </span>
      </div>
      <DynamiProduct />
    </Wrapper>
  );
};
export default ProductPage;
