/*
{
 {
            Method:       http.MethodPost,
            Path:         "/lessons/attach_file",
            Handler:      r.Lesson.AttachFileToLesson,
            AllowedRoles: []string{domain.LectorType},
        }, {
            Method:       http.MethodDelete,
            Path:         "/lessons/delete_video",
            Handler:      r.Lesson.DeleteLessonVideo,
            AllowedRoles: []string{domain.LectorType},
        }, {
            Method:       http.MethodDelete,
            Path:         "/lessons/unattach_file",
            Handler:      r.Lesson.UnattachFileFromLesson,
            AllowedRoles: []string{domain.LectorType},
        },
*/

import type { AddLessonVideoRequest } from "$lib/types/add_lesson_video_request"
import type { AttachFileRequest } from "$lib/types/attach_file_request"
import type { CreateLessonRequest } from "$lib/types/create_lesson_request"
import type { EditLessonContentRequest } from "$lib/types/edit_lesson_content"
import type { EditLessonTitleRequest } from "$lib/types/edit_lesson_title"
import { DefaultClient } from "$lib/utils/client"
import { GetSessionId } from "$lib/utils/session"

const createLessonEndpoint = "/lessons"
export async function CreateLesson(req: CreateLessonRequest): Promise<boolean> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.PostJSON(createLessonEndpoint,
        req,
        DefaultClient.UserBearerAuthHeader(sessionId),
    ).
        then(r => r.ok)
}

const editLessonTitleEndpoint = "/lessons/edit_title"
export async function EditLessonTitle(req: EditLessonTitleRequest): Promise<boolean> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.PostJSON(editLessonTitleEndpoint,
        req,
        DefaultClient.UserBearerAuthHeader(sessionId),
    ).
        then(r => r.ok)
}

const editLessonContentEndpoint = "/lessons/edit_content"
export async function EditLessonContent(req: EditLessonContentRequest): Promise<boolean> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.PostJSON(editLessonContentEndpoint,
        req,
        DefaultClient.UserBearerAuthHeader(sessionId),
    ).
        then(r => r.ok)
}

const addVideoLessonEndpoint = "/lessons/add_video"
export async function AddVideo(req: AddLessonVideoRequest): Promise<string> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.PostJSON(addVideoLessonEndpoint,
        req,
        DefaultClient.UserBearerAuthHeader(sessionId),
    ).
        then(r => r.text())
}

const attachFileEndpoint = "/lessons/attach_file"
export async function AttachFile(req: AttachFileRequest): Promise<string> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.PostJSON(attachFileEndpoint,
        req,
        DefaultClient.UserBearerAuthHeader(sessionId),
    ).
        then(r => r.text())
}


const deleteVideoLessonEndpoint = "/lessons/delete_video"
export async function DeleteVideo(lessonId: number): Promise<boolean> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.Delete(deleteVideoLessonEndpoint,
        { "lessonId": lessonId },
        DefaultClient.UserBearerAuthHeader(sessionId),
    ).
        then(r => r.ok)
}

const unattachFileFromLessonEndpoint = "/lessons/unattach_file"
export async function DeleteAttachment(lessonId: number, attachmentId: number): Promise<boolean> {
    let sessionId = GetSessionId()
    if (!sessionId || sessionId == "") {
        throw Error("метод не доступен, пользователь не авторизован")
    }
    return await DefaultClient.Delete(unattachFileFromLessonEndpoint,
        { "lessonId": lessonId, "attachmentId": attachmentId },
        DefaultClient.UserBearerAuthHeader(sessionId),
    ).
        then(r => r.ok)
}