function cargarMetas() {
	jQuery("#listadoMetas").html('');
	let idUsuario = localStorage.getItem("idUsuario");
	jQuery.ajax({
		type:"GET",
		url: host+"consultar-metas-usuario/"+idUsuario,
		success:function (response) {
			jQuery.each(response, function (key,value) {
				jQuery("#listadoMetas").append('<tr>'+
						'<td>'+value.id_meta+'</td>'+
						'<td>'+value.nombre+'</td>'+
						'<td>$'+value.valor+'</td>'+
						'<td>'+value.fecha_limite+'</td>'+
						'<td>'+value.descripcion+'</td>'+
						'<td>'+value.estado+'</td>'+
					'</tr>')
			})
		}
	})
}

function formularioMeta(idUsuario) {
	jQuery('#myModal').modal('show')
	jQuery(".modal-title").html('Nueva meta');
	jQuery(".modal-body").html('<div class="row">'+
			'<div class="col-12"><p>Formulario de registro de metas</p></div>'+
			'<div class="col-12 form-group">'+
				'<input type="hidden" class="form-control" id="idUsuario" name="idUsuario" value="'+idUsuario+'">'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre de la meta">'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<input type="number" min="0" class="form-control" id="valor" name="valor" placeholder="Valor">'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<input type="date" class="form-control" id="fecha_limite" name="fecha_limite">'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<textarea class="form-control" rows="5" id="descripcion" name="descripcion" placeholder="Descripcion"></textarea>'+
			'</div>'+
			'<div class="col-12 alerta">'+
			'</div>'+
		'</div>');
	jQuery(".modal-footer").html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button><button type="button" class="btn btn-primary btn-save"><span class="fa fa-save"></span> Salvar Meta</button>');

	jQuery(".btn-save").click(function () {
		let nombre = jQuery("#nombre");
		let valor = jQuery("#valor");
		let fecha_limite = jQuery("#fecha_limite");
		let descripcion = jQuery("#descripcion");

		let campos = [nombre,valor,fecha_limite,descripcion];
		let erroresFormato = "<ul>";
		let numErroresFormato = 0;
		let j = 4;

		jQuery(".alerta").html('');
		
		for (var i = 0; i < campos.length; i++) {
			
			if (campos[i].val() == "") {
				jQuery(".alerta").html('<div class="alert alert-warning"><p>Por favor diligencie la información solicitada en el campo <strong>'+campos[i].attr("placeholder")+'</strong> para continuar con el registro de la meta.</p></div>')
				campos[i].focus();
				break;
			}else{
				j--;
			}

		}

		if (j == 0) {
			
			if (! nameRegEx.test(nombre.val())) {
				numErroresFormato++
				erroresFormato += '<li>El valor ingresado en el campo <strong>Nombre</strong> no tiene un formato válido</li>';
			}

			if (! valueRegEx.test(valor.val())) {
				numErroresFormato++
				erroresFormato += '<li>El valor ingresado en el campo <strong>Descripcion</strong> no tiene un formato válido</li>';
			}

			if (! nameRegEx.test(descripcion.val())) {
				numErroresFormato++
				erroresFormato += '<li>El valor ingresado en el campo <strong>Descripcion</strong> no tiene un formato válido</li>';
			}	

			if (numErroresFormato == 0) {
				// Procedemos con el registro del usuario en el sistema
				console.log("Registro de meta!");

				let obj = {
					"idUsuario": idUsuario,
					"nombre" : nombre.val(),
					"valor" : valor.val(),
					"fechaLimite" : fecha_limite.val(),
					"descripcion" : descripcion.val()
				};

				let request = JSON.stringify(obj);
				console.log(request);
				jQuery.ajax({
					headers: {          
					    Accept: "application/json;",
					    "Content-Type": "application/json;"   
					},
					type:"POST",
					url: host+"registrar-meta",
					data: request,
					success:function (response) {
						
						// Registro exitoso
						jQuery(".modal-body").html('<div class="alert alert-success"><p>El registro de la meta se ha completado con éxito.</p></div>');
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

function cargarMovimientos() {
	jQuery("#listadoMovimientos").html('');
	let idUsuario = localStorage.getItem("idUsuario");
	jQuery.ajax({
		type:"GET",
		url: host+"consultar-movimientos-usuario/"+idUsuario,
		success:function (response) {
			jQuery.each(response, function (key,value) {
				jQuery("#listadoMovimientos").append('<tr>'+
						'<td>'+value.idMovimiento+'</td>'+
						'<td>'+value.tipo+'</td>'+
						'<td>'+value.nombre+'</td>'+
						'<td>$'+value.valor+'</td>'+
						'<td>'+value.constante+'</td>'+
						'<td>'+value.concepto+'</td>'+
						'<td>'+value.fechaRegistro+'</td>'+
					'</tr>')
			})
		}
	})
}

function formularioMovimiento() {
	jQuery('#myModal').modal('show')
	jQuery(".modal-title").html('Nuevo movimiento');
	jQuery(".modal-body").html('<div class="row">'+
			'<div class="col-12"><p>Formulario de registro de movimientos</p></div>'+
			'<div class="col-12 form-group">'+
				'<select class="form-control" id="tipo" name="tipo">'+
					'<option value="INGRESO">INGRESO</option>'+
					'<option value="EGRESO">EGRESO</option>'+
				'</select>'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre movimiento">'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<input type="number" min="0" class="form-control" id="valor" name="valor" placeholder="Valor">'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<select class="form-control" id="constante" name="constante">'+
					'<option value="SI">SI</option>'+
					'<option value="NO">NO</option>'+
				'</select>'+
			'</div>'+
			'<div class="col-12 form-group">'+
				'<textarea class="form-control" rows="5" id="concepto" name="concepto" placeholder="Concepto"></textarea>'+
			'</div>'+
			'<div class="col-12 alerta">'+
			'</div>'+
		'</div>');
	jQuery(".modal-footer").html('<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button><button type="button" class="btn btn-primary btn-save"><span class="fa fa-save"></span> Salvar Movimiento</button>');

	jQuery(".btn-save").click(function () {
		let tipo = jQuery("#tipo");
		let nombre = jQuery("#nombre");
		let valor = jQuery("#valor");
		let constante = jQuery("#constante");
		let concepto = jQuery("#concepto");

		let campos = [tipo,nombre,valor,constante,concepto];
		let erroresFormato = "<ul>";
		let numErroresFormato = 0;
		let j = 5;

		jQuery(".alerta").html('');
		
		for (var i = 0; i < campos.length; i++) {
			
			if (campos[i].val() == "") {
				jQuery(".alerta").html('<div class="alert alert-warning"><p>Por favor diligencie la información solicitada en el campo <strong>'+campos[i].attr("placeholder")+'</strong> para continuar con el registro del movimiento.</p></div>')
				campos[i].focus();
				break;
			}else{
				j--;
			}

		}

		if (j == 0) {
			
			if (! nameRegEx.test(tipo.val())) {
				numErroresFormato++
				erroresFormato += '<li>El valor ingresado en el campo <strong>Tipo</strong> no tiene un formato válido</li>';
			}

			if (! nameRegEx.test(nombre.val())) {
				numErroresFormato++
				erroresFormato += '<li>El valor ingresado en el campo <strong>Nombre</strong> no tiene un formato válido</li>';
			}

			if (! valueRegEx.test(valor.val())) {
				numErroresFormato++
				erroresFormato += '<li>El valor ingresado en el campo <strong>Valor</strong> no tiene un formato válido</li>';
			}

			if (! nameRegEx.test(constante.val())) {
				numErroresFormato++
				erroresFormato += '<li>El valor ingresado en el campo <strong>Constante</strong> no tiene un formato válido</li>';
			}

			if (! nameRegEx.test(concepto.val())) {
				numErroresFormato++
				erroresFormato += '<li>El valor ingresado en el campo <strong>Concepto</strong> no tiene un formato válido</li>';
			}

			if (numErroresFormato == 0) {
				
				console.log("Registro de movimiento!");

				let obj = {
				  	"concepto": concepto.val(),
				  	"constante": constante.val(),
				  	"idUsuario": localStorage.getItem("idUsuario"),
				  	"nombre": nombre.val(),
				  	"tipo": tipo.val(),
				  	"valor": valor.val()
				};

				let request = JSON.stringify(obj);
				console.log(request);
				jQuery.ajax({
					headers: {          
					    Accept: "application/json;",
					    "Content-Type": "application/json;"   
					},
					type:"POST",
					url: host+"registrar-movimiento",
					data: request,
					success:function (response) {
						
						// Registro exitoso
						jQuery(".modal-body").html('<div class="alert alert-success"><p>El registro del movimiento se ha completado con éxito.</p></div>');
						jQuery(".modal-footer").html('<button type="button" class="btn btn-primary btn-accept" data-dismiss="modal">Aceptar</button>');
						jQuery('.btn-accept').click(function () {
							loadPage('client','movimientos');
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