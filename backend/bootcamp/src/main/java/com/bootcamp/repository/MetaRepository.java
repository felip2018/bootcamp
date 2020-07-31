package com.bootcamp.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bootcamp.entity.Meta;

public interface MetaRepository extends JpaRepository<Meta, Long> {

	@Query(value="SELECT "
			+ "m.id_meta,"
			+ "u.id_usuario,"
			+ "u.nombres,"
			+ "u.apellidos,"
			+ "m.nombre,"
			+ "m.valor,"
			+ "m.fecha_limite,"
			+ "m.descripcion,"
			+ "m.estado "
			+ "FROM meta m "
			+ "INNER JOIN usuario u ON u.id_usuario = m.id_usuario "
			+ "WHERE m.estado = :estado "
			+ "ORDER BY m.id_estado DESC",
			nativeQuery=true)
	List<Map<String, String>> consultarMetasPorEstado(@Param("estado") String estado);
	
	@Query(value="SELECT "
			+ "m.id_meta,"
			+ "u.id_usuario,"
			+ "u.nombres,"
			+ "u.apellidos,"
			+ "m.nombre,"
			+ "m.valor,"
			+ "m.fecha_limite,"
			+ "m.descripcion,"
			+ "m.estado "
			+ "FROM meta m "
			+ "INNER JOIN usuario u ON u.id_usuario = m.id_usuario "
			+ "WHERE m.id_usuario = :idUsuario "
			+ "ORDER BY m.id_meta DESC",
			nativeQuery=true)
	List<Map<String, String>> consultarMetasPorUsuario(@Param("idUsuario") Long idUsuario);
	
}
