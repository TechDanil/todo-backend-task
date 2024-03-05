import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('TODO', 'postgres', 'postgres', {
	host: 'localhost',
	dialect: 'postgres',
})

export const connection = async () => {
	try {
		await sequelize.authenticate()
		console.log('connection established')
		await sequelize.sync()
	} catch (error) {
		throw error
	}
}
