import { validationResult } from 'express-validator'
import ApiException from '../exceptions/api.exceptions.js'
import taskService from '../services/task.service.js'

class TaskController {
	async createTask(req, res, next) {
		try {
			// const result = validationResult(req)
			// if (!result.isEmpty()) {
			// 	return next(ApiException.BadRequest('validation error', result.array()))
			// }

			const { userId } = req.params
			const { title, description, completed, visibility } = req.body

			const task = await taskService.createTask(
				userId,
				title,
				description,
				completed,
				visibility
			)

			return res.json(task)
		} catch (error) {
			next(error)
		}
	}

	async editTask(req, res, next) {
		try {
			const result = validationResult(req)
			if (!result.isEmpty()) {
				return next(ApiException.BadRequest('validation error', result.array()))
			}

			const { userId, id } = req.params
			const { title, description, completed, visibility } = req.body

			const updatedTask = await taskService.editTask(
				userId,
				id,
				title,
				description,
				completed,
				visibility
			)

			return res.json(updatedTask)
		} catch (error) {
			next(error)
		}
	}

	async removeTask(req, res, next) {
		try {
			const result = validationResult(req)
			if (!result.isEmpty()) {
				return next(ApiException.BadRequest('validation error', result.array()))
			}

			const { userId, id } = req.params

			await taskService.removeTask(userId, id)

			return res.json({ message: 'Task removed successfully' })
		} catch (error) {
			next(error)
		}
	}

	async getAllTasks(req, res, next) {
		try {
			const result = validationResult(req)
			if (!result.isEmpty()) {
				return next(ApiException.BadRequest('validation error', result.array()))
			}

			const userId = req.params.userId

			const tasks = await taskService.getAllTasks(userId)

			return res.json(tasks)
		} catch (error) {
			next(error)
		}
	}

	async viewTask(req, res, next) {
		try {
			const result = validationResult(req)
			if (!result.isEmpty()) {
				return next(ApiException.BadRequest('validation error', result.array()))
			}

			const { userId, id } = req.params

			const task = await taskService.viewTask(userId, id)

			res.json(task)
		} catch (error) {
			next(error)
		}
	}
}

export default new TaskController()
