import jwt from 'jsonwebtoken'
import {
	ACCESS_TOKEN_LIFE,
	REFRESH_TOKEN_LIFE,
} from '../configs/index.config.js'
import { TokenModel } from '../models/token.model.js'

class TokenService {
	generateTokens = payload => {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: ACCESS_TOKEN_LIFE,
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: REFRESH_TOKEN_LIFE,
		})

		return {
			accessToken,
			refreshToken,
		}
	}

	validateAccessToken = token => {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch (error) {
			return null
		}
	}

	validateRefreshToken = token => {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch (error) {
			return null
		}
	}

	removeToken = async refreshToken => {
		const tokenData = await TokenModel.findOne({ where: { refreshToken } })

		if (tokenData) {
			await tokenData.destroy()
		}

		return tokenData
	}

	findToken = async refreshToken => {
		const tokenData = await TokenModel.findOne({ where: { refreshToken } })
		return tokenData
	}

	saveToken = async (userId, refreshToken) => {
		const tokenData = await TokenModel.findOne({ where: { userId } })

		if (tokenData) {
			tokenData.refreshToken = refreshToken
			await tokenData.save()
			return tokenData
		}

		const token = await TokenModel.create({ userId, refreshToken })
		await token.save()
		return token
	}
}

export default new TokenService()
