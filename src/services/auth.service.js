import bcrypt from 'bcrypt'
import { PASSWORD_SALT_LENGTH } from '../configs/index.config.js'
import AuthDto from '../dtos/auth.dto.js'
import ApiException from '../exceptions/api.exceptions.js'
import { UserModel } from '../models/user.model.js'
import tokenService from './token.service.js'

class AuthService {
	async register(name, age, email, password, confirmPassword, avatar) {
		console.log('name', name)
		console.log('email', email)
		console.log('age', age)
		console.log('avatar', avatar)
		console.log('password', password)
		console.log('confirmPassword', confirmPassword)

		if (password !== confirmPassword) {
			throw ApiException.BadRequest('Passwords do not match')
		}

		const candidate = await UserModel.findOne({ where: { email } })

		if (candidate) {
			throw ApiException.BadRequest('User exists with such email')
		}

		const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_LENGTH)

		const user = await UserModel.create({
			name,
			email,
			age,
			avatar,
			password: hashedPassword,
		})

		const userDto = new AuthDto(user)
		console.log('userDto', userDto)

		console.log(hashedPassword)

		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		console.log('tokens', tokens)
		console.log('userDto', userDto)

		return {
			...tokens,
			user: userDto,
		}
	}

	async login(email, password) {
		const user = await UserModel.findOne({ where: { email } })

		if (!user) {
			throw ApiException.BadRequest('the user has not been found!')
		}

		const isPasswordEquals = await bcrypt.compare(password, user.password)

		if (!isPasswordEquals) {
			throw ApiException.BadRequest('Wrong password!')
		}

		const userDto = new AuthDto(user)

		const tokens = tokenService.generateTokens({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	logout = async refreshToken => {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	refresh = async refreshToken => {
		if (!refreshToken) {
			throw ApiException.UnauthorizedError()
		}

		const userData = tokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await tokenService.findToken(refreshToken)

		if (!userData || !tokenFromDb) {
			throw ApiException.UnauthorizedError()
		}

		const user = await UserModel.findOne({ where: { id: userData.id } })

		const userDto = new AuthDto(user)

		const tokens = tokenService.generateTokens({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	async changeUserInfo(userId, updatedUserInfo) {
		try {
			const user = await UserModel.findOne({ where: { id: userId } })

			if (!user) {
				throw ApiException.NotFound('User not found')
			}

			await user.update(updatedUserInfo)

			return user
		} catch (error) {
			throw error
		}
	}
}

export default new AuthService()
