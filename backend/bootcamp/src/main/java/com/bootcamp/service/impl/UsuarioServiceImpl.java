package com.bootcamp.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.entity.Usuario;
import com.bootcamp.repository.UsuarioRepository;
import com.bootcamp.service.IUsuarioService;

@Service
public class UsuarioServiceImpl implements IUsuarioService {
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Override
	public Usuario save(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	@Override
	public Usuario findById(Long idUsuario) {
		return usuarioRepository.findById(idUsuario).orElse(null);
	}

	@Override
	public List<Usuario> findAll() {
		return usuarioRepository.findAll();
	}

	@Override
	public Usuario consultarUsuarioLogin(String usuario, String contrasena) {
		return usuarioRepository.consultarUsuarioLogin(usuario, contrasena);
	}

	@Override
	public List<Map<String, String>> consultarUsuarios() {
		return usuarioRepository.consultarUsuarios();
	}

}
