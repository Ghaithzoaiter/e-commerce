type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; 
  variant?: "primary" | "outline" | "danger";
};

export default function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
}: ButtonProps) {
  
  const base =
    "px-4 py-2 hover:shadow-xl rounded-lg font-medium transition-all active:scale-95 cursor-pointer";

  const variants = {
    primary: "text-center  font-bold  bg-background px-3 py-2 border rounded-lg hover:bg-gray-100 hover:border-transparent hover:bg-teal-600 hover:text-white   text-[#46797A] ease-in-out hover:-translate-y-1 hover:scale-110",
    outline: "border text-foreground  border-border  hover:bg-black hover:text-white hover:shadow-xl/30  hover:-translate-y-1 hover:scale-110",
    danger: "bg-red-700  text-foreground hover:bg-red-500 border-border",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
