import { sql } from "./db.js";

sql`
    CREATE TABLE videos (
        id  TEXT PRIMARY KEY, 
        title TEXT,
        description TEXT,
        duration INTEGER
    );
`.then(() => {
    console.log("Tabela 'videos' criada com sucesso!");
}).catch((error) => {
    console.error("Erro ao criar a tabela:", error);
});
