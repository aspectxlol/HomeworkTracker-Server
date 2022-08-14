import { Router } from "express";
import { addHomework, getHomeworkbyid, getHomeworkBySubject, toggleFinishHomework, getAllHomework, getHomeworkByDone, DeleteHomeworkById } from "../database/database";
import { subjects } from "../database/models/homework";
import { v4 } from "uuid";

const router = Router()

router.post('/add', (req, res) => {
    const {name, subject, assigned_on, due_on} = req.body
    if(req.query.apikey != process.env.APIKEY) return res.status(401).send('Missing Access')
    if(!name || !subject || !assigned_on || !due_on) return res.status(400).send('Missing parameters')
    if(!subjects.includes(subject)) return res.status(400).send('bad request')
    return addHomework({
        homeworkId: `${v4()}`,
        name: `${name}`,
        subject: subject,
        assigned_on: assigned_on,
        due_on: due_on,
        isDone: false
    }).then((response) => {
        res.json(response)
    })
})

router.get('/get', async (req, res) => {    
    if(req.query.apikey != process.env.APIKEY) return res.status(401).send('Missing Access')
    if(req.query.id) {
        const result = await getHomeworkbyid(req.query.id as string)
        if(!result) return res.status(404).send('not found')
        return res.json(result)
    }
    if(req.query.subject) {
        if(!subjects.includes(req.query.subject as any)) return res.status(401).send('bad request')
        const result = await getHomeworkBySubject(req.query.subject as subjects)
        if(!result) return res.status(404).send('not found')
        return res.json(result)
    }
    if(req.query.isdone) {
        if(req.query.isdone === 'true') {
            const result = await getHomeworkByDone(true)
            if(!result) return res.status(404).send('not found')
            return res.json(result)
        }
        else if(req.query.isdone === 'false') {
            const result = await getHomeworkByDone(false)
            if(!result) return res.status(404).send('not found')
            return res.json(result)
        }
        else return res.status(400).send('bad request')
    }
    else return res.json(await getAllHomework())
})

router.patch('/finish', async (req, res) => {
    if(req.query.apikey != process.env.APIKEY) return res.status(401).send('Missing Access')
    if(!req.query.id) return res.status(400).send('bad request')
    const result = await toggleFinishHomework(req.query.id as string)
    if(!result) return res.status(404).send('not found')
    else return res.send(result)
})

router.delete('/delete', async (req, res) => {
    if(req.query.apikey != process.env.APIKEY) return res.status(401).send('Missing Access')
    if(!req.query.id) return res.status(400).send('bad request')
    const result = await DeleteHomeworkById(req.query.id as string)
    if(!result) return res.status(404).send('not found')
    else return res.send(result)
})


export default router