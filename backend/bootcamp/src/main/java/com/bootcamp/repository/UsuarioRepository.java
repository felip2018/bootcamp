package com.bootcamp.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bootcamp.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	
	@Query("SELECT u FROM Usuario u WHERE u.usuario = :usuario AND u.contrasena = :contrasena")
	Usuario consultarUsuarioLogin(@Param("usuario") String usuario, @Param("contrasena") String contrasena);
	
	@Query(value="SELECT "
			+ "u.id_usuario,"
			+ "u.id_rol,"
			+ "r.nombre as rol,"
			+ "u.id_tipo_documento,"
			+ "td.nombre as tipo_documento,"
			+ "u.numero_documento,"
			+ "CONCAT(td.abreviacion,' - ',u.numero_documento) as identificacion,"
			+ "u.nombres,"
			+ "u.apellidos,"
			+ "CONCAT(u.nombres,' ',u.apellidos) as nombre,"
			+ "u.usuario "
			+ "FROM usuario u "
			+ "INNER JOIN rol r ON r.id_rol = u.id_rol "
			+ "INNER JOIN tipo_documento td ON td.id_tipo_documento = u.id_tipo_documento", nativeQuery = true)
	List<Map<String,String>> consultarUsuarios();
}
