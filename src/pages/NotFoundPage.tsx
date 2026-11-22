import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return <section className="mx-auto my-12 max-w-2xl rounded-[2rem] border border-white/90 bg-white/80 px-6 py-16 text-center shadow-[0_24px_70px_-42px_rgba(20,36,58,0.45)] ring-1 ring-slate-200/70 backdrop-blur sm:my-16">
        <span className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-coral-soft text-2xl text-coral" aria-hidden="true">✦</span>
        <p className="m-0 text-[10px] font-extrabold tracking-[.2em] text-coral-dark">LẠC ĐƯỜNG MẤT RỒI</p>
        <h1 className="m-0 text-8xl font-extrabold text-sea">404</h1>
        <p className="mb-7 text-muted">Trang bạn tìm không tồn tại hoặc đã được chuyển đi.</p>
        <Link className="inline-flex items-center justify-center rounded-xl bg-sea px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-sea/15 transition hover:-translate-y-0.5 hover:bg-sea-dark" to="/su-kien">Quay lại danh sách</Link>
    </section>
}
