import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const database = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "test",
} as TypeOrmModuleOptions;