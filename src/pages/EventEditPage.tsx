import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EventForm from '../components/EventForm'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { getEventById, updateEvent } from '../services/eventService'
import type { ClubEvent, EventFormValues } from '../types/event'

export default function EventEditPage() {
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState<ClubEvent | null>(null);
    const [status, setStatus] = useState<'loading' | 'ready' | 'missing' | 'error'>('loading');
    const [retry, setRetry] = useState(0)

    useEffect(() => {
        let active = true;
        getEventById(id).then(data => { if (active) { setEvent(data); setStatus('ready') } }).catch(error => { if (active) setStatus(error?.response?.status === 404 ? 'missing' : 'error') });
        return () => { active = false }
    }, [id, retry])
    if (status === 'loading') return <Loading />
    if (status === 'missing') return <div className="mx-auto my-12 max-w-xl rounded-2xl border border-white bg-white p-8 text-center shadow-lg ring-1 ring-slate-200/50">
        <h1 className="text-2xl font-bold text-ink">Không tìm thấy sự kiện</h1>
        <Link to="/su-kien" className="text-xs font-bold text-sea hover:text-sea-dark">Về danh sách</Link>
    </div>
    if (status === 'error')
        return <ErrorMessage message="Không tải được sự kiện để chỉnh sửa." onRetry={() => {
            setStatus('loading');
            setRetry(value => value + 1)
        }} />
    if (!event)
        return null
    const initialValues: EventFormValues = {
        name: event.name,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        mode: event.mode,
        location: event.location,
        link: event.link,
        capacity: String(event.capacity)
    }
    return <div className="mx-auto max-w-2xl py-7 sm:py-10">
        <Link to={`/su-kien/${id}`} className="mb-6 inline-flex text-sm font-semibold text-muted transition hover:text-coral-dark">← Chi tiết sự kiện</Link>
        <div className="mb-6">
            <p className="m-0 text-[10px] font-extrabold tracking-[.2em] text-coral-dark">CẬP NHẬT THÔNG TIN</p>
            <h1 className="my-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Chỉnh sửa sự kiện</h1>
        </div><div className="rounded-3xl border border-white/90 bg-white p-5 shadow-[0_24px_70px_-42px_rgba(20,36,58,0.45)] ring-1 ring-slate-200/70 sm:p-8">
            <EventForm
                key={event.id}
                initialValues={initialValues}
                isCreate={false}
                submitLabel="Lưu thay đổi"
                onSubmit={async payload => {
                    await updateEvent(id, payload);
                    navigate(`/su-kien/${id}`,
                        { state: { notice: 'Đã cập nhật sự kiện thành công.' } })
                }} />

        </div>
    </div>
}
