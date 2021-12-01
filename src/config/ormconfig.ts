import { database } from "./database";

export const config = {
    ...database,
    entities: [__dirname+'/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    migrationsTableName: "migrations",
    migrations: [
        __dirname+'/../migrations/*.{.ts,.js}'
    ],
    cli: {
        migrationsDir: "src/migrations"
    }
}