import db from '../utils/db'
import { Model, DataTypes } from 'sequelize'
import type { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

interface ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
  id: CreationOptional<string>
  name: string
  category_id: string
  stock: number
  price: number
}

const Product = db.define<ProductModel>('product', {
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category_id: {
    type: DataTypes.STRING
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  underscored: true
})

export default Product