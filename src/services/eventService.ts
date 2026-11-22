import api from './api'
import type { ClubEvent } from '../types/event'

export type EventPayLoad = Omit<ClubEvent, 'id'>

export async function getEvents(): Promise<ClubEvent[]> {
  const response = await api.get<ClubEvent[]>('/events')
  return response.data
}

export async function getEventById(id: string): Promise<ClubEvent> {
  const response = await api.get<ClubEvent>(`/events/${encodeURIComponent(id)}`)
  return response.data
}

export async function createEvent(data: EventPayLoad): Promise<ClubEvent> {
  const response = await api.post<ClubEvent>('/events', data)
  return response.data
}

export async function updateEvent(id: string, data: EventPayLoad): Promise<ClubEvent> {
  const response = await api.put<ClubEvent>(`/events/${encodeURIComponent(id)}`, data)
  return response.data
}

export async function deleteEvent(id: string): Promise<void> {
  await api.delete(`/events/${encodeURIComponent(id)}`)
}
