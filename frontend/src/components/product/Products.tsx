import React, { Suspense } from "react";
import Skeleton from "../shimmer/Skeleton";
import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/product";

const Products = async () => {
  const data = await getProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
      {data?.map((product: any, index: number) => (
        <React.Fragment key={index}>
          <Suspense fallback={<Skeleton />}>
            <ProductCard key={index} data={product} />
          </Suspense>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Products;
