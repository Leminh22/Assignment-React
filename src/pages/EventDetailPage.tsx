import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import Toast from '../components/Toast'
import { deleteEvent, getEventById } from '../services/eventService'
import type { ClubEvent } from '../types/event'

export default function EventDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [event, setEvent] = useState<ClubEvent | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing' | 'error'>('loading')
  const [retry, setRetry] = useState(0)
  const [confirm, setConfirm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState((location.state as { notice?: string; message?: string } | null)?.notice ?? (location.state as { message?: string } | null)?.message ?? '')

  useEffect(() => {
    let active = true
    getEventById(id).then(data => { if (active) { setEvent(data); setStatus('ready') } }).catch(error => {
      if (active) setStatus(axios.isAxiosError(error) && error.response?.status === 404 ? 'missing' : 'error')
    })
    return () => { active = false }
  }, [id, retry])

  const remove = async () => {
    if (!event) return
    setBusy(true)
    try { await deleteEvent(event.id); navigate('/su-kien', { state: { notice: 'Đã xóa sự kiện thành công.' } }) }
    catch { setToast('Không thể xóa sự kiện. Hãy kiểm tra kết nối và thử lại.'); setBusy(false) }
  }

  if (status === 'loading') return <Loading />
  if (status === 'missing') return <div className="mx-auto my-12 max-w-xl rounded-3xl border border-white/90 bg-white p-8 text-center shadow-[0_24px_70px_-42px_rgba(20,36,58,0.45)] ring-1 ring-slate-200/70"><span className="text-4xl text-coral">✧</span><h1 className="text-2xl font-bold text-ink">Không tìm thấy sự kiện</h1><p className="mb-5 text-sm text-muted">Sự kiện có thể đã bị xóa hoặc đường dẫn không chính xác.</p><Link to="/su-kien" className="inline-flex items-center justify-center rounded-xl bg-sea px-4 py-3 text-sm font-bold text-white transition hover:bg-sea-dark">Về danh sách sự kiện</Link></div>
  if (status === 'error') return <ErrorMessage message="Không tải được thông tin sự kiện." onRetry={() => { setStatus('loading'); setRetry(value => value + 1) }} />
  if (!event) return null

  return (
    <div className="mx-auto max-w-3xl py-7 sm:py-10">
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
      <Link to="/su-kien" className="mb-6 inline-flex text-sm font-semibold text-muted transition hover:text-coral-dark">← Tất cả sự kiện</Link>
      <article className="overflow-hidden rounded-3xl border border-white/90 bg-white p-5 shadow-[0_24px_70px_-42px_rgba(20,36,58,0.45)] ring-1 ring-slate-200/70 sm:p-8">
        <div className="relative mb-7 overflow-hidden rounded-2xl bg-gradient-to-br from-[#17365d] via-[#214a76] to-[#315f89] p-5 text-white sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-16 size-52 rounded-full bg-coral/25 blur-3xl" />
          <div className="relative flex items-center justify-between gap-3"><span className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${event.mode === 'offline' ? 'bg-white/15 text-white' : 'bg-coral text-white'}`}>{event.mode === 'offline' ? '● Trực tiếp' : '◉ Trực tuyến'}</span><span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white ring-1 ring-white/20">{event.capacity} chỗ tối đa</span></div>
          <p className="relative m-0 mt-8 text-[10px] font-extrabold tracking-[.2em] text-[#ffad94]">CHI TIẾT SỰ KIỆN</p><h1 className="relative mb-2 mt-2 text-3xl font-extrabold leading-tight text-white sm:text-4xl">{event.name}</h1>
          <p className="relative text-sm text-blue-100">Một hoạt động của cộng đồng câu lạc bộ.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 py-2 sm:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-2xl bg-canvas p-4"><span className="text-xs font-semibold uppercase tracking-wide text-muted">Ngày tổ chức</span><strong className="break-words text-sm leading-relaxed text-ink">{new Date(`${event.date}T00:00:00`).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong></div>
          <div className="flex flex-col gap-2 rounded-2xl bg-canvas p-4"><span className="text-xs font-semibold uppercase tracking-wide text-muted">Thời gian</span><strong className="break-words text-sm leading-relaxed text-ink">{event.startTime} – {event.endTime}</strong></div>
          <div className="flex flex-col gap-2 rounded-2xl bg-canvas p-4"><span className="text-xs font-semibold uppercase tracking-wide text-muted">{event.mode === 'offline' ? 'Địa điểm' : 'Hình thức'}</span><strong className="break-words text-sm leading-relaxed text-ink">{event.mode === 'offline' ? event.location : 'Trực tuyến'}</strong></div>
          {event.mode === 'online' && <div className="flex flex-col gap-2 rounded-2xl bg-canvas p-4"><span className="text-xs font-semibold uppercase tracking-wide text-muted">Đường dẫn tham gia</span><a className="break-words text-sm leading-relaxed text-sea underline decoration-sea/30 underline-offset-4 hover:decoration-sea" href={event.link} target="_blank" rel="noreferrer">Mở phòng họp ↗</a></div>}
        </div>
        <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
          <Link className="inline-flex items-center justify-center rounded-xl bg-sea px-4 py-3 text-sm font-bold text-white transition hover:bg-sea-dark" to={`/su-kien/${id}/sua`}>Chỉnh sửa sự kiện</Link>
          <button className="inline-flex items-center justify-center rounded-xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 transition hover:bg-rose-100" type="button" onClick={() => setConfirm(true)}>Xóa sự kiện</button>
        </div>
      </article>
      {confirm && <ConfirmDialog title="Xóa sự kiện?" message={`Bạn có chắc muốn xóa “${event.name}”?`} busy={busy} onCancel={() => setConfirm(false)} onConfirm={() => void remove()} />}
    </div>
  )
}
