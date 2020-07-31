package com.bootcamp.service.impl;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bootcamp.entity.Tip;
import com.bootcamp.repository.TipRepository;
import com.bootcamp.service.ITipService;
import com.bootcamp.util.Utilities;

@Service
public class TipServiceImpl implements ITipService {
	
	@Autowired
	TipRepository tipRepository;
	
	private Utilities util = new Utilities();
	
	@Override
	public Tip save(Tip tip) {
		return tipRepository.save(tip);
	}

	@Override
	public Tip findById(Long idTip) {
		return tipRepository.findById(idTip).orElse(null);
	}

	@Override
	public List<Tip> findAll() {
		return tipRepository.findAll();
	}

	@Override
	public Map<String, String> guardarTip(Long idUsuario, String titulo, String descripcion, MultipartFile imagen) {
		
		DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy_HH-mm-ss-SSS");  
		Map<String,String> response = new HashMap<>();
		
		String folderTips = "C:/xampp/htdocs/financial/frontend/img/tips/";
		String contentType = imagen.getContentType();
		
		if(util.contentTypeValidation(contentType)) {
			String fileName = LocalDateTime.now().format(format)+"."+util.getExtension(contentType);
			try {
				
				byte[] bytes = imagen.getBytes();
				
				Tip tip = new Tip();
				tip.setIdUsuario(idUsuario);
				tip.setTitulo(titulo);
				tip.setDescripcion(descripcion);
				tip.setImagen("img/tips/"+fileName);
				
				tipRepository.save(tip);
				
				util.uploadImage(bytes, folderTips, fileName);
				
				response.put("status", "success");
				response.put("message", "Se ha registrado el tip correctamente!");
				
			} catch (IOException e) {
				response.put("status", "error");
				response.put("message", e.getMessage());
			}
		}
		
		return response;
	}

}
