export type EventMode = 'offline' | 'online'

export interface ClubEvent {
    id: string
    name: string
    date: string
    startTime: string
    endTime: string
    mode: EventMode
    location: string
    link: string
    capacity: number
}

export interface EventFormValues {
    name: string
    date: string
    startTime: string
    endTime: string
    mode: EventMode
    location: string
    link: string
    capacity: string
}

export type EventFormErrors = Partial<Record<keyof EventFormValues, string>>
