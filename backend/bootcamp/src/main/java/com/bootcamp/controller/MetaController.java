package com.bootcamp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.entity.Meta;
import com.bootcamp.service.IMetaService;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class MetaController {
	
	@Autowired
	IMetaService metaService;
	
	@PostMapping("/registrar-meta")
	public ResponseEntity<Meta> registrarMeta(@RequestBody Meta meta) {
		return ResponseEntity.ok().body(metaService.save(meta));
	}
	
	@GetMapping("/consultar-metas-estado/{estado}")
	public ResponseEntity<List<Map<String,String>>> consultarMetasPorEstado(@PathVariable String estado){
		return ResponseEntity.ok().body(metaService.consultarMetasPorEstado(estado));
	}
	
	@GetMapping("/consultar-metas-usuario/{idUsuario}")
	public ResponseEntity<List<Map<String,String>>> consultarMetasPorUsuario(@PathVariable Long idUsuario){
		return ResponseEntity.ok().body(metaService.consultarMetasPorUsuario(idUsuario));
	}
}
