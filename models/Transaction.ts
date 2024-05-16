import db from '../utils/db'
import User from './User'
import { Model, DataTypes } from 'sequelize'
import type { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

interface TransactionModel extends Model<InferAttributes<TransactionModel>, InferCreationAttributes<TransactionModel>> {
  id: CreationOptional<string>
  user_id: string
  total: number
  address: string
  status: string
}

const Transaction = db.define<TransactionModel>('transaction', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  user_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'id'
    }
  },
  total: {
    type: DataTypes.DECIMAL(12, 2)
  },
  address: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('pending', 'success', 'failure')
  }
}, {
  underscored: true
})

export default Transaction