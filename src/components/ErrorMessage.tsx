interface ErrorMessageProps { message: string; onRetry?: () => void }
export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-8 text-center text-sm text-rose-800" role="alert">
        <strong className="font-bold">Có lỗi xảy ra</strong>
        <p className="my-3">{message}</p>
        {onRetry && <button type="button" className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200" onClick={onRetry}>Thử lại</button>}
    </div>
}
