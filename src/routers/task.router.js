import express from 'express'
import { body, param } from 'express-validator'
import TaskController from '../controllers/task.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
const taskRouter = express.Router()

taskRouter.post(
	'/task/createTask/:userId',
	param('userId').isInt().toInt(),
	body('title').isString(),
	body('description').isString(),
	body('completed').isBoolean(),
	body('visibility').isIn(['public', 'private']),
	authMiddleware,
	TaskController.createTask
)

taskRouter.patch(
	'/task/editTask/:userId/:id',
	param('userId').isInt().toInt(),
	param('id').isInt().toInt(),
	body('title').isString(),
	body('description').isString(),
	body('completed').isIn(['incomplete', 'complete']),
	body('visibility').isIn(['public', 'private']),
	authMiddleware,
	TaskController.editTask
)

taskRouter.delete(
	'/task/removeTask/:userId/:id',
	param('userId').isInt().toInt(),
	param('id').isInt().toInt(),
	authMiddleware,
	TaskController.removeTask
)

taskRouter.get(
	'/task/getAllTasks/:userId',
	param('userId').isInt().toInt(),
	authMiddleware,
	TaskController.getAllTasks
)

taskRouter.get(
	'/task/viewTask/:userId/:id',
	param('userId').isInt().toInt(),
	param('id').isInt().toInt(),
	authMiddleware,
	TaskController.viewTask
)

export default taskRouter
