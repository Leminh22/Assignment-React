import { useEffect, useId, useRef } from 'react'
import type { KeyboardEvent, MouseEvent, ReactElement, ReactNode } from 'react'

type Tone = 'danger' | 'primary'

interface DialogLabels {
    readonly cancel: string
    readonly confirm: string
    readonly busy: string
}

const DEFAULT_LABELS = {
    cancel: 'Hủy',
    confirm: 'Xóa sự kiện',
    busy: 'Đang xóa…',
} as const satisfies DialogLabels

const TONE_CLASS = {
    danger: 'bg-rose-50 text-rose-700 hover:bg-rose-100',
    primary: 'bg-sea text-white shadow-lg shadow-sea/15 hover:bg-sea-dark',
} as const satisfies Record<Tone, string>

export interface ConfirmDialogProps {
    readonly title: string
    readonly message: ReactNode
    readonly busy?: boolean
    readonly tone?: Tone
    readonly labels?: Partial<DialogLabels>
    readonly onCancel: () => void
    readonly onConfirm: () => void | Promise<void>
}

export default function ConfirmDialog({
    title,
    message,
    busy = false,
    tone = 'danger',
    labels,
    onCancel,
    onConfirm,
}: ConfirmDialogProps): ReactElement {
    const titleId = useId()
    const messageId = useId()
    const cancelRef = useRef<HTMLButtonElement>(null)
    const text: DialogLabels = { ...DEFAULT_LABELS, ...labels }

    useEffect(() => {
        cancelRef.current?.focus()
    }, [])

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
        if (event.key === 'Escape' && !busy) {
            event.stopPropagation()
            onCancel()
        }
    }

    const handleBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
        if (event.target === event.currentTarget && !busy) onCancel()
    }

    return (
        <div className="fixed inset-0 z-40 grid place-items-center bg-slate-900/45 p-5 backdrop-blur-sm" role="presentation" onClick={handleBackdropClick}>
            <section
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={messageId}
                aria-busy={busy}
                onKeyDown={handleKeyDown}
            >
                <h2 id={titleId} className="m-0 text-xl font-bold text-ink">{title}</h2>
                <p id={messageId} className="text-sm leading-relaxed text-muted">{message}</p>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        ref={cancelRef}
                        className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200 disabled:opacity-60"
                        type="button"
                        disabled={busy}
                        onClick={onCancel}
                    >
                        {text.cancel}
                    </button>
                    <button
                        className={`rounded-xl px-4 py-3 text-sm font-bold transition disabled:opacity-60 ${TONE_CLASS[tone]}`}
                        type="button"
                        disabled={busy}
                        onClick={() => void onConfirm()}
                    >
                        {busy ? text.busy : text.confirm}
                    </button>
                </div>
            </section>
        </div>
    )
}
