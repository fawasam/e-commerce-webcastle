import { getProductById, getProducts } from "@/lib/product";
import ProductDetailsCarousal from "@/components/product/productDetailsCarousal";
import Wrapper from "@/components/Wrapper";
import SelectSize from "@/components/SelectSize";
import RelatedProducts from "@/components/product/RelatedProduct";

const SingleProductPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const p = await getProductById(slug);
  const Allproducts = await getProducts();

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          <div className="w-full md:w-auto flex-[1.5] max-w-[600px] lf:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousal images={p?.images} />
          </div>
          <div className="flex-[1] py-3 ">
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {p.name}
            </div>
            <div className="text-lg font-semibold mb-5">{p.subtitle}</div>
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                MRP: &#8377;{p?.price}
              </p>
              {p?.original_price && (
                <>
                  <p className="text-base font-medium line-through">
                    &#8377;{p?.original_price}
                  </p>
                </>
              )}
            </div>
            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">{`(Also includes all applicable duties)`}</div>
            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select Guide
                </div>
              </div>
              <SelectSize product={p?.size} />
            </div>
            <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">
              Add to cart
            </button>
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
              Whishlist
            </button>
            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5  prose  ">
                <p className="text-justify">{p.description}</p>
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts products={Allproducts} exclude={p._id} />
      </Wrapper>
    </div>
  );
};

export default SingleProductPage;
