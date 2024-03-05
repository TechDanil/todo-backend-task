import { TaskModel } from '../models/task.model.js'

class TaskService {
	async createTask(userId, title, description, completed, visibility) {
		const task = await TaskModel.create({
			userId,
			title,
			description,
			completed,
			visibility,
		})

		return task
	}

	async editTask(userId, taskId, title, description, completed, visibility) {
		const task = await TaskModel.findOne({
			where: {
				id: taskId,
				userId,
			},
		})

		if (!task) {
			throw new Error('Task not found')
		}

		task.title = title
		task.description = description
		task.completed = completed
		task.visibility = visibility

		await task.save()
		return task
	}

	async removeTask(userId, taskId) {
		const task = await TaskModel.findOne({
			where: {
				id: taskId,
				userId,
			},
		})

		if (!task) {
			throw new Error('Task not found')
		}

		await task.destroy()
	}

	async getAllTasks(userId) {
		const tasks = await TaskModel.findAll({
			where: {
				userId,
			},
		})

		return tasks
	}

	async viewTask(userId, taskId) {
		const task = await TaskModel.findOne({
			where: {
				id: taskId,
				userId,
			},
		})

		if (!task) {
			throw new Error('Task not found')
		}

		return task
	}
}

export default new TaskService()
