import Wrapper from "@/components/Wrapper";
import { LuLoader } from "react-icons/lu";
export default function Loading() {
  return (
    <Wrapper>
      <div className="flex items-center justify-center h-screen">
        <LuLoader className="text-[25px] md:text-[40px] animate-spin" />
      </div>
    </Wrapper>
  );
}
