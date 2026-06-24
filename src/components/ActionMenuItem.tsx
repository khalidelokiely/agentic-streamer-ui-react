export const ActionMenuItem = ({ label, onClick }: { label: string, onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className="text-slate-300 block w-full text-left px-4 py-2 text-sm hover:bg-slate-600 hover:text-white"
            role="menuitem"
            tabIndex={-1}
        >
            {label}
        </button>
    )
}