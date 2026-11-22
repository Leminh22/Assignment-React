interface EmptyStateProps { message: string }

export default function EmptyState({ message }: EmptyStateProps) {
    return <div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 p-8 text-center text-sm text-muted">
        <span className="text-3xl text-sea/50" aria-hidden="true">✧</span>
        <p className="mb-0 mt-2">{message}</p>
    </div>
}
