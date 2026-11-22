import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { ClubEvent } from '../types/event'
import { deleteEvent } from '../services/eventService'
import ConfirmDialog from './ConfirmDialog'
import Toast from './Toast'

interface EventCardProps { event: ClubEvent; onDeleted: () => void }

export default function EventCard({

  event, onDeleted }: EventCardProps

) {
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('')
  const remove = async () => {

    setBusy(true);
    try {
      await deleteEvent(event.id);
      setConfirm(false);
      onDeleted()
    } catch {
      setToast('Không thể xóa sự kiện. Vui lòng thử lại.')
    } finally {
      setBusy(false)
    }
  }

  return <article className="group relative rounded-3xl border border-white/90 bg-white p-5 shadow-[0_16px_48px_-32px_rgba(20,36,58,0.36)] ring-1 ring-slate-200/70 transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_55px_-32px_rgba(20,36,58,0.42)] sm:p-6">
    <div className="flex items-center justify-between gap-3">
      <span className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${event.mode === 'offline' ? 'bg-sea-soft text-sea-dark' : 'bg-coral-soft text-coral-dark'}`}>{event.mode === 'offline' ? '● Trực tiếp' : '◉ Trực tuyến'}</span>
      <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-muted ring-1 ring-slate-200/70">{event.capacity} chỗ</span>
    </div>
    <p className="mb-1 mt-6 text-xs font-bold uppercase tracking-wide text-coral-dark">{new Date(`${event.date}T00:00:00`).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
    <h3 className="mb-2 mt-0 text-xl font-bold leading-snug text-ink transition group-hover:text-sea">
      <Link to={`/su-kien/${event.id}`}>{event.name}</Link>
    </h3>
    <p className="m-0 truncate text-sm text-muted">{event.startTime} – {event.endTime} · {event.mode === 'offline' ? event.location : 'Tham gia trực tuyến'}</p>
    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
      <Link to={`/su-kien/${event.id}`} className="rounded-xl bg-sea-soft px-3 py-2 text-xs font-bold text-sea transition hover:bg-sea hover:text-white">Xem chi tiết →</Link>
      <Link to={`/su-kien/${event.id}/sua`} className="border-0 bg-transparent p-1 text-xs font-semibold text-slate-500 hover:text-ink">Sửa</Link>
      <button type="button" className="border-0 bg-transparent p-1 text-xs font-semibold text-rose-600 hover:text-rose-800" onClick={() => setConfirm(true)}>Xóa</button>
    </div>
    {confirm && <ConfirmDialog title="Xóa sự kiện?" message={`Bạn có chắc muốn xóa “${event.name}”?`} busy={busy} onCancel={() => setConfirm(false)} onConfirm={() => void remove()} />}{toast && <Toast message={toast} onClose={() => setToast('')} />}</article>
}
