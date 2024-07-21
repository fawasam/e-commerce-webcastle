import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { data } from "@/constants";

const Navbar = () => {
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {data?.map((item): any => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li className="cursor-pointer flex items-center gap-2 relative ">
                {item.name}
                <BsChevronDown size={14} />
              </li>
            ) : (
              <li className="cursor-pointer">
                <Link href={item?.url}>{item?.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Navbar;
