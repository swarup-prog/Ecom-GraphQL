import { DataTypes, sql } from "@sequelize/core";
import sequelize from "../database/connect";

const Author = sequelize.define("Author", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: sql.uuidV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: sql.uuidV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.UUID,
    references: {
      model: Author,
      key: "id",
    },
  },
  pages: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genre: {
    type: DataTypes.ENUM("FICTION", "NON_FICTION", "ROMANCE", "MYSTERY"),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
  },
});

const sequelizeSync = async () => {
  await sequelize.sync();
};

export { Author, Book, sequelizeSync };
