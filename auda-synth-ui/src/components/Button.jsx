import React from "react";

const variants = {
  primary: "bg-primary text-white",
  brand: "bg-brand text-brand",
};

const sizes = {
  sm: "px-3 py-1 text-sm font-light tracking-tight",
  md: "px-3 py-1 text-base font-medium tracking-normal",
  lg: "px-3 py-1 text-lg font-semibold tracking-wide",
};

function Button({
  children,
  customStyles,
  variant = "brand",
  size = "md",
  ...rest
}) {
  const variantClass = variants[variant];
  const sizeClass = sizes[size];
  const className = `text-center shadow-inner ${variantClass} ${sizeClass} ${customStyles} `;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}

export default Button;
