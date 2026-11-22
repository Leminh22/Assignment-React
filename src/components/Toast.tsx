import { useEffect } from 'react'
interface ToastProps {
    message: string; onClose: () => void
}
export default function Toast({ message, onClose }: ToastProps) {
    useEffect(() => {
        const timer = window.setTimeout(onClose, 3500);
        return () => window.clearTimeout(timer)
    }, [message, onClose]); return <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-sea-dark px-4 py-3 text-sm font-semibold text-white shadow-xl" role="status">✓ {message}
        <button className="border-0 bg-transparent text-xl text-white/80 hover:text-white" type="button" aria-label="Đóng thông báo" onClick={onClose}>×</button>
    </div>
}
