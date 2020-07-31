package com.bootcamp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bootcamp.entity.Movimiento;

public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {
	
	@Query("SELECT m FROM Movimiento m WHERE m.idUsuario = :idUsuario")
	List<Movimiento> consultarMovimientosUsuario(@Param("idUsuario") Long idUsuario);
	
}
