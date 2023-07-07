import {Router} from "express" //importo la libreria de router
import mysql from "mysql2";

const appUsuario = Router(); // se l oasigno a una variable para evitar colocar a cada rato Router().----


let con = undefined
appUsuario.use((req,res,next)=>{
    try {
        con = mysql.createPool({
            host:"172.16.49.20",
            user:"sputnik",
            password:"Sp3tn1kC@",
            database:"db_M3_prueba_MYSQL2_node_CamiloPaez",
            port:3306
        });
        next();
    } catch (error) {
        res.status(500).send('Error de conexion')
}
    
})


//POST
appUsuario.post("/",(req, res)=>{
    //agregar un dato a la database
    con.query(
     /*sql */  `INSERT INTO tb_usuario_M3 SET ?`,
     req.body,
     (err,data,fils)=>{
        console.log(err)
        console.log(data)
        console.log(fils)
        data.affectedRows += 200;
        let resul = req.body;
        resul.id = data.insertId;
        res.status(data.affectedRows).send(resul);
     }
    ) 
    
})
appUsuario.get('/', (req, res) => {
    con.query(
        /*sql*/`SELECT * FROM tb_usuario_M3`,
        (err,data,fils)=>{
            console.log(err);
            console.log(data);
            console.log(fils);
            res.status(200).send(data);
        }
    )
})

/**no entendi */
appUsuario.put('/', (req, res) => {
    const { id, ...dataBody } = req.body;
    con.query(`UPDATE tb_usuario_M3 SET ? WHERE id = ?`, [dataBody, id], (err, data, fields) => {
      if (err) {
        console.log('ERROR: ' + err);
        res.status(500).send('Error al actualizar el usuario');
      } else res.status(200).send(data);
    });
});

appUsuario.delete('/', (req, res) => {
    const { id } = req.body;
    con.query(`DELETE FROM tb_usuario_M3 WHERE id = ?`, id, (err, data, fields) => {
        if(err) console.log('ERROR: ' + err);
        res.status(200).send('Usuario eliminado correctamente')
    });
});



export default appUsuario;