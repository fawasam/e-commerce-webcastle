import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { data } from "@/constants";

const MobileMenu = () => {
  return (
    <ul className=" flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px) bg-white border-t text-black ]">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li className="cursor-pointer py-4 px-5 border-b flex flex-col relative ">
                <div className="flex justify-between items-center ">
                  {item.name}
                  <BsChevronDown size={14} />
                </div>
              </li>
            ) : (
              <li className="py-4 px-5 border-b">
                <a href={item?.url}>{item.name}</a>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default MobileMenu;
