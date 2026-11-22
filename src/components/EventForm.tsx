import { useState } from 'react'
import type { ChangeEvent, FocusEvent, FormEvent } from 'react'
import TextField from './TextField'
import { validataEvent } from '../utils/validateEvent'
import type { EventFormValues } from '../types/event'
import type { EventPayLoad } from '../services/eventService'

interface EventFormProps {
    initialValues: EventFormValues
    isCreate: boolean
    submitLabel: string
    onSubmit: (payload: EventPayLoad) => Promise<void>
}

export default function EventForm({ initialValues, isCreate, submitLabel, onSubmit }: EventFormProps) {
    const [values, setValues] = useState<EventFormValues>(initialValues)
    const [touched, setTouched] = useState<Partial<Record<keyof EventFormValues, boolean>>>({})
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')

    const errors = validataEvent(values, isCreate)
    const showError = (f: keyof EventFormValues) => (touched[f] ? errors[f] : undefined)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues((prev) => ({ ...prev, [name]: value }))
    }
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        setTouched({
            name: true, date: true, startTime: true, endTime: true,
            location: true, link: true, capacity: true
        })
        if (Object.keys(errors).length > 0) return

        setSubmitting(true)
        setSubmitError('')
        try {
            await onSubmit({
                name: values.name.trim(),
                date: values.date,
                startTime: values.startTime,
                endTime: values.endTime,
                mode: values.mode,
                location: values.mode === 'offline' ? values.location.trim() : '',
                link: values.mode === 'online' ? values.link.trim() : '',
                capacity: Number(values.capacity),
            })
        } catch {
            setSubmitError('Không thể lưu dữ liệu. Vui lòng kiểm tra kết nối và thử lại.')
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            <TextField label="Tên sự kiện" name="name" value={values.name}
                error={showError('name')} onChange={handleChange} onBlur={handleBlur} />
            <TextField label="Ngày tổ chức" name="date" type="date" value={values.date}
                error={showError('date')} onChange={handleChange} onBlur={handleBlur} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField label="Giờ bắt đầu" name="startTime" type="time" value={values.startTime}
                    error={showError('startTime')} onChange={handleChange} onBlur={handleBlur} />
                <TextField label="Giờ kết thúc" name="endTime" type="time" value={values.endTime}
                    error={showError('endTime')} onChange={handleChange} onBlur={handleBlur} />
            </div>

            <fieldset className="m-0 flex flex-wrap items-center gap-3 border-0 p-0">
                <legend className="mb-2 block w-full text-sm font-bold text-slate-700">Hình thức tổ chức</legend>
                <div className="flex flex-wrap gap-3">
                    {(['offline', 'online'] as const).map((m) => (
                        <label key={m} className="inline-flex items-center gap-2 rounded-xl bg-canvas px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-200/70 transition has-checked:bg-sea-soft has-checked:text-sea-dark has-checked:ring-sea/30">
                            <input className="accent-sea" type="radio" name="mode" value={m} checked={values.mode === m}
                                onChange={handleChange} />
                            {m === 'offline' ? 'Trực tiếp' : 'Trực tuyến'}
                        </label>
                    ))}
                </div>
            </fieldset>


            {values.mode === 'offline' ? (
                <TextField label="Địa điểm" name="location" value={values.location}
                    error={showError('location')} onChange={handleChange} onBlur={handleBlur} />
            ) : (
                <TextField label="Đường dẫn tham gia" name="link" value={values.link}
                    placeholder="https://..." error={showError('link')}
                    onChange={handleChange} onBlur={handleBlur} />
            )}

            <TextField label="Số chỗ tối đa" name="capacity" type="number" value={values.capacity}
                error={showError('capacity')} onChange={handleChange} onBlur={handleBlur} />

            {submitError && <p className="rounded-xl bg-rose-50 px-3 py-2.5 text-sm text-rose-700" role="alert">{submitError}</p>}

            <button type="submit" disabled={submitting}
                className="mt-1 inline-flex min-w-40 items-center justify-center gap-2 rounded-xl border-0 bg-coral px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-coral/20 transition duration-200 hover:-translate-y-0.5 hover:bg-coral-dark disabled:translate-y-0 disabled:opacity-60">
                {submitting ? 'Đang lưu…' : submitLabel}
            </button>
        </form>
    )
}
