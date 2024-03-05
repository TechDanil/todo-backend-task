import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'
import { UserModel } from './user.model.js'

export const TaskModel = sequelize.define(
	'tasks',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		completed: {
			type: DataTypes.ENUM('incomplete', 'complete'),
			allowNull: false,
			defaultValue: 'incomplete',
		},
		visibility: {
			type: DataTypes.ENUM('public', 'private'),
			allowNull: false,
			defaultValue: 'public',
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: UserModel,
				key: 'id',
			},
		},
	},
	{
		modelName: 'task',
		timestamps: true,
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	}
)
await sequelize.sync({ alter: false })
