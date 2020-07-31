function enviarMensaje() {
	let nombre = jQuery("#nombre");
	let email = jQuery("#email");
	let telefono = jQuery("#telefono");
	let mensaje = jQuery("#mensaje");

	let campos = [nombre,email,telefono,mensaje];
	let erroresFormato = "<ul>";
	let numErroresFormato = 0;
	let j = 4;

	jQuery(".alerta").html('');
	
	for (var i = 0; i < campos.length; i++) {
		
		if (campos[i].val() == "") {
			jQuery(".alerta").html('<div class="alert alert-warning"><p>Por favor diligencie la información solicitada en el campo <strong>'+campos[i].attr("placeholder")+'</strong> para continuar.</p></div>')
			campos[i].focus();
			break;
		}else{
			j--;
		}

	}

	if (j == 0) {
		
		if (! emailRegEx.test(email.val())) {
			numErroresFormato++
			erroresFormato += '<li>El valor ingresado en el campo <strong>Correo Electrónico</strong> no tiene un formato válido</li>';
		}

		if (numErroresFormato == 0) {

			// Enviar mensaje de contacto
			jQuery('#myModal').modal('show')
			jQuery(".modal-title").html('<strong>Mensaje de contacto</strong>')
			jQuery(".modal-body").html('<div class="alert alert-success"><p>El mensaje se ha enviado correctamente.</p></div>');
			jQuery(".modal-footer").html('<button type="button" class="btn btn-primary btn-accept" data-dismiss="modal">Aceptar</button>');
			
			jQuery(".btn-accept").click(function(){
				nombre.val('');
				email.val('');
				telefono.val('');
				mensaje.val('');
			})

		}else{
			erroresFormato += "</ul>";
			jQuery(".alerta").html('<div class="alert alert-warning">'+
				'<p>Se han encontrado varios errores de formato:</p>'+
				erroresFormato+
				'</div>');
		}
	}
}