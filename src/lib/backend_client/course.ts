import { DefaultClient } from "$lib/utils/client";
import type { Course } from "$lib/types/course"
import type { CoursePreview } from "$lib/types/course_preview";

const courseByIdEndpoint = "/courses"
export async function GetCourse(id: string): Promise<Course> {
    return await DefaultClient.Get(courseByIdEndpoint + "/" + id).then(r => r.json())
}

export async function GetCourses(limit: number, offset: number): Promise<CoursePreview[]> {
    let query = {
        'limit': limit,
        'offset': offset,
    }
    return await DefaultClient.Get(courseByIdEndpoint, query).
        then(r => r.json())
}