import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    label: string;
    children: React.ReactNode
}

export function Badge({ label, children, className = "", ...props }: BadgeProps) {
    return (
        <span
            {...props}
            className={`icon-[] inline-flex items-center 
                rounded-full px-2 py-0.5 text-xs font-medium uppercase
                transition-all duration-snappy ease-damped-settle ${className}
                `}>
            {children}
            {label}
        </span>
    );
}
