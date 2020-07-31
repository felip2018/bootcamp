jQuery(".btn-login").click(function () {

	var usuario = jQuery("#usuario");
	var contrasena = jQuery("#contrasena");

	if (usuario.val() != "") {

		if (userRegEx.test(usuario.val())) {

			if (contrasena.val() != "") {

				jQuery.ajax({
					type:"post",
					url:"http://localhost:7000/login-usuario",
					data:{
						usuario: usuario.val(),
						contrasena: contrasena.val()
					},
					success:function (response) {
						if (response != "") {
							
							let perfil = (response.idRol==1)?"admin":"client"

							localStorage.setItem("isLogin", "SI")
							localStorage.setItem("apellidos", response.apellidos)
							localStorage.setItem("idRol", response.idRol)
							localStorage.setItem("perfil", perfil)
							localStorage.setItem("idTipoDocumento", response.idTipoDocumento)
							localStorage.setItem("idUsuario", response.idUsuario)
							localStorage.setItem("nombres", response.nombres)
							localStorage.setItem("numeroDocumento", response.numeroDocumento)
							localStorage.setItem("usuario", response.usuario)

							window.location.href = "app.html";

						}else{
							jQuery('#myModal').modal('show')
							jQuery(".modal-title").html('Advertencia!');
							jQuery(".modal-body").html('<div class="alert alert-danger"><p>El usuario ingresado no esta registrado en el sistema, por favor verifique!</p></div>');
							jQuery(".modal-footer").html('<button type="button" class="btn btn-primary btn-accept" data-dismiss="modal">Aceptar</button>');
							jQuery('.btn-accept').click(function () {
								contrasena.focus();
							});
						}
					}
				})

			}else{
				jQuery('#myModal').modal('show')
				jQuery(".modal-title").html('Advertencia!');
				jQuery(".modal-body").html('<div class="alert alert-warning"><p>Ingrese la contraseña para iniciar sesión.</p></div>');
				jQuery(".modal-footer").html('<button type="button" class="btn btn-primary btn-accept" data-dismiss="modal">Aceptar</button>');
				jQuery('.btn-accept').click(function () {
					contrasena.focus();
				});
			}

		}else{
			
			jQuery('#myModal').modal({backdrop: 'static', keyboard: false})
			jQuery(".modal-title").html('Advertencia!');
			jQuery(".modal-body").html('<div class="alert alert-danger"><p>El <b>usuario</b> ingresado no cuenta con una estructura válida, por favor verifique.</p></div>');
			jQuery(".modal-footer").html('<button type="button" class="btn btn-primary btn-accept" data-dismiss="modal">Aceptar</button>');

			jQuery('.btn-accept').click(function () {
				usuario.focus();
			});
		}


	}else{
		jQuery('#myModal').modal('show')
		jQuery(".modal-title").html('Advertencia!');
		jQuery(".modal-body").html('<div class="alert alert-warning"><p>Ingrese el usuario para iniciar sesión.</p></div>');
		jQuery(".modal-footer").html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Aceptar</button>');
	}

})


function cerrarSesion () {

	jQuery('#myModal').modal('show')
	jQuery(".modal-title").html('Cerrar sesión');
	jQuery(".modal-body").html('<p>¿Esta seguro de cerrar la sesión?</p>');

	jQuery(".modal-footer").html('<button type="button" class="btn btn-secondary" data-dismiss="modal">No</button><button type="button" class="btn btn-primary btn-accept">Sí, cerrar sesión</button>');

	jQuery(".btn-accept").click(function () {

		localStorage.setItem("isLogin", "NO")
		localStorage.removeItem("apellidos")
		localStorage.removeItem("idRol")
		localStorage.removeItem("perfil")
		localStorage.removeItem("idTipoDocumento")
		localStorage.removeItem("idUsuario")
		localStorage.removeItem("nombres")
		localStorage.removeItem("numeroDocumento")
		localStorage.removeItem("usuario")

		window.location.href = "login.html";
	})

}

function cargarMenuNavegacion() {

	if(localStorage.getItem("isLogin") == "SI"){

		let perfil = localStorage.getItem("perfil");

		jQuery(".table_menu").html('');

		jQuery.ajax({
	        dataType: 'json',
	        url: jsonMenuURL,
	        success: function(data) 
	        {
	        	let folder = data[perfil].folder;
	        	
	        	jQuery.each(data[perfil].options,function (key,value) {
	        		
	        		let view = value.view;
	        		let label = value.label;
	        		let icon = value.icon;

	        		jQuery(".table_menu").append('<tr>'+
	                    '<td>'+
	                      '<button class="btn btn-secondary btn-block" onclick=loadPage("'+perfil+'","'+view+'")><span class="'+icon+'"></span> <label>'+label+'</label></button>'+
	                    '</td>'+
	                  '</tr>')
	        	});

	        	jQuery(".table_menu").append('<tr>'+
	            	'<td>'+
	              		'<button class="btn btn-primary btn-block" onclick=cerrarSesion()><i class="fas fa-sign-out-alt"></i> <label>Salir</label></button>'+
	            	'</td>'+
	          	'</tr>')

	          	loadPage(perfil,"inicio");
	        },
	        error:function (error) {
	        	console.log("Ha ocurrido un error al leer el archivo\n");
	        	console.log(error);
	        }
	    });
	}else{
		window.location.href = "login.html";
	}
}

function mostrarInformacionUsuario() {
	jQuery("#nombre").html(localStorage.getItem("nombres")+' '+localStorage.getItem("apellidos"));
	jQuery("#numeroDocumento").html(localStorage.getItem("numeroDocumento"));
	jQuery("#usuario").html(localStorage.getItem("usuario"));
}


function mostrarTips() {

	jQuery('#myModal').modal('show')
	jQuery(".modal-title").html('Recomendaciones');
	jQuery(".modal-body").html('<p>Sección de recomendaciones:</p>');
	jQuery(".modal-footer").html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Aceptar</button>');

	jQuery.ajax({
		type:"GET",
		url: host+"consultar-tips",
		success:function (response) {
			jQuery.each(response, function (key,value) {
				jQuery(".modal-body").append('<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+
						'<table class="table table-striped">'+
							'<tr>'+
								'<td style="width:20%;">'+
									'<img src="'+value.imagen+'" alt="tip" style="width:100%;">'+
								'</td>'+
								'<td style="width:80%;">'+
									'<strong>'+value.titulo+'</strong>'+
									'<p class="card-text">'+value.descripcion+'</p>'+
								'</td>'+
							'</tr>'+
						'</table>'+
					'</div>')
			})
		}
	})
}