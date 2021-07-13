const { DataTypes } = require('sequelize');

// TODO: PENSAR COMO TENER UN ID SIN COLISIONAR
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
