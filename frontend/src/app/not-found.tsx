import dynamic from "next/dynamic";
const NotFound = dynamic(() => import("@/components/NotFound"));
export default function page() {
  return <NotFound />;
}
