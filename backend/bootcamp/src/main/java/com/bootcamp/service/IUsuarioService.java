package com.bootcamp.service;

import java.util.List;
import java.util.Map;

import com.bootcamp.entity.Usuario;

public interface IUsuarioService {
	
	Usuario save(Usuario usuario);
	
	Usuario findById(Long idUsuario);
	
	List<Usuario> findAll();
	
	Usuario consultarUsuarioLogin(String usuario, String contrasena);
	
	List<Map<String,String>> consultarUsuarios();
}
