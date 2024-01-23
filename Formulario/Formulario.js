const Formulario = document.getElementById('Formulario'); 
const Inputs = document.querySelectorAll('#Formulario input'); // Obtenermos un arreglo de inputs.

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, números, guión y guión bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 dígitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 números.
}

const Campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch(e.target.name){
		case "Usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "Nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "Password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
			break;
		case "Password2":
			validarPassword2();
		break;
		case "Correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "Telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`Grupo__${campo}`).classList.remove('Formulario__grupo-incorrecto');
		document.getElementById(`Grupo__${campo}`).classList.add('Formulario__grupo-correcto');
		document.querySelector(`#Grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#Grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#Grupo__${campo} .Formulario__input-error`).classList.remove('Formulario__input-error-activo');
		Campos[campo] = true;
	}else{
		document.getElementById(`Grupo__${campo}`).classList.remove('Formulario__grupo-correcto');
		document.getElementById(`Grupo__${campo}`).classList.add('Formulario__grupo-incorrecto');
		document.querySelector(`#Grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#Grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#Grupo__${campo} .Formulario__input-error`).classList.add('Formulario__input-error-activo');
		Campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('Password');
	const inputPassword2 = document.getElementById('Password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById('Grupo__password2').classList.add('Formulario__grupo-incorrecto');
		document.getElementById('Grupo__password2').classList.remove('Formulario__grupo-correcto');
		document.querySelector('#Grupo__password2 i').classList.add('fa-times-circle');
		document.querySelector('#Grupo__password2 i').classList.remove('fa-check-circle');
		document.querySelector('#Grupo__password2 .Formulario__input-error').classList.add('Formulario__input-error-activo');
		Campos[password] = false;
	}else{
		document.getElementById('Grupo__password2').classList.remove('Formulario__grupo-incorrecto');
		document.getElementById('Grupo__password2').classList.add('Formulario__grupo-correcto');
		document.querySelector('#Grupo__password2 i').classList.remove('fa-times-circle');
		document.querySelector('#Grupo__password2 i').classList.add('fa-check-circle');
		document.querySelector('#Grupo__password2 .Formulario__input-error').classList.remove('Formulario__input-error-activo');
		Campos[password] = true;
	}
}

Inputs.forEach((input)=> {
    input.addEventListener('keyup', validarFormulario); // Al presionar una tecla se ejecuta un código.
    input.addEventListener('blur', validarFormulario); // Al perder su foco se ejecuta un código.
});

Formulario.addEventListener('submit', (e) => {
    e.preventDefault();

	const Terminos = document.getElementById('Terminos');
	if(Campos.usuario && Campos.nombre && Campos.password && Campos.correo && Campos.telefono && Terminos.checked){
		Formulario.reset();

		document.getElementById('Formulario__mensaje-exito').classList.add('Formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('Formulario__mensaje-exito').classList.remove('Formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.Formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('Formulario__grupo-correcto');
		});
	}else{
		document.getElementById('Formulario__mensaje').classList.add('Formulario__mensaje-activo');
	}
});