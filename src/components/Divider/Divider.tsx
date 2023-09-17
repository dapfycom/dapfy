// Divider component using tailwindcss

import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Divider = ({ className, ...props }: IProps) => {
  return (
    <div
      className={
        "w-full border-t border-gray-600 dark:border-gray-700 " + className
      }
      {...props}
    ></div>
  );
};

export default Divider;
