import type { EventFormErrors, EventFormValues } from "../types/event"
import { todayString } from './date'

function isValiUrl(value: string): boolean {
    try {
        const url = new URL(value)
        return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
        return false
    }
}

export function validataEvent(values: EventFormValues, isCreate: boolean): EventFormErrors {
    const errors: EventFormErrors = {}

    const name = values.name.trim()

    if (!name) errors.name = 'Vui lòng nhập tên sự kiện'
    else if (name.length < 5 || name.length > 100)
        errors.name = 'Tên sự kiện phải từ 5 đến 100 kí tự'

    if (!values.date) errors.date = 'Vui lòng chọn ngày tổ chức'
    else if (isCreate && values.date < todayString())
        errors.date = 'Ngày tổ chức không được ở trong quá khứ'

    if (!values.startTime) errors.startTime = 'Vui lòng chọn giờ bắt đầu'

    if (!values.endTime) errors.endTime = 'Vui lòng chọn giờ kết thúc'
    else if (values.startTime && values.endTime <= values.startTime)
        errors.endTime = 'Giờ kết thúc phải sau giờ bắt đầu'

    if (values.mode === 'offline') {
        if (!values.location.trim()) errors.location = 'Vui lòng nhập địa chỉ'
    } else {
        const link = values.link.trim()
        if (!link) errors.link = 'Vui lòng nhập đường dẫn tham gia '
        else if (!isValiUrl(link))
            errors.link = 'Đường dẫn không hợp lệ ! '
    }

    const cap = values.capacity.trim()
    if (!cap) errors.capacity = 'Vui lòng nhập số chỗ tối đa'
    else {
        const n = Number(cap)
        if (Number.isNaN(n)) errors.capacity = 'Số chỗ phải là một số'
        else if (!Number.isInteger(n)) errors.capacity = 'Số chỗ phải là số nguyên'
        else if (n < 1 || n > 500) errors.capacity = 'Số chỗ phải từ 1 đến 500'
    }

    return errors

}