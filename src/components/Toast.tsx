import * as React from 'react'

interface ToastProps {
    message: string
    onDone: () => void
}

export const Toast: React.FC<ToastProps> = ({ message, onDone }) => {
    React.useEffect(() => {
        const t = setTimeout(onDone, 2500)
        return () => clearTimeout(t)
    }, [onDone])

    return (
        <div className="fixed top-6 right-6 z-50 bg-emerald-800 border border-emerald-700 text-slate-100 text-sm font-medium px-4 py-3 rounded-lg shadow-xl duration-snappy animate-fade-in-up">
            {message}
        </div>
    )
}