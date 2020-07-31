function cargarUsuarios() {
	jQuery("#listadoUsuarios").html('');
	jQuery.ajax({
		type:"GET",
		url: host+"consultar-usuarios",
		success:function (response) {
			jQuery.each(response, function (key,value) {

				jQuery("#listadoUsuarios").append('<tr>'+
						'<td>'+value.id_usuario+'</td>'+
						'<td>'+value.nombre+'</td>'+
						'<td>'+value.identificacion+'</td>'+
						'<td>'+value.rol+'</td>'+
						'<td>'+
							'<button class="btn btn-info btn-action" title="REGISTRAR META" onclick=formularioMeta('+value.id_usuario+')><span class="fa fa-bullseye"></span></button>'+
							'<button class="btn btn-info btn-action" title="ESTADISTICAS" onclick=verComportamientoUsuario('+value.id_usuario+',"'+value.usuario+'")><span class="fa fa-chart-bar"></span></button>'+
						'</td>'+
					'</tr>')
			})
		}
	})
}

function formularioUsuario() {
	
	jQuery('#myModal').modal('show')
	jQuery(".modal-title").html('Nuevo usuario');
	jQuery(".modal-body").html('<div class="row">'+
			'<div class="col-12"><p>Formulario de registro de usuarios</p></div>'+
			'<div class="col-12 form-group">'+
				'<input type="text" class="form-control" id="nombres" placeholder="Nombres">'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<input type="text" class="form-control" id="apellidos" placeholder="Apellidos">'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<select class="form-control" id="id_tipo_documento">'+
					'<option value="1">CC</option>'+
					'<option value="2">CEX</option>'+
					'<option value="3">PAS</option>'+
					'<option value="4">LIC</option>'+
				'</select>'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<input type="number" min="0" class="form-control" id="numero_documento" placeholder="Número de documento">'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<input type="text" class="form-control" id="usuario" placeholder="Usuario">'+
			'</div>'+
			'<div class="col-12 alerta">'+
			'</div>'+
		'</div>');
	jQuery(".modal-footer").html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button><button type="button" class="btn btn-primary btn-save"><span class="fa fa-save"></span> Salvar Usuario</button>');

	jQuery(".btn-save").click(function () {
		let nombres = jQuery("#nombres");
		let apellidos = jQuery("#apellidos");
		let id_tipo_documento = jQuery("#id_tipo_documento");
		let numero_documento  = jQuery("#numero_documento");
		let usuario = jQuery("#usuario");

		let campos = [nombres,apellidos,numero_documento,usuario];
		let erroresFormato = "<ul>";
		let numErroresFormato = 0;
		let j = 4;

		jQuery(".alerta").html('');
		
		for (var i = 0; i < campos.length; i++) {
			
			if (campos[i].val() == "") {
				jQuery(".alerta").html('<div class="alert alert-warning"><p>Por favor diligencie la información solicitada en el campo <strong>'+campos[i].attr("placeholder")+'</strong> para continuar con el registro del usuario.</p></div>')
				campos[i].focus();
				break;
			}else{
				j--;
			}

		}

		if (j == 0) {
			
			//if (userRegEx.test(usuario.val())) {
			if (! nameRegEx.test(nombres.val())) {
				numErroresFormato++
				erroresFormato += '<li>El valor ingresado en el campo <strong>Nombres</strong> no tiene un formato válido</li>';
			}

			if (! nameRegEx.test(apellidos.val())) {
				numErroresFormato++
				erroresFormato += '<li>El valor ingresado en el campo <strong>Apellidos</strong> no tiene un formato válido</li>';
			}

			if (! identificationNumberRegEx.test(numero_documento.val())) {
				numErroresFormato++
				erroresFormato += '<li>El valor ingresado en el campo <strong>Número de documento</strong> no tiene un formato válido</li>';
			}

			if (! userRegEx.test(usuario.val())) {
				numErroresFormato++
				erroresFormato += '<li>El valor ingresado en el campo <strong>Usuario</strong> no tiene un formato válido</li>';
			}			

			if (numErroresFormato == 0) {
				// Procedemos con el registro del usuario en el sistema
				console.log("Registro de usuario!");

				let obj = {
					"apellidos" : apellidos.val(),
					"contrasena" : numero_documento.val(),
					"idRol" : 2,
					"idTipoDocumento" : id_tipo_documento.val(),
					"nombres" : nombres.val(),
					"numeroDocumento" : numero_documento.val(),
					"usuario" : usuario.val()
				};

				let request = JSON.stringify(obj)

				jQuery.ajax({
					headers: {          
					    Accept: "application/json;",
					    "Content-Type": "application/json;"   
					},
					type:"POST",
					url: host+"registrar-usuario",
					data: request,
					success:function (response) {
						
						// Registro exitoso
						jQuery(".modal-body").html('<div class="alert alert-success"><p>El registro del usuario se ha completado con éxito.</p></div>');
						jQuery(".modal-footer").html('<button type="button" class="btn btn-primary btn-accept" data-dismiss="modal">Aceptar</button>');
						jQuery('.btn-accept').click(function () {
							loadPage('admin','usuarios');
						});
						
					},
					error:function (err) {
						jQuery(".alerta").html('<div class="alert alert-danger">'+
							'<p>Ha ocurrido un error:</p>'+
							'<p><strong>Status '+err.responseJSON.status+'</strong>; '+err.responseJSON.error+'</p>'+
						'</div>');
					}
				})
				
			}else{
				erroresFormato += "</ul>";
				jQuery(".alerta").html('<div class="alert alert-warning">'+
					'<p>Se han encontrado varios errores de formato:</p>'+
					erroresFormato+
					'</div>');
			}
		}
	})

}

function cargarTips() {
	jQuery(".listadoTips").html('');
	jQuery.ajax({
		type:"GET",
		url: host+"consultar-tips",
		success:function (response) {
			jQuery.each(response, function (key,value) {
				jQuery(".listadoTips").append('<div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">'+
						'<div class="card">'+
						  	'<img src="'+value.imagen+'" class="card-img-top" alt="male">'+
						  	'<div class="card-body">'+
						    	'<h5 class="card-title">'+value.titulo+'</h5>'+
						    	'<p class="card-text">'+value.descripcion+'</p>'+
						  	'</div>'+
						'</div>'+
					'</div>')
			})
		}
	})
}

function formularioTip() {
	
	jQuery('#myModal').modal('show')
	jQuery(".modal-title").html('Nuevo tip');
	jQuery(".modal-body").html('<div class="row">'+
			'<div class="col-12"><p>Formulario de registro de recomendaciones a clientes</p></div>'+
			'<form id="formTip" method="POST">'+
			'<div class="col-12 form-group">'+
				'<input type="hidden" class="form-control" id="idUsuario" name="idUsuario" value="'+localStorage.getItem("idUsuario")+'">'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<input type="text" class="form-control" id="titulo" name="titulo" placeholder="Titulo">'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<textarea class="form-control" rows="5" id="descripcion" name="descripcion" placeholder="Descripcion"></textarea>'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<input type="file" class="form-control" id="imagen" name="imagen">'+
			'</div>'+
			'</form>'+
			'<div class="col-12 alerta">'+
			'</div>'+
		'</div>');
	jQuery(".modal-footer").html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button><button type="button" class="btn btn-primary btn-save"><span class="fa fa-save"></span> Salvar Tip</button>');

	jQuery(".btn-save").click(function () {
		let titulo = jQuery("#titulo");
		let descripcion = jQuery("#descricion");

		let campos = [titulo,descripcion];
		let erroresFormato = "<ul>";
		let numErroresFormato = 0;
		let j = 2;

		jQuery(".alerta").html('');
		
		for (var i = 0; i < campos.length; i++) {
			
			if (campos[i].val() == "") {
				jQuery(".alerta").html('<div class="alert alert-warning"><p>Por favor diligencie la información solicitada en el campo <strong>'+campos[i].attr("placeholder")+'</strong> para continuar con el registro del tip.</p></div>')
				campos[i].focus();
				break;
			}else{
				j--;
			}

		}

		if (j == 0) {
			
			if (! nameRegEx.test(titulo.val())) {
				numErroresFormato++
				erroresFormato += '<li>El valor ingresado en el campo <strong>Título</strong> no tiene un formato válido</li>';
			}

			if (! nameRegEx.test(descripcion.val())) {
				numErroresFormato++
				erroresFormato += '<li>El valor ingresado en el campo <strong>Descripcion</strong> no tiene un formato válido</li>';
			}			

			if (numErroresFormato == 0) {
				// Procedemos con el registro del usuario en el sistema
				console.log("Registro de tip!");

				var form 		= document.getElementById('formTip');
				var formData 	= new FormData(form);

				jQuery.ajax({
					type:"POST",
					url: host+"registrar-tip",
					data: formData,
					contentType:false,
					processData:false,
					success:function (response) {
						
						// Registro exitoso
						jQuery(".modal-body").html('<div class="alert alert-success"><p>El registro del tip se ha completado con éxito.</p></div>');
						jQuery(".modal-footer").html('<button type="button" class="btn btn-primary btn-accept" data-dismiss="modal">Aceptar</button>');
						jQuery('.btn-accept').click(function () {
							loadPage('admin','tips');
						});
						
					},
					error:function (err) {
						jQuery(".alerta").html('<div class="alert alert-danger">'+
							'<p>Ha ocurrido un error:</p>'+
							'<p><strong>Status '+err.responseJSON.status+'</strong>; '+err.responseJSON.error+'</p>'+
						'</div>');
					}
				})
				
			}else{
				erroresFormato += "</ul>";
				jQuery(".alerta").html('<div class="alert alert-warning">'+
					'<p>Se han encontrado varios errores de formato:</p>'+
					erroresFormato+
					'</div>');
			}
		}
	})

}

function verComportamientoUsuario(idUsuario,usuario) {
	//console.log("Id Usuario: "+idUsuario+", Usuario: "+usuario);
	loadPage('admin','estadisticas_usuario');

	localStorage.setItem("idUsuarioEstadistica",idUsuario);
	localStorage.setItem("usuarioEstadistica",usuario);
}

function cargarInformacionUsuarioEstadisticas() {
	jQuery("#nickname").html(localStorage.getItem("usuarioEstadistica"));
}

function cargarGraficaMetasFinancieras() {

	
}

function cargarGraficaMovimientos() {

	let ingresos = {
		name: 'Ingresos',
		data:[]
	};

	let egresos = {
		name: 'Egresos',
		data:[]
	};

	jQuery.ajax({
		type:"GET",
		url: host+"consultar-movimientos-usuario/"+localStorage.getItem("idUsuarioEstadistica"),
		success: function (response) {
			console.log(response);
			jQuery.each(response,function (key,value) {
				if (value.tipo == "INGRESO") {
					ingresos.data.push(value.valor)
				}else{
					egresos.data.push(value.valor)
				}
			})

			Highcharts.chart('movimientosFinancieros', {

			    title: {
			        text: 'Ingresos vs Egresos'
			    },

			    yAxis: {
			        title: {
			            text: 'Movimientos'
			        }
			    },	

			    legend: {
			        layout: 'vertical',
			        align: 'right',
			        verticalAlign: 'middle'
			    },

			    series: [
				    ingresos,
				    egresos
			    ],

			    responsive: {
			        rules: [{
			            condition: {
			                maxWidth: 500
			            },
			            chartOptions: {
			                legend: {
			                    layout: 'horizontal',
			                    align: 'center',
			                    verticalAlign: 'bottom'
			                }
			            }
			        }]
			    }

			});

			Highcharts.chart('curvaAhorro', {

			    title: {
			        text: 'Curva de Ahorro'
			    },

			    yAxis: {
			        title: {
			            text: 'Ahorro'
			        }
			    },	

			    legend: {
			        layout: 'vertical',
			        align: 'right',
			        verticalAlign: 'middle'
			    },

			    series: [
				    ingresos
			    ],

			    responsive: {
			        rules: [{
			            condition: {
			                maxWidth: 500
			            },
			            chartOptions: {
			                legend: {
			                    layout: 'horizontal',
			                    align: 'center',
			                    verticalAlign: 'bottom'
			                }
			            }
			        }]
			    }

			});
		},
		error: function (err) {
			console.log(err.responseJSON.status);
		}
	})

	
}

/*function cargarGraficaCurvaAhorro(){
	cargarGraficaMovimientos();
}*/