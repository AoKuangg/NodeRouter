import dotenv from "dotenv";
import express from "express";
import appUsuario from "./routers/usuario.js";
dotenv.config();

const appExpress = express();




appExpress.use(express.json());

appExpress.use("/cliente",appUsuario);





let config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});