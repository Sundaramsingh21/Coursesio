import express from 'express'
import { getACourseId, getAllCourse } from '../Controllers/courseController.js';

const courseRouter = express.Router();

courseRouter.get('/all', getAllCourse)
courseRouter.get('/:id', getACourseId)

export default courseRouter;