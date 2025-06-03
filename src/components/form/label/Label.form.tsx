import { FC, } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { ILabelProps } from "./index";

export const Label: FC<ILabelProps> = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        twMerge(
          "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400",
          className,
        ),
      )}
    >
      {children}
    </label>
  );
};

