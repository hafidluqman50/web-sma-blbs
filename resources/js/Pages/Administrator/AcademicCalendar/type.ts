
export interface AcademicCalendar {
    id: number
    year_academic: string
    image: string
}

export interface AcademicCalendarForm {
    year_academic: string
    image: File | null
}
