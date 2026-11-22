export default function Footer() {
    return <footer className="mx-auto mt-12 flex w-full max-w-6xl flex-col justify-between gap-2 border-t border-slate-200/80 px-4 py-7 text-xs text-muted sm:mt-16 sm:flex-row sm:gap-3 sm:px-7">
        <div>
            <strong className="text-ink">ClubEvents</strong>
            <span> · Kết nối thành viên, tạo nên hoạt động đáng nhớ.</span>
        </div>
        <span>© {new Date().getFullYear()} Câu lạc bộ</span>
    </footer>
}
