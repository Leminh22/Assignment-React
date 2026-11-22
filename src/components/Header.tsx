import { NavLink, useLocation } from 'react-router-dom'

export default function Header() {
    const { pathname } = useLocation();
    const eventSectionActive = pathname === '/su-kien' || (pathname.startsWith('/su-kien/') && pathname !== '/su-kien/them');
    return <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 shadow-[0_4px_24px_-20px_rgba(20,36,58,0.45)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-7"><NavLink to="/su-kien" className="inline-flex items-center gap-3 font-extrabold tracking-tight text-ink">
            <span className="grid size-10 place-items-center rounded-2xl bg-linear-to-br from-coral-soft to-orange-100 text-lg text-coral shadow-sm" aria-hidden="true">✦</span>
            <span>Club<span className="text-coral">Events</span>
                <small className="mt-0.5 block text-[11px] font-normal tracking-normal text-muted">Không gian hoạt động câu lạc bộ</small></span>
        </NavLink><nav aria-label="Điều hướng chính" className="flex items-center gap-1.5 rounded-2xl bg-slate-50 p-1 ring-1 ring-slate-200/70">
                <NavLink to="/su-kien" end className={eventSectionActive ? 'rounded-xl bg-sea-soft px-3 py-2.5 text-sm font-semibold text-sea-dark sm:px-3.5' : 'rounded-xl px-3 py-2.5 text-sm font-semibold text-muted transition hover:bg-canvas hover:text-ink sm:px-3.5'}>Sự kiện</NavLink>
                <NavLink to="/su-kien/them" end className={({ isActive }) => isActive ? 'rounded-xl bg-sea-soft px-3 py-2.5 text-sm font-semibold text-sea-dark sm:px-3.5' : 'rounded-xl px-3 py-2.5 text-sm font-semibold text-muted transition hover:bg-canvas hover:text-ink sm:px-3.5'}>Tạo sự kiện</NavLink>
            </nav>
        </div>
    </header>
}
