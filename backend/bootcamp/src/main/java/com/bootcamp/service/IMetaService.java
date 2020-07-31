package com.bootcamp.service;

import java.util.List;
import java.util.Map;

import com.bootcamp.entity.Meta;

public interface IMetaService {
	
	Meta save(Meta meta);
	
	Meta findById(Long idMeta);
	
	List<Meta> findAll();
	
	List<Map<String,String>> consultarMetasPorEstado(String estado);
	List<Map<String,String>> consultarMetasPorUsuario(Long idUsuario);
}
