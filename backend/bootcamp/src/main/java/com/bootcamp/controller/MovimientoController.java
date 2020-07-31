package com.bootcamp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.entity.Movimiento;
import com.bootcamp.service.IMovimientoService;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class MovimientoController {
	
	@Autowired
	IMovimientoService movimientoService;
	
	@PostMapping("/registrar-movimiento")
	public ResponseEntity<Movimiento> registrarMovimiento(@RequestBody Movimiento movimiento){
		return ResponseEntity.ok().body(movimientoService.save(movimiento));
	}
		
	
	@GetMapping("/consultar-movimientos-usuario/{idUsuario}")
	public ResponseEntity<List<Movimiento>> consultaMovimientosUsuario(@PathVariable Long idUsuario){
		return ResponseEntity.ok().body(movimientoService.consultarMovimientosUsuario(idUsuario));
	}
}
