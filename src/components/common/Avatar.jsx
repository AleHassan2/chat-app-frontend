import React from "react";
import clsx from "clsx";

const sizes = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const Avatar = ({ src, alt, size = "md", online = false, className = "" }) => {
  return (
    <div className={clsx("relative inline-block", className)}>
      <img
        src={src || "https://via.placeholder.com/150"}
        alt={alt || "User Avatar"}
        className={clsx(
          "rounded-full object-cover border border-wa-light-200 dark:border-wa-dark-tertiary",
          sizes[size]
        )}
      />
      {online && (
        <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-wa-dark-secondary"></span>
      )}
    </div>
  );
};

export default Avatar;
