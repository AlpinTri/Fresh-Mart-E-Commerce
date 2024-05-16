import db from '../utils/db'
import Product from './Product'
import User from './User'
import Cart from './Cart'
import Transaction from './Transaction'
import { Model, DataTypes } from 'sequelize'
import type { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

interface OrderModel extends Model<InferAttributes<OrderModel>, InferCreationAttributes<OrderModel>> {
  id: CreationOptional<string>
  product_id: string
  transaction_id: string
  quantity: number
}

const Order = db.define<OrderModel>('order', {
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.STRING,
    references: {
      model: Product,
      key: 'id'
    }
  },
  transaction_id: {
    type: DataTypes.STRING,
    references: {
      model: Transaction,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER
  }
}, {
  underscored: true
})

export default Order