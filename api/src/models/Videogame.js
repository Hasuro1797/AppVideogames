const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull : false,
    },
    released:{
      type: DataTypes.STRING,
      allowNull: true,
      validate : {
        isDate : true,
      }
    },
    rating:{
      type : DataTypes.FLOAT,
      allowNull: true
    },
    background_image:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    description:{
      type: DataTypes.TEXT,
      allowNull : false
    }
  },{
    timestamps: false,
  });
};
