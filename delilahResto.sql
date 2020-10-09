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
CREATE SCHEMA IF NOT EXISTS `delilahResto` DEFAULT CHARACTER SET utf8 ;
USE `delilahResto` ;

-- -----------------------------------------------------
-- Table `delilahResto`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilahResto`.`pedidos` (
  `idpedidos` INT NOT NULL,
  `idusuarios` INT NULL,
  `fechaHora` DATETIME NULL,
  `estadoOrden` VARCHAR(45) NULL,
  `tipoPago` VARCHAR(45) NULL,
  `valorTotal` VARCHAR(45) NULL,
  `esCarritoCompras` VARCHAR(45) NULL,
  PRIMARY KEY (`idpedidos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `delilahResto`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilahResto`.`usuarios` (
  `idusuarios` INT NOT NULL,
  `nombreApellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefono` INT NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  `contrasena` VARCHAR(45) NOT NULL,
  `rol` VARCHAR(45) NOT NULL,
  `pedidos_idpedidos` INT NOT NULL,
  PRIMARY KEY (`idusuarios`),
  INDEX `fk_usuarios_pedidos_idx` (`pedidos_idpedidos` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_pedidos`
    FOREIGN KEY (`pedidos_idpedidos`)
    REFERENCES `delilahResto`.`pedidos` (`idpedidos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `delilahResto`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilahResto`.`productos` (
  `idproductos` INT NOT NULL,
  `nombrePlato` VARCHAR(45) NOT NULL,
  `precio` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idproductos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `delilahResto`.`pedidos_has_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilahResto`.`pedidos_has_productos` (
  `pedidos_idpedidos` INT NOT NULL,
  `productos_idproductos` INT NOT NULL,
  PRIMARY KEY (`pedidos_idpedidos`, `productos_idproductos`),
  INDEX `fk_pedidos_has_productos_productos1_idx` (`productos_idproductos` ASC) VISIBLE,
  INDEX `fk_pedidos_has_productos_pedidos1_idx` (`pedidos_idpedidos` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_has_productos_pedidos1`
    FOREIGN KEY (`pedidos_idpedidos`)
    REFERENCES `delilahResto`.`pedidos` (`idpedidos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_has_productos_productos1`
    FOREIGN KEY (`productos_idproductos`)
    REFERENCES `delilahResto`.`productos` (`idproductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
