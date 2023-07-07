CREATE DATABASE db_M3_prueba_MYSQL2_node_CamiloPaez;

USE db_M3_prueba_MYSQL2_node_CamiloPaez;

CREATE TABLE tb_usuario_M3(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    edad INTEGER(3) NOT NULL
);