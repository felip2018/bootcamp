package com.bootcamp.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.entity.Meta;
import com.bootcamp.repository.MetaRepository;
import com.bootcamp.service.IMetaService;

@Service
public class MetaServiceImpl implements IMetaService {

	@Autowired
	MetaRepository metaRepository;
	
	@Override
	public Meta save(Meta meta) {
		return metaRepository.save(meta);
	}

	@Override
	public Meta findById(Long idMeta) {
		return metaRepository.findById(idMeta).orElse(null);
	}

	@Override
	public List<Meta> findAll() {
		return metaRepository.findAll();
	}

	@Override
	public List<Map<String, String>> consultarMetasPorEstado(String estado) {
		return metaRepository.consultarMetasPorEstado(estado);
	}

	@Override
	public List<Map<String, String>> consultarMetasPorUsuario(Long idUsuario) {
		return metaRepository.consultarMetasPorUsuario(idUsuario);
	}
	
}
