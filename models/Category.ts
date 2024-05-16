import db from '../utils/db'
import Product from './Product'
import { Model, DataTypes } from 'sequelize'
import type { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

interface CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> {
  id: CreationOptional<string>
  category_name: string
}

const Category = db.define<CategoryModel>('category', {
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  underscored: true
})

export default Category
