import ormConfig from "src/core/infrastructure/database/orm-config";
import { DataSource } from "typeorm";

export default new DataSource({ ...ormConfig })