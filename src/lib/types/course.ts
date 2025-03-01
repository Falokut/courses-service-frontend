import type{Lesson} from "./lesson"

export interface Course {
    id: number,
    name: string,
    author: string,
    lessons:Lesson[],
}