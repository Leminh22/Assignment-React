import type { ChangeEvent, FocusEvent } from 'react'

interface TextFieldProps {
    label: string
    name: string
    value: string
    type?: 'text' | 'date' | 'time' | 'number'
    error?: string
    placeholder?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: FocusEvent<HTMLInputElement>) => void
}

export default function TextField({
    label, name, value, type = 'text', error, placeholder, onChange, onBlur, }: TextFieldProps) {
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="block text-sm font-bold text-slate-700">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                className={`mt-2 block w-full rounded-xl border px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:ring-4 ${error ? 'border-rose-400 bg-rose-50/40 focus:border-rose-400 focus:ring-rose-100' : 'border-slate-200 bg-white focus:border-sea/60 focus:ring-sea/10'}`}
            />
            {error && <p id={`${name}-error`} className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>}
        </div>
    )
}
