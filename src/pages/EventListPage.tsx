import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import EventCard from '../components/EventCard'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import Toast from '../components/Toast'
import { getEvents } from '../services/eventService'
import type { ClubEvent } from '../types/event'
import { isUpcoming } from '../utils/date'

type Status = 'loading' | 'success' | 'error'

export default function EventListPage() {
  const [events, setEvents] = useState<ClubEvent[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [query, setQuery] = useState('')
  const [reload, setReload] = useState(0)
  const location = useLocation()
  const [notice, setNotice] = useState((location.state as { message?: string; notice?: string } | null)?.notice ?? (location.state as { message?: string } | null)?.message ?? '')

  useEffect(() => {
    let active = true
    getEvents().then(data => { if (active) { setEvents(data); setStatus('success') } }).catch(() => { if (active) setStatus('error') })
    return () => { active = false }
  }, [reload])

  const filtered = events.filter(event => event.name.toLocaleLowerCase('vi').includes(query.trim().toLocaleLowerCase('vi')))
  const upcoming = filtered.filter(event => isUpcoming(event.date)).sort((a, b) => a.date.localeCompare(b.date))
  const past = filtered.filter(event => !isUpcoming(event.date)).sort((a, b) => b.date.localeCompare(a.date))
  const renderGroup = (title: string, items: ClubEvent[], tint: string) => (
    <section className="mb-10" key={title}>
      <div className="mb-4 flex items-center gap-3">
        <span className={`grid size-10 place-items-center rounded-2xl ${tint}`} aria-hidden="true">{title === 'Sắp diễn ra' ? '✦' : '✓'}</span><h2 className="m-0 text-xl font-bold text-ink">{title}</h2><span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-muted ring-1 ring-slate-200/70">{items.length} sự kiện</span>
      </div>
      {items.length ? <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{items.map(event => <EventCard key={event.id} event={event} onDeleted={() => { setNotice('Đã xóa sự kiện thành công.'); setReload(value => value + 1) }} />)}</div> : <EmptyState message={query ? 'Không tìm thấy sự kiện phù hợp.' : 'Chưa có sự kiện trong nhóm này.'} />}
    </section>
  )

  return (
    <div className="py-6 sm:py-10">
      {notice && <Toast message={notice} onClose={() => setNotice('')} />}
      <section className="relative mb-8 overflow-hidden rounded-4xl bg-linear-to-br from-[#83cbdf] via-[#91CBE0] to-[#B5A5DD] px-6 py-8 sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute -right-10 -top-16 size-56 rounded-full bg-white/60 blur-2xl" />
        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl"><p className="m-0 text-[10px] font-bold tracking-[.18em] text-sea">GẶP GỠ · KẾT NỐI · CÙNG PHÁT TRIỂN</p>
            <h1 className="mb-3 mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Những khoảnh khắc<br className="hidden sm:block" /> đáng để cùng nhau tạo nên.</h1>
            <p className="max-w-lg text-sm leading-relaxed text-muted">Khám phá lịch hoạt động câu lạc bộ, tìm cảm hứng mới và tham gia những sự kiện sắp tới.</p>
          </div>
          <Link className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-sea px-4 py-3 text-sm font-bold text-white shadow-lg shadow-sea/15 transition duration-200 hover:-translate-y-0.5 hover:bg-sea-dark" to="/su-kien/them">
            <span aria-hidden="true">＋</span> Tạo sự kiện</Link>
        </div>
      </section>
      <label className="mb-8 block max-w-md text-xs font-bold text-slate-600">Tìm sự kiện<input className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-sea/60 focus:ring-4 focus:ring-sea/10" value={query} onChange={event => setQuery(event.target.value)} placeholder="Thử tìm workshop, giao lưu…" /></label>
      {status === 'loading' ? <Loading /> : status === 'error' ? <ErrorMessage message="Không tải được danh sách. Hãy kiểm tra json-server đang chạy." onRetry={() => { setStatus('loading'); setReload(value => value + 1) }} /> : filtered.length === 0 ? <EmptyState message={query ? 'Không tìm thấy sự kiện phù hợp.' : 'Chưa có sự kiện nào. Hãy tạo sự kiện đầu tiên!'} /> : <>{renderGroup('Sắp diễn ra', upcoming, 'bg-coral-soft text-coral-dark')}{renderGroup('Đã diễn ra', past, 'bg-sea-soft text-sea-dark')}</>}
    </div>
  )
}
