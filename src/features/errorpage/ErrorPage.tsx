import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export const ErrorPage = () => {
    const error = useRouteError();
    console.error("Caught routing error:", error); // Helpful for tracking down trace logs

    let title = "Application Error";
    let message = "An unexpected error occurred. Our engineering team has been notified.";
    let statusCode = "500";

    // Check if it's a structural routing error (like a 404)
    if (isRouteErrorResponse(error)) {
        statusCode = error.status.toString();
        if (error.status === 404) {
            title = "Page Not Found";
            message = "The dashboard view or agent run route you're looking for does not exist.";
        } else if (error.status === 401) {
            title = "Unauthorized Access";
            message = "You don't have active authorization privileges to view this layout slot.";
        }
    } else if (error instanceof Error) {
        // This catches actual code runtime crashes (e.g., trying to read undefined.map())
        message = error.message;
    }

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-950 text-slate-100 p-6 box-border font-sans select-none">
            <div className="max-w-md text-center space-y-6">
                {/* Visual Icon Anchor */}
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
                    <AlertTriangle size={32} />
                </div>

                <div className="space-y-2">
                    <span className="text-xs font-mono font-bold tracking-widest text-cyan-500 bg-cyan-950/40 border border-cyan-900/50 px-2 py-0.5 rounded">
                        ERROR CODE {statusCode}
                    </span>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white mt-2">
                        {title}
                    </h1>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                        {message}
                    </p>
                </div>

                {/* Secure Escape Hatch Button */}
                <div className="pt-2">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-md active:scale-[0.98]"
                    >
                        <Home size={16} />
                        Return to Safety
                    </Link>
                </div>
            </div>
        </div>
    );
};