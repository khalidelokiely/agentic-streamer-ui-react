import React from 'react';

export const ActionMenu = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    // 🌟 Handle closing when focus leaves the container
    const handleBlur = (event: React.FocusEvent) => {
        // Check if the newly focused element (relatedTarget) is outside the menu component
        if (menuRef.current && !menuRef.current.contains(event.relatedTarget as Node)) {
            setIsOpen(false);
        }
    };

    return (
        <div
            ref={menuRef}
            onBlur={handleBlur}
            tabIndex={0} // 🌟 Allows the container to receive and lose focus
            className="text-slate-600 justify-center relative inline-block text-left cursor-pointer mt-2 focus:outline-none"
        >
            <div>
                <button
                    type="button"
                    onClick={toggleMenu}
                    className="focus:outline-none block" // Cleaned up semantics to button
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="5" r="1.5" />
                        <circle cx="12" cy="19" r="1.5" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 min-w-32 rounded-md shadow-lg bg-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 duration-snappy animate-fade-in"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    <div className="py-1" role="none">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};