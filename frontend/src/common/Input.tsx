import { FormFieldProps } from "@/types";

interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
        className="input-field"
        style={{
          padding: "10px",
          borderBottom: "1px solid #ccc",
          borderRadius: "4px",
          outline: "none",
        }}
      />
      {error && <span style={{ color: "red" }}>{error.message}</span>}
    </div>
  );
};

export default Input;
