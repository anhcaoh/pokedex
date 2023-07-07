import { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className="p-3 text-3xl" />;
};
export default Input;
