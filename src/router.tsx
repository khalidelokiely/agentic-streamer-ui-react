import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { HomeView } from "./features/home/HomeView";
import { WatchlistView } from "./features/watchlist/WatchlistView";
import { RunsView } from "./features/runs/RunsView";
import { ErrorPage } from "./features/errorpage/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        errorElement: <ErrorPage />, // Optional: Add an error boundary for the dashboard layout
        children: [
            {
                index: true, // Acts as the root path dashboard matching "/"
                element: <HomeView />,
            },
            {
                path: "watchlist", // Matches "/watchlist"
                element: <WatchlistView />,
            },
            {
                path: "agents/:agentId/runs", // Matches "/agents/:agentId/runs"
                element: <RunsView />, // Replace with the actual component for runs view
            }
        ],
    },
]);