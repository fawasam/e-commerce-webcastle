interface ButtonProps {
  title: string;
  type?: "submit" | "button" | "reset";
}
const Button = ({ title, type }: ButtonProps) => {
  return (
    <button
      className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
      type={type}
    >
      {title}
    </button>
  );
};

export default Button;
