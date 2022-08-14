import homeworkModel, { homework, subjects } from './models/homework'

export const addHomework = async (homework: homework): Promise<any> => {
    const homeworkSave = new homeworkModel(homework)
    return homeworkSave.save()
}

export const getHomeworkbyid = async (homeworkId?: string) => {
    const doc = await homeworkModel.find({homeworkId: homeworkId})
    if(!doc.length) return false
    return doc
}

export const getAllHomework = async () => {
    return homeworkModel.find()
}

export const getHomeworkBySubject = async (subject: subjects) => {
    const doc = await homeworkModel.find({subject: subject})
    if(!doc.length) return false
    return doc
}

export const toggleFinishHomework = async (homeworkId: string) => {
    const doc = await homeworkModel.findOne({homeworkId: homeworkId})
    if(!doc) return false
    return homeworkModel.findOneAndUpdate({homeworkId: homeworkId}, {isDone: !doc?.isDone})
}       

export const getHomeworkByDone = async (isDone: boolean) => {
    const doc = await homeworkModel.find({isDone: isDone})
    if(!doc.length) return false
    return doc
}

export const DeleteHomeworkById = async (homeworkId: string) => {
    const doc = await homeworkModel.deleteOne({homeworkId: homeworkId})
    if(!doc) return false
    return doc
}