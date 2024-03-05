class AuthDto {
	id
	name
	email

	constructor(model) {
		this.id = model.id
		this.name = model.name
		this.email = model.email
	}
}

export default AuthDto
