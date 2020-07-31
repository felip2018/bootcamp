package com.bootcamp.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.bootcamp.entity.Tip;

public interface ITipService {
	
	Tip save(Tip tip);
	
	Tip findById(Long idTip);
	
	List<Tip> findAll();
	
	Map<String,String> guardarTip(Long idUsuario, String titulo, String descripcion, MultipartFile imagen);
}