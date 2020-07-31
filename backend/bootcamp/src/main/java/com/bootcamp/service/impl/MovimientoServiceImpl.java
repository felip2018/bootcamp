package com.bootcamp.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.entity.Movimiento;
import com.bootcamp.repository.MovimientoRepository;
import com.bootcamp.service.IMovimientoService;

@Service
public class MovimientoServiceImpl implements IMovimientoService {

	@Autowired
	MovimientoRepository movimientoRepository;
	
	@Override
	public Movimiento save(Movimiento movimiento) {
		return movimientoRepository.save(movimiento);
	}

	@Override
	public Movimiento findById(Long idMovimiento) {
		return movimientoRepository.findById(idMovimiento).orElse(null);
	}

	@Override
	public List<Movimiento> findAll() {
		return movimientoRepository.findAll();
	}

	@Override
	public List<Movimiento> consultarMovimientosUsuario(Long idUsuario) {
		return movimientoRepository.consultarMovimientosUsuario(idUsuario);
	}

}
