window.addEventListener("load", function(){
	/*creamos todas las variables*/
	var cajaTexto = document.getElementById("msj");
	var conta = document.getElementById("contador");
	var Tweet = document.getElementById("btn");
	var contenedorTwets = document.getElementById("contenedor");
	
	/*hacemos que la caja de texto se agrande de 1 a 3 cuando le hacemos click*/
	cajaTexto.addEventListener("click", function(){
		cajaTexto.rows = 3;
	});

    /*keyup detecta que la tecla esta soltada*/
	cajaTexto.addEventListener("keyup", function(e){
			deshabilitarBoton(cajaTexto);
			contadorCaracteres(cajaTexto);
			var tecla = e.keyCode;
			tamañoContenedor(cajaTexto);
	});
    /*detecta que hacemos click en nuestro text area*/
    /*El método preventDefault () cancela el evento si es cancelable, lo que significa que la acción predeterminada que pertenece al evento no ocurrirá. */
	Tweet.addEventListener("click", function(e){
		e.preventDefault();
    /*El método trim elimina los espacios en blanco de ambos lados de una cadena*/
		if(cajaTexto.value.length <= 140 && cajaTexto.value.length > 0){
			agregarTweet(cajaTexto.value.trim());
			cajaTexto.value = "";
			conta.textContent = "140";
			conta.style.color = "black";
			/*la caja vuelve a un tamaño menor luego de enviar el texto*/
			cajaTexto.rows = 2;
		}
    /*el boton vuelve a desactivarse*/
		Tweet.disabled = true;
	});

	function agregarTweet(texto){
		/*creamos el div en donde irá nuestro tweet*/
		var newTweet = document.createElement("div");
		/*con innertext recuperamos el texto del tweet que escribimos*/
		newTweet.innerText = texto;
        /* insertamos el msj, con el index en 0 hacemos que nuestro ultimo mensaje aparezca al principio y no al final*/
		contenedorTwets.insertBefore(newTweet, contenedorTwets.childNodes[0]);
        
        /*vamos agregando cada tweet en una ventana diferente*/
        /*con class list accedemos a la cadena de texto que tenemos en newtweet*/
		newTweet.classList.add("tweets");
        
        /*agregamos hora*/
		var fecha = new Date();
		var hora = fecha.getHours();
		var min = fecha.getMinutes();
		/*creamos el div para insertar la hora*/
		var contenHora = document.createElement("div");
		contenHora.innerText = hora + ":" + min;
		/*0 para que la hora aparezca al principio y no al final o entremedio del texto*/
		newTweet.insertBefore(contenHora,newTweet.childNodes[0]);
	}

	function deshabilitarBoton(cText){
		/*si en nuestro conteo quedan menos de 140 caracteres pero mas de 0 se habilita el boton*/
		if(cajaTexto.value.length <= 140 && cajaTexto.value.length > 0){
			Tweet.disabled = false;
		}
		/*si en el contador aparece que excedemos los 140 caracteres, se desabilita el boton*/
		else if(cText.value.trim().length > 140 || cText.value.trim().length === 0){
			Tweet.disabled = true;
		}
	}

     /* nos quedan 20 caracteres se pone verde, si nos quedan 10 se pone rojo*/
	function contadorCaracteres(texto){
		var caracteres = texto.value.length;
		conta.innerText = 140 - caracteres;

		if(caracteres >= 120 && caracteres < 130){
			conta.style.color = "green";
		}
		else if (caracteres >130) {
			conta.style.color = "red";
		}
		else{
			conta.style.color = "black";
		}
	}
});
