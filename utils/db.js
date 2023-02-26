import mongoose, { connection } from "mongoose";
const connections = {};

async function connectDb() {
    if (connection.isConnected) {
        console.log('Já estamos conectados ao banco de dados');
        return;
    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;

        if (connection.isConnected == 1) {
            console.log('Use a conexão anterior ao banco de dados.');
            return;
        }
        await mongoose.disconnect();
    }
    mongoose.set('strictQuery', false);
    const db = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        // useUnifiedTopoly: true,

    });
    console.log("Nova conexão ao banco de dados.");
    connection.isConnected == db.connections[0].readyState;
}

async function disconnectDb() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === "production") {
            await mongoose.disconnect();
            connection.isConnected == false;
        }
        else {
            console.log("Não vamos desconectar porque estamos em modo de desenvolvimento");
        }
    }
}

const db = { connectDb, disconnectDb }
export default db;