import { getDiscountedPricePercentage } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";

const ProductCard = (data: any) => {
  const p = data.data;
  return (
    <Link
      href={`/product/${p?._id}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
      key={p?._id}
    >
      <Image
        src={process.env.NEXT_PUBLIC_API_URL + "images/" + p?.images[0]}
        width={500}
        height={500}
        alt={p?.name}
      />

      <div className="p-4 text-black">
        <h2 className="text-lg font-medium">{p?.name}</h2>
        <div className="flex items-center ">
          <p className="text-lg font-semibold text-black/[0.5]">
            &#8377;{p?.price}
          </p>
          {p?.original_price && (
            <>
              <p className="text-base font-medium line-through">
                &#8377;{p?.original_price}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(p?.original_price, p?.price)} %
                off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
