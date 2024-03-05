import ApiException from '../exceptions/api.exceptions.js'
export const errorMiddleware = (err, req, res, next) => {
	if (err instanceof ApiException) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors })
	}

	return res.status(500).json({ message: 'unexpected error', err })
}
