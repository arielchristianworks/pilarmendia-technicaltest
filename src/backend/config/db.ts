import { Sequelize } from "sequelize";
import * as mysql2 from "mysql2";

var sqlz: Sequelize | undefined = undefined;

try {
  console.info("Initializing database connection...");
  sqlz = new Sequelize({
    dialect: 'mysql',
    dialectModule: mysql2,
    host: "localhost",
    database: 'technical_pilarmedia',
    username: 'root',
    password: '',
    port: 3306,
  });

  console.info("Authenticating...");
  sqlz.authenticate();
  console.info("Database connection established;");
  // sqlz.sync();
}
catch (e: any) {
  console.info("Database connection error: " + e.message);
}

try {
  // sqlz?.query("CREATE INDEX products_name_idx ON products (ProductName);")
}
catch (e: any) {}

export default sqlz;