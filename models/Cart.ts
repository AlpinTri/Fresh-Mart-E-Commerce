import db from '../utils/db'
import Product from './Product'
import User from './User'
import { Model, DataTypes } from 'sequelize'
import type { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

interface CartModel extends Model<InferAttributes<CartModel>, InferCreationAttributes<CartModel>> {
  id: CreationOptional<string>
  user_id: string
  product_id: string
  quantity: number
}

const Cart = db.define<CartModel>('cart_items', {
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'id'
    }
  },
  product_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER
  }
}, {
  underscored: true
})

export default Cart