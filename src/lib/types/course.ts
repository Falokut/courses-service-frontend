import type { Lesson } from "./lesson"

export interface Course {
    id: number,
    title: string,
    authorFio: string,
    lessons: Lesson[],
}