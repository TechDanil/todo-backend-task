class ApiException extends Error {
	status
	errors

	constructor(status, msg, errors) {
		super(msg)
		this.status = status
		this.errors = errors
	}

	static UnauthorizedError() {
		return new ApiException(401, 'User is not unauthorized')
	}

	static BadRequest(msg, errors = []) {
		return new ApiException(400, msg, errors)
	}

	static ForbiddenRequest(msg, errors = []) {
		return new ApiException(403, msg, errors)
	}
}

export default ApiException
