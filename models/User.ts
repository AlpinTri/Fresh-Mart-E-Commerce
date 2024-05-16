import db from '../utils/db'
import { Model, DataTypes } from 'sequelize'
import type { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<string>
  nomor_hp: string
  password: string
  username: string
}

const User = db.define<UserModel>('user', {
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nomor_hp: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  underscored: true
})

export default User