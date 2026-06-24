import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

export function Button({ label, className = "", ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={`
                min-h-11 min-w-11 rounded-lg px-4 py-2.5
                font-medium text-sm text-center select-none
                bg-slate-800 text-slate-200 cursor-pointer
                hover:bg-slate-700 active:scale-95
                disabled:pointer-events-none disabled:opacity-50
                transition-all duration-snappy ease-damped-settle 
                ${className}
        `}>
            {label}
        </button>
    );
}