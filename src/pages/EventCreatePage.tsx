import { useNavigate } from 'react-router-dom'
import EventForm from '../components/EventForm'
import { createEvent } from '../services/eventService'
import type { EventPayLoad } from '../services/eventService'
import type { EventFormValues } from '../types/event'

export default function EventCreatePage() {
  const navigate = useNavigate()
  const initialValues: EventFormValues = { name: '', date: '', startTime: '', endTime: '', mode: 'offline', location: '', link: '', capacity: '' }
  const handleSubmit = async (payload: EventPayLoad) => {
    const created = await createEvent(payload)
    navigate(`/su-kien/${created.id}`, { state: { message: 'Thêm sự kiện thành công' } })
  }

  return (
    <div className="mx-auto max-w-2xl py-7 sm:py-10">
      <button type="button" onClick={() => navigate(-1)} className="mb-6 inline-flex rounded-lg text-sm font-semibold text-muted transition hover:text-coral-dark">← Quay lại</button>
      <div className="mb-7">
        <p className="m-0 text-[10px] font-extrabold tracking-[.2em] text-coral-dark">THÊM HOẠT ĐỘNG MỚI</p>
        <h1 className="my-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Tạo một sự kiện</h1>
        <p className="m-0 leading-relaxed text-muted">Chia sẻ kế hoạch để mọi người cùng tham gia và tạo nên những kỷ niệm mới.</p>
      </div>
      <div className="relative overflow-hidden rounded-3xl border border-white/90 bg-white p-5 shadow-[0_24px_70px_-42px_rgba(20,36,58,0.45)] ring-1 ring-slate-200/70 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-14 size-40 rounded-full bg-coral-soft blur-2xl" />
        <div className="relative"><EventForm initialValues={initialValues} isCreate submitLabel="Tạo sự kiện" onSubmit={handleSubmit} /></div>
      </div>
    </div>
  )
}
