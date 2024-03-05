import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'
import { TokenModel } from './token.model.js'

export const UserModel = sequelize.define(
	'users',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		avatar: {
			type: DataTypes.BLOB,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'User',
		timestamps: true,
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	}
)

UserModel.hasMany(TokenModel, { foreignKey: 'userId' })
TokenModel.belongsTo(UserModel, { foreignKey: 'userId' })
;(async () => {
	await sequelize.sync({ alter: false })
})()

export default UserModel
