module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // <- Table Name
      id: {
        // Col - ID which is primary key and auto-incrementing
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        // Col - email which is string and can't be null
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        // Col - first name which is string and can't be null
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        // Col - last name which is string and can't be null
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  // Reference for publications
  User.associate = (models) => {
    User.hasMany(models.Publication, {
      foreignKey: "student_id",
      as: "publications",
    });
  };

  return User;
};
