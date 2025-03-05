import { DefaultClient } from "$lib/utils/client";
import type { Course } from "$lib/types/course"
import type { CoursePreview } from "$lib/types/course_preview";
import { GetSessionId } from "$lib/utils/session";
import type { EditCourseRequest } from "$lib/types/edit_course_request";
import type { AddCourseRequest } from "$lib/types/add_course_request";

const courseByIdEndpoint = "/courses/by_id"
export async function GetCourse(id: string): Promise<Course> {
    return await DefaultClient.Get(courseByIdEndpoint, { "courseId": id }).then(r => r.json())
}

const getCoursesEndpoint = "/courses"
export async function GetCourses(limit: number, offset: number): Promise<CoursePreview[]> {
    let query = {
        'limit': limit,
        'offset': offset,
    }
    return await DefaultClient.Get(getCoursesEndpoint, query).
        then(r => r.json())
}

const isRegisteredEndpoint = "/courses/is_registered"
export async function IsUserRegistered(courseId: string): Promise<boolean> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.Get(isRegisteredEndpoint,
        { "courseId": courseId },
        DefaultClient.UserBearerAuthHeader(sessionId),
    ).
        then(r => r.json()).
        then(r => r.isRegistered)
}

const registerOnCourseEndpoint = "/courses/register"
export async function RegisterOnCourse(courseId: number): Promise<boolean> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.PostJSON(registerOnCourseEndpoint,
        { "courseId": courseId },
        DefaultClient.UserBearerAuthHeader(sessionId),
    ).
        then(r => r.ok)
}

const userCoursesEndpoint = "/courses/user_courses"
export async function UserCourses(): Promise<CoursePreview[]> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.Get(userCoursesEndpoint,
        null,
        DefaultClient.UserBearerAuthHeader(sessionId),
    ).
        then(r => r.json())
}

const lectorCoursesEndpoint = "/courses/lector_courses"
export async function LectorCourses(): Promise<CoursePreview[]>  {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.Get(lectorCoursesEndpoint,
        null,
        DefaultClient.UserBearerAuthHeader(sessionId),
    ).
        then(r => r.json())
}

const deleteCourseEndpoint = "/courses"
export async function DeleteCourse(id: number): Promise<boolean> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    let r = await DefaultClient.Delete(deleteCourseEndpoint, { "courseId": id }, DefaultClient.UserBearerAuthHeader(sessionId))
    return r.ok
}

const addCourseEndpoint = "/courses"
export async function AddCourse(req: AddCourseRequest): Promise<string> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.PostJSON(addCourseEndpoint, req, DefaultClient.UserBearerAuthHeader(sessionId)).
        then(r => r.json()).
        then(r => r.previewPictureUrl)
}


const editCourseEndpoint = "/courses/edit"
export async function EditCourse(req: EditCourseRequest): Promise<string> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.PostJSON(editCourseEndpoint, req, DefaultClient.UserBearerAuthHeader(sessionId)).
        then(r => r.json()).
        then(r => r.newPreviewPictureUrl)
}
