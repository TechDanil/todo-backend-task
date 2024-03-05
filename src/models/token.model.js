import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

export const TokenModel = sequelize.define(
	'tokens',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		refreshToken: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		modelName: 'token',
		timestamps: true,
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	}
)
;(async () => {
	await sequelize.sync({ alter: false })
})()
