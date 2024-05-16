import Cart from "./Cart";
import Category from "./Category";
import Order from "./Order";
import Product from "./Product";
import Transaction from "./Transaction";
import User from "./User";

function syncRelation() {
  // console.log(Cart)
  User.hasMany(Transaction, {
    foreignKey: {
      field: 'user_id'
    }
  })

  User.hasMany(Cart, {
    foreignKey: {
      field: 'user_id'
    }
  })

  Transaction.hasMany(Order, {
    foreignKey: {
      field: 'transaction_id'
    }
  })

  Product.hasMany(Order, {
    foreignKey: {
      field: 'product_id'
    }
  })

  Product.hasMany(Cart, {
    foreignKey:'product_id',
    sourceKey: 'id'
  })
  Cart.belongsTo(Product, {
    foreignKey:  'product_id',
    targetKey: 'id'
  })

  Category.hasMany(Product, {
    foreignKey: 'category_id'
  })
  Product.belongsTo(Category, {
    foreignKey: 'category_id',
    targetKey: 'id'
  })
}

export default syncRelation