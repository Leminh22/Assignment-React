export default function Loading() {
    return <div className="flex items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white/80 p-8 text-center text-sm text-muted" role="status">
        <span className="size-5 animate-spin rounded-full border-2 border-sea/15 border-t-sea" /> Đang tải dữ liệu…</div>
}
