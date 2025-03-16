
export interface Teacher {
    id: number
    name: string
    position: string
    image: string
}

export interface TeacherForm {
    name: string
    position: string
    image: File | null
}
