import type { LessonAttachment } from "./lesson_attachment";

export interface Lesson {
    id: number;
    lessonNumber: number;
    title: string;
    createdAt: string;
    lessonContent: string;
    videoUrl: string;
    attachments: LessonAttachment[];
}