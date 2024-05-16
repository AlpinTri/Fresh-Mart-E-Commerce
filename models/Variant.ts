// import { DataTypes } from 'sequelize'
// import db from '../utils/db.config'
// import Product from './Product'

// export default db.define('variant', {
//   id: {
//     type: DataTypes.STRING,
//     primaryKey: true,
//     defaultValue: DataTypes.UUIDV4
//   },
//   product_id: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     references: {
//       model: Product,
//       key: 'id'
//     }
//   },
//   variant_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false
//   }
// })