package com.bootcamp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bootcamp.entity.Tip;
import com.bootcamp.service.ITipService;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class TipController {
	
	@Autowired
	ITipService tipService;
	
	@PostMapping("/registrar-tip")
	public ResponseEntity<Map<String,String>> registrarTip(@RequestParam("idUsuario") Long idUsuario,
			@RequestParam("titulo") String titulo,
			@RequestParam("descripcion") String descripcion,
			@RequestParam("imagen") MultipartFile imagen){
		return ResponseEntity.ok().body(tipService.guardarTip(idUsuario, titulo, descripcion, imagen));
	}
	
	@GetMapping("/consultar-tips")
	public ResponseEntity<List<Tip>> consultarTips(){
		return ResponseEntity.ok().body(tipService.findAll());
	}
}
