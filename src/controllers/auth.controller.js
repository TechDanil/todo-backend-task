import { validationResult } from 'express-validator'
import { REFRESH_TOKEN_MAX_AGE } from '../configs/index.config.js'
import ApiException from '../exceptions/api.exceptions.js'
import authService from '../services/auth.service.js'

class AuthController {
	async signup(req, res, next) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return next(ApiException.BadRequest('validation error', errors.array()))
			}

			const { name, age, email, password, confirmPassword, avatar } = req.body

			const userData = await authService.register(
				name,
				age,
				email,
				password,
				confirmPassword,
				avatar
			)

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: REFRESH_TOKEN_MAX_AGE,
				httpOnly: true,
			})

			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}

	async login(req, res, next) {
		try {
			const result = validationResult(req)
			if (!result.isEmpty()) {
				return next(ApiException.BadRequest('validation error', result.array()))
			}

			const { email, password } = req.body

			const userData = await authService.login(email, password)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: REFRESH_TOKEN_MAX_AGE,
				httpOnly: true,
			})
			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			console.log('refreshToken', refreshToken)
			const token = await authService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.json(token)
		} catch (error) {
			next(error)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const userData = await authService.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: REFRESH_TOKEN_MAX_AGE,
				httpOnly: true,
			})
			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}

	async changeUserInfo(req, res, next) {
		try {
			// const result = validationResult(req)
			// if (!result.isEmpty()) {
			// 	return next(ApiException.BadRequest('validation error', result.array()))
			// }

			const userId = req.params.userId
			const { name, age, email, avatar, password, confirmPassword } = req.body

			const updatedUserInfo = {
				name: name || undefined,
				age: age || undefined,
				email: email || undefined,
				avatar: avatar || undefined,
				password: password || undefined,
			}

			const updatedUser = await authService.changeUserInfo(
				userId,
				updatedUserInfo
			)

			return res.json(updatedUser)
		} catch (error) {
			next(error)
		}
	}
}

export default new AuthController()
