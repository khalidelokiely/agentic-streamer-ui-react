import * as React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/navigation/Sidebar";
import { SidebarItem } from "../components/navigation/SidebarItem";
import { LayoutDashboard, Terminal, Activity, Settings, Radio } from "lucide-react";

export const DashboardLayout: React.FC = () => {
    // Hardcoded for now—this will connect to your local storage tracking hooks later

    return (
        <div className="w-screen h-screen flex overflow-hidden bg-slate-900 text-slate-100 antialiased">
            <Sidebar>
                <SidebarItem
                    to="/"
                    label="Dashboard"
                    icon={<LayoutDashboard size={18} />}
                />
                <SidebarItem
                    to="/watchlist"
                    label="Agent Runners"
                    icon={<Terminal size={18} />}
                    badgeCount={3}
                />
                <SidebarItem
                    to="/streams"
                    label="Live Streams"
                    icon={<Radio size={18} />}
                />
                <SidebarItem
                    to="/metrics"
                    label="System Metrics"
                    icon={<Activity size={18} />}
                />

                <div className="pt-4 mt-4 border-t border-slate-900/50 justify-end">
                    <SidebarItem
                        to="/settings"
                        label="Settings"
                        icon={<Settings size={18} />}
                    />
                </div>
            </Sidebar>            <main className="flex-1 h-full overflow-y-auto relative p-8 box-border">
                <div className="max-w-6xl mx-auto w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};