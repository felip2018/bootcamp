package com.bootcamp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.entity.Usuario;
import com.bootcamp.service.IUsuarioService;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class UsuarioController {
	
	@Autowired
	IUsuarioService usuarioService;
	
	@PostMapping("/registrar-usuario")
	public ResponseEntity<Usuario> registrarUsuario(@RequestBody Usuario usuario){
		return ResponseEntity.ok().body(usuarioService.save(usuario));
	}
	
	@PostMapping("/login-usuario")
	public ResponseEntity<Usuario> loginUsuario(@RequestParam("usuario") String usuario,
			@RequestParam("contrasena") String contrasena){
		return ResponseEntity.ok().body(usuarioService.consultarUsuarioLogin(usuario, contrasena));
	}
	
	@GetMapping("/consultar-usuarios")
	public ResponseEntity<List<Map<String,String>>> consultarUsuarios(){
		return ResponseEntity.ok().body(usuarioService.consultarUsuarios());
	}
}
