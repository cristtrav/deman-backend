import ormConfig from "src/config/orm-config";
import { DataSource } from "typeorm";

export default new DataSource({ ...ormConfig })