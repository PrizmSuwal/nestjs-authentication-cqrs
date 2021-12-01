import { Users } from "src/users/entities/user.entity";
import { database } from "./database";

export const config = {
    ...database,
    entities: [Users],
    synchronize: false,
    migrationsTableName: "migrations",
    migrations: [
       'src/migrations/*.ts'
    ],
    cli: {
        migrationsDir: "src/migrations"
    }
}