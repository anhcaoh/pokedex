import clsx from "clsx";
import { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={clsx("rounded shadow-md p-3 text-3xl", props.className)}
    />
  );
};
export default Input;
