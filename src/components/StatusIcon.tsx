import React from "react";

export function StatusIcon({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={`w-3 h-3 rounded-full ${className} animate-pulse mr-1.25`}
        />
    );
}