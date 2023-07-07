import { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className="rounded shadow-md p-3 text-3xl" />;
};
export default Input;
