import { model, Schema } from "mongoose"

export type subjects = 
    'Indonesian' |
    'English' | 
    'Sundanese' | 
    'Civic Education' | 
    'Religion' | 
    'Biology' | 
    'Physysc' | 
    'Social' | 
    'Sports physical Education and health' |
    'Math' |
    'arts and crafts'

export const subjects: subjects[] = [
    'Indonesian',
    'English', 
    'Sundanese', 
    'Civic Education', 
    'Religion', 
    'Biology', 
    'Physysc', 
    'Social', 
    'Sports physical Education and health',
    'Math',
    'arts and crafts'
]

export interface homework {
    homeworkId: string
    name: string
    subject: subjects
    assigned_on: number
    due_on: number
    isDone: boolean
}

const HomeWorkSchema = new Schema<homework>({
    homeworkId: {
        type: String,
        required: true
    },
    name: {
        required: true,
        type: String
    },
    subject: {
        required: true,
        type: String
    },
    assigned_on: {
        required: true,
        type: Number
    },
    due_on: {
        required: true,
        type: Number
    },
    isDone: {
        required: true,
        type: Boolean
    }
})

export default model('homework', HomeWorkSchema)