import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import EventListPage from './pages/EventListPage'
import EventDetailPage from './pages/EventDetailPage'
import EventCreatePage from './pages/EventCreatePage'
import EventEditPage from './pages/EventEditPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/su-kien" replace />} />
        <Route path="/su-kien" element={<EventListPage />} />
        <Route path="/su-kien/them" element={<EventCreatePage />} />
        <Route path="/su-kien/:id" element={<EventDetailPage />} />
        <Route path="/su-kien/:id/sua" element={<EventEditPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App