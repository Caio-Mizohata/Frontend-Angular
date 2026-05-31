import app from "./app.ts";
import { databaseConfig } from "./config/database.ts";

const startServer = async (): Promise<void> => {
    const PORT: number = 3000;
    
    const db = databaseConfig();
    try {
        const server = app.listen(PORT, () => {
            console.log(`Aplicação rodando em http://localhost:${PORT}`);
        });

        const gracefulShutdown = async (): Promise<void> => {
            console.log("Encerrando o servidor e banco de dados...");
            try {
                db.close();
            } catch (err) {
                console.error('Erro ao fechar o banco de dados:', err);
            }
            server.close(() => process.exit(0));
        };

        process.on("SIGINT", gracefulShutdown);
        process.on("SIGTERM", gracefulShutdown);
    } catch (error) {
        console.error("Erro fatal ao iniciar:", error);
        process.exit(1);
    }
};

startServer();