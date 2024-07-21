import dynamic from "next/dynamic";
import HeroBanner from "@/components/HeroBanner";
import Wrapper from "@/components/Wrapper";
import Feature from "@/components/Feature";

const FeaturedProducts = dynamic(
  () => import("@/components/product/FeaturedProduct")
);
export default function Home() {
  return (
    <div>
      <Wrapper>
        <HeroBanner />
        <Feature />
        <FeaturedProducts />
      </Wrapper>
    </div>
  );
}
