package com.bootcamp.service;

import java.util.List;

import com.bootcamp.entity.Movimiento;

public interface IMovimientoService {
	
	Movimiento save(Movimiento movimiento);
	
	Movimiento findById(Long idMovimiento);
	
	List<Movimiento> findAll();
	
	List<Movimiento> consultarMovimientosUsuario(Long idUsuario);
}	
