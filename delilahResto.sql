-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema delilahResto
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema delilahResto
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `delilahResto` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `delilahResto` ;

-- -----------------------------------------------------
-- Table `delilahResto`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilahResto`.`Usuarios` (
  `idusuarios` INT NOT NULL AUTO_INCREMENT,
  `nombreApellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefono` INT NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  `contraseña` VARCHAR(8) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  `numeroDocumento` INT NOT NULL,
  PRIMARY KEY (`idusuarios`),
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC) VISIBLE,
  UNIQUE INDEX `numeroDocumento_UNIQUE` (`numeroDocumento` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `delilahResto`.`Pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilahResto`.`Pedidos` (
  `idpedidos` INT NOT NULL AUTO_INCREMENT,
  `fechaHora` DATETIME NOT NULL,
  `estadoOrden` VARCHAR(45) NOT NULL,
  `tipoPago` VARCHAR(45) NOT NULL,
  `valorTotal` INT NOT NULL,
  `Usuarios_idusuarios` INT NOT NULL,
  PRIMARY KEY (`idpedidos`, `Usuarios_idusuarios`),
  INDEX `fk_Pedidos_Usuarios1_idx` (`Usuarios_idusuarios` ASC) VISIBLE,
  CONSTRAINT `fk_Pedidos_Usuarios1`
    FOREIGN KEY (`Usuarios_idusuarios`)
    REFERENCES `delilahResto`.`Usuarios` (`idusuarios`))
ENGINE = InnoDB
AUTO_INCREMENT = 27
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `delilahResto`.`Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilahResto`.`Productos` (
  `idProductos` INT NOT NULL AUTO_INCREMENT,
  `nombrePlato` VARCHAR(45) NOT NULL,
  `precio` INT NOT NULL,
  `descripcion` TEXT NOT NULL,
  PRIMARY KEY (`idProductos`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `delilahResto`.`Pedidos_has_Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilahResto`.`Pedidos_has_Productos` (
  `Productos_idProductos` INT NOT NULL,
  `Pedidos_idpedidos` INT NOT NULL,
  PRIMARY KEY (`Productos_idProductos`, `Pedidos_idpedidos`),
  INDEX `fk_Pedidos_has_Productos_Productos1_idx` (`Productos_idProductos` ASC) VISIBLE,
  INDEX `fk_Pedidos_has_Productos_Pedidos1_idx` (`Pedidos_idpedidos` ASC) VISIBLE,
  CONSTRAINT `fk_Pedidos_has_Productos_Pedidos1`
    FOREIGN KEY (`Pedidos_idpedidos`)
    REFERENCES `delilahResto`.`Pedidos` (`idpedidos`),
  CONSTRAINT `fk_Pedidos_has_Productos_Productos1`
    FOREIGN KEY (`Productos_idProductos`)
    REFERENCES `delilahResto`.`Productos` (`idProductos`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
