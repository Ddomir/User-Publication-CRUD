module.exports = (sequelize, DataTypes) => {
  const Publication = sequelize.define(
    "Publication",
    {
      // <- Table Name
      id: {
        // Col - ID which is primary key and auto-incrementing
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      student_id: {
        // Col - integer referencing ID in Users table
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false
      },
      title: {
        // Col - string which is string and can't be null
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        // Col - year which is integer and can't be null
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Publication.associate = (models) => {
    Publication.belongsTo(models.User, {
      foreignKey: "student_id",
      as: "student",
    });
  };

  return Publication;
};
