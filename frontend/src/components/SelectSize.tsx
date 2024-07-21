const SelectSize = ({ product }: any) => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-6" id="sizesGrid">
      {product?.map((item: any, i: number) => (
        <div
          className={`border rounded-md text-center py-3 font-medium hover:border-black  ${
            item
              ? "hover:border-black cursor-pointer"
              : " bg-black/[0.1] opacity-50 cursor-not-allowed"
          } `}
          key={i}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default SelectSize;
