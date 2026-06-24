import * as React from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "./Sidebar"; // Adjust path to where your hook lives

export interface SidebarItemProps {
    to: string;
    label: string;
    badgeCount?: number;
    icon?: React.ReactNode;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ to, label, badgeCount, icon }) => {
    // 1. Hook into the parent sidebar's layout status
    const { isCollapsed } = useSidebar();

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                [
                    "w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all group outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
                    // 2. Adjust alignment patterns based on thickness status
                    isCollapsed ? "justify-center" : "justify-between",
                    isActive ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                ].join(" ")
            }
        >
            {({ isActive }) => (
                <>
                    <div className="flex items-center gap-3 relative">
                        {icon && (
                            <span className={`transition-colors shrink-0 ${isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"}`}>
                                {icon}
                            </span>
                        )}

                        {/* 3. Mini-notification dot fallback for thin viewports */}
                        {isCollapsed && badgeCount !== undefined && badgeCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-slate-950" />
                        )}

                        {/* 4. Hide label content safely inside wide mode views */}
                        {!isCollapsed && (
                            <span className="duration-200 animate-fade-in whitespace-nowrap">
                                {label}
                            </span>
                        )}
                    </div>

                    {/* 5. Hide large badge structures during thin configurations */}
                    {!isCollapsed && badgeCount !== undefined && badgeCount > 0 && (
                        <span className={`flex h-5 min-w-5 items-center justify-between rounded-full px-1.5 text-xs font-semibold tracking-tight duration-200 animate-fade-in ${isActive ? "bg-cyan-500 text-slate-950" : "bg-slate-800 text-slate-300 group-hover:bg-slate-700"
                            }`}>
                            {badgeCount}
                        </span>
                    )}
                </>
            )}
        </NavLink>
    );
};