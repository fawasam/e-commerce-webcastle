const SingleProductSkeleton = () => {
  return Array(2)
    .fill(0)
    .map((n, i) => (
      <div className="productCardSkeleton" key={i}>
        <div className="skeleton skeleton-image"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text small"></div>
      </div>
    ));
};

export default SingleProductSkeleton;
