const { DataTypes } = require('sequelize')
const sequelize = require('../dataSource/index')

const Contact = sequelize.define('contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cooperationType: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'cooperation_type'
  },
  other: {
    type: DataTypes.STRING,
  },
  modifyTime: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'modify_time'
  },
  requestInfo: {
    type: DataTypes.STRING,
    field: 'request_info'
  }
}, {
  tableName: 'contact',
  createdAt: 'create_time',
  updatedAt: 'update_time',
  timestamps: false,
  underscored: true,
})

// Contact.sync({ force: false })

module.exports = Contact
