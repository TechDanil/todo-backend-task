import express from 'express'
import { body } from 'express-validator'
import authController from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.get('/auth/refresh', authController.refresh)
authRouter.post(
	'/auth/register',
	body('name').notEmpty().withMessage('Name is required').isString(),
	body('age')
		.notEmpty()
		.withMessage('Age is required')
		.isInt()
		.withMessage('Age must be a positive integer'),
	body('avatar').notEmpty().isString().withMessage('Avatar is required'),
	body('email')
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email format'),
	body('password')
		.notEmpty()
		.withMessage('Password is required')
		.isString()
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
	body('confirmPassword')
		.notEmpty()
		.withMessage('Confirm Password is required')
		.isString(),
	authController.signup
)

authRouter.post(
	'/auth/login',
	body('email').notEmpty().isEmail().withMessage('Invalid email format'),
	body('password').notEmpty(),
	authController.login
)

authRouter.post('/auth/logout', authController.logout)

authRouter.patch('/auth/user-info/:userId', authController.changeUserInfo)

export default authRouter
