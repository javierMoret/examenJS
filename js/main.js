

/*Ejercicio 1: Desarrollo de los cambios de estilos. */

function cambiarTema(color) {
    var estilos = document.getElementById('estilos');
    switch (color) {
        case 'blanco':
            estilos.setAttribute('href', 'css/whitestyle.css');
            break;
        case 'negro':
            estilos.setAttribute('href', 'css/blackstyle.css');
            break;
        default:
            estilos.setAttribute('href', 'css/whitestyle.css');
    }
}

/* Ejercicio 2: Generar una funcion que haga mostrar la contraseña.*/

var checkboxPassword = document.getElementById('checkboxPassword');
var inputPassword = document.getElementById('inputPassword');
var mostrar = true;
checkboxPassword.onclick = function () {
    if (mostrar) {
        inputPassword.setAttribute('type', 'text')
    } else {
        inputPassword.setAttribute('type', 'password')
    }
    mostrar = !mostrar;
}



function checkPassword() {

    var password = document.getElementById('inputPassword');

    if (password.value === null || password.value === '') {

        /*Funcion que reinicia todos los valores anteriores. */
        reset();


    }
    else {

        quitarMensajePassVacia();
        analizarSecuencia();
    }

    return false;
}

/* Ejercicio 3: Comprobar contraseña vacía. */
function analizarContrasenia() {

    var password = document.getElementById('inputPassword');

    if (password.value === null || password.value === '') {
        document.getElementById("mensajePasswordEmpty").innerHTML = 'Contraseña no válida'
        reset();
    }
    else {

        quitarMensajePassVacia();
        guardarPasswordsIngresadas(password.value);
        analizarSecuencia();
    }

    return false;
}

function quitarMensajePassVacia() {

    document.getElementById('mensajePasswordEmpty').innerHTML = (" ");

}

function reset() {
    /*Ejercicio 4: Reiniciar campos. */
    document.getElementById('seguridadPassword').innerHTML = ("")
    document.getElementById('cantTotalCaracteres').innerHTML = ("")
    document.getElementById('cantNum').innerHTML = ("")
    document.getElementById('cantEspeciales').innerHTML = ("")
    document.getElementById('cantLetras').innerHTML = ("")
    document.getElementById('cantLetrasMinus').innerHTML = ("")
    document.getElementById('cantLetrasMayus').innerHTML = ("")
    document.getElementById('cantIguales').innerHTML = ("")
    document.getElementById('cantConsecutivos').innerHTML = ("")
    document.getElementById('cantDistintos').innerHTML = ("")
    document.getElementById('secTipoNums').innerHTML = ("")
    document.getElementById('secTipoLetras').innerHTML = ("")
    document.getElementById('porcentajeNums').style.width = "0%"
    document.getElementById('porcentajeLetras').style.width = "0%"
    document.getElementById('porcentajeEspeciales').style.width = "0%"
}




function analizarSecuencia() {
    var secuenciaArmada = armarEstructuraCadena();
    var infoPasswordAnalizada = calcularCantidadesPassword(secuenciaArmada);
    mostrarInfoPassword(infoPasswordAnalizada);

}
function armarEstructuraCadena() {

    var cadenaIngresada = document.getElementById("inputPassword").value;
    var caracter, secuencia = [];
    for (i = 0; i < cadenaIngresada.length; i++) {
        var caracter = cadenaIngresada.charAt(i);
        secuencia.push(caracter);
    }

    /* Ejercicio 5. */
    return secuencia;

}



/* Funcion que suma cada caracter. */
function calcularCantidadesPassword(secuenciaArmada) {

    var infoPassword = {
        cantTotalCaracteres: 0,
        cantCaracteresEspeciales: 0,
        cantConsecutivos: 0,
        cantDistintos: 0,
        cantIguales: 0,

        cantLetras: 0,
        cantLetrasMayusculas: 0,
        cantLetrasMinusculas: 0,

        cantNum: 0,
    }


    var i = 0, cantIguales = 0, cantConsecutivos = 0, cantDistintos = 0;
    var cantLetras = 0, cantNum = 0, cantCaracteresEspeciales = 0;
    var cantLetrasMayusculas = 0, cantLetrasMinusculas = 0;
    var cantCaracteres = secuenciaArmada.length;
    while (i < cantCaracteres - 1) {
        if (sonIguales(secuenciaArmada[i], secuenciaArmada[i + 1])) {
            cantIguales++;
        }
        else {
            if (sonConsecutivos(secuenciaArmada[i], secuenciaArmada[i + 1])) {

                cantConsecutivos++;
            }
            else {

                cantDistintos++;

            }

        }
        if (esLetra(secuenciaArmada[i])) {
            if (esLetraMayuscula(secuenciaArmada[i]))
                cantLetrasMayusculas++;
            else
                cantLetrasMinusculas++;
            cantLetras++;
        }
        else {
            if (esNumero(secuenciaArmada[i])) {
                cantNum++;
            }
            else
                cantCaracteresEspeciales++;
        }
        i++;
    }

    if (i == cantCaracteres - 1) {
        if (esLetra(secuenciaArmada[i])) {
            if (esLetraMayuscula(secuenciaArmada[i]))
                cantLetrasMayusculas++;
            else
                cantLetrasMinusculas++;
            cantLetras++;
        }
        else {
            if (esNumero(secuenciaArmada[i])) {
                cantNum++;
            }
            else
                cantCaracteresEspeciales++;
        }

    }


    infoPassword.cantTotalCaracteres = cantCaracteres;
    infoPassword.cantCaracteresEspeciales = cantCaracteresEspeciales;
    infoPassword.cantConsecutivos = cantConsecutivos;
    infoPassword.cantDistintos = cantDistintos;
    infoPassword.cantIguales = cantIguales;

    infoPassword.cantLetras = cantLetras;
    infoPassword.cantLetrasMayusculas = cantLetrasMayusculas;
    infoPassword.cantLetrasMinusculas = cantLetrasMinusculas;

    infoPassword.cantNum = cantNum;

    return infoPassword;
}

function sonIguales(elem1, elem2) {
    /*Ejercicio 7: Comprobar que dos elementos sean iguales */
    return elem1==elem2;
}

function sonConsecutivos(elem1, elem2) {
    var consecutivos = false;

    if (esNumero(elem1) && esNumero(elem2)) {

        if (consecutivosNumericos(elem1, elem2)) {

            consecutivos = true;
        }
    }
    else {
        if (esLetra(elem1) && esLetra(elem2))
            if (consecutivosLetras(elem1, elem2)) {

                consecutivos = true;
            }

    }

    return consecutivos;

}

function esNumero(caracter) {
    var esNum = false;
    var codCaracter = caracter.charCodeAt();

    if (codCaracter >= 48 && codCaracter <= 57)
        esNum = true;

    return esNum;
}

function consecutivosNumericos(elem1, elem2) {
    /*Ejercicio 8: Comprobar dos numeros consecutivos. */

    return elem1==elem2;

}


function esLetra(caracter) {
    var codCaracter = caracter.charCodeAt();
    var letra = false;
    if ((codCaracter >= 65 && codCaracter <= 90) || (codCaracter >= 97 && codCaracter <= 122)) {
        letra = true;
    }


    return letra;

}

function esLetraMayuscula(caracter) {
    var codCaracter = caracter.charCodeAt();
    var esMayus = false;

    if (codCaracter >= 65 && codCaracter <= 90)
        esMayus = true;

    return esMayus;
}

function consecutivosLetras(elem1, elem2) {

    /*Ejercicio 8: Comprobar dos letras son consecutivas. */
    return elem1.charCodeAt()==elem2.charCodeAt();


}



function mostrarInfoPassword(infoPassword) {

    mostrarCantidadesAnalisis(infoPassword);

    var tipoSecuencia = analizarUnTipoSecuencia(infoPassword.cantNum, infoPassword.cantLetras,
        infoPassword.cantCaracteresEspeciales, infoPassword.cantTotalCaracteres);

    mostrarInfoTipoSecuencia(tipoSecuencia);

    var porcentajes = calcularPorcentaje(infoPassword);
    mostrarPorcentaje(porcentajes);

    var escala = determinarSeguridadPassword(calculoSeguridadPassword(infoPassword));
    mostrarSeguridadPassword(escala);

}

function mostrarCantidadesAnalisis(infoPassword) {

    /*Ejercicio 6: Mostrar cantidades. */

    document.getElementById('cantTotalCaracteres').innerHTML = infoPassword.cantTotalCaracteres
    document.getElementById('cantNum').innerHTML = infoPassword.cantNum
    document.getElementById('cantEspeciales').innerHTML = infoPassword.cantEspeciales
    document.getElementById('cantLetras').innerHTML = infoPassword.cantLetras
    document.getElementById('cantLetrasMinus').innerHTML = infoPassword.cantLetrasMinusculas
    document.getElementById('cantLetrasMayus').innerHTML = infoPassword.cantLetrasMayusculas
    document.getElementById('cantIguales').innerHTML = infoPassword.cantIguales
    document.getElementById('cantConsecutivos').innerHTML = infoPassword.cantConsecutivos
    document.getElementById('cantDistintos').innerHTML = infoPassword.cantDistintos

}

function analizarUnTipoSecuencia(cantNum, cantLetras, cantEspeciales, cantCaracteres) {

    var tipoSecuencia = {
        tipoLetras: false,
        tipoNumeros: false,
        tipoEspeciales: false,
    }

    if (cantLetras == cantCaracteres) {
        tipoSecuencia.tipoLetras = true;
    }
    else {
        if (cantNum == cantCaracteres)
            tipoSecuencia.tipoNumeros = true;
        else
            if (cantEspeciales == cantCaracteres)
                tipoSecuencia.tipoEspeciales = true;
    }

    return tipoSecuencia;

}

function mostrarInfoTipoSecuencia(tipoSecuencia) {
    if (tipoSecuencia.tipoNumeros == true)
        document.getElementById("secTipoNums").innerHTML = ("Si");
    else
        document.getElementById("secTipoNums").innerHTML = ("No");
    if (tipoSecuencia.tipoLetras == true)
        document.getElementById("secTipoLetras").innerHTML = ("Si");
    else
        document.getElementById("secTipoLetras").innerHTML = ("No");
    if (tipoSecuencia.tipoEspeciales == true)
        document.getElementById("secTipoEspeciales").innerHTML = ("Si");
    else
        document.getElementById("secTipoEspeciales").innerHTML = ("No");
}

function calcularPorcentaje(infoPassword) {

    var porcentajesPassword = {
        porcLetras: 0,
        porcNumeros: 0,
        porcEspeciales: 0,
    }

    var cantNums = infoPassword.cantNum,
        cantLetras = infoPassword.cantLetras,
        cantEspeciales = infoPassword.cantCaracteresEspeciales,
        cantCaracteres = infoPassword.cantTotalCaracteres;

    porcentajesPassword.porcNumeros = porcentaje(cantNums, cantCaracteres);
    porcentajesPassword.porcLetras = porcentaje(cantLetras, cantCaracteres);
    porcentajesPassword.porcEspeciales = porcentaje(cantEspeciales, cantCaracteres);

    return porcentajesPassword;

}

function porcentaje(parcial, total) {
    /*Ejercicio 9: Calcular porcentajes.  */
    return (parcial/total)*100;
}

function mostrarPorcentaje(porcentajes) {

    /*Ejercicio 9: Mostrar porcentajes.  */
    
    document.getElementById('porcentajeNums').style.width = `${porcentajes.porcNumeros}%`
    document.getElementById('porcentajeLetras').style.width = `${porcentajes.porcLetras}%`
    document.getElementById('porcentajeEspeciales').style.width = `${porcentajes.porcEspeciales}%`

}

function calculoSeguridadPassword(infoPassword) {

    var promedio = 0;
    /*Ejercicio 10. Calcular contraseña. */
    promedio += infoPassword.cantCaracteres*4;
    if(infoPassword.cantNum>0){
        promedio=promedio*4
    }
    if(infoPassword.cantCaracteresEspeciales>0){
        promedio=promedio*6
    }
    promedio = promedio - (infoPassword.cantConsecutivos*2)
    promedio = promedio - (infoPassword.cantIguales*2)
    if(tipoSecuencia.tipoNumeros){
        promedio -= infoPassword.cantNum
    }
    if(tipoSecuencia.tipoLetras){
        promedio -= infoPassword.cantLetras
    }

    if(tipoSecuencia.tipoEspeciales){
        promedio = promedio + ((infoPassword.cantCaracteres-infoPassword.cantLetrasMayusculas)*2)
        promedio = promedio + ((infoPassword.cantCaracteres-infoPassword.cantLetrasMinusculas)*2)
    }

    return promedio;

}



function determinarSeguridadPassword(promedioPassword) {

    var promedio = dejarDosDigitosDecimales(promedioPassword);
    /*Ejercicio 11. Mostrar seguridad. */

    if(promedio<30){
        escalaItensidad = 'Muy débil';
    }else if(promedio<=50){
        escalaItensidad = 'Débil';
    }else if(promedio<=75){
        escalaItensidad = 'Fuerte';
    }else{
        escalaItensidad = 'Muy fuerte';
    }

    return escalaItensidad;

}

function mostrarSeguridadPassword(escalaItensidad) {

    document.getElementById("seguridadPassword").innerHTML = escalaItensidad;

}


function mostrarAclaraciones() {
    document.getElementById('aclaraciones').innerHTML =
        "<p>" +
        "<ol>" +
        "<li>Los cáracteres son los números, letras y simbolos ( ! #  %  & ; , .). Los simbolos son todo aquello " +
        "que no son números y no son letras. </li>" +
        "<li>La cantidad de cáracteres se refiere a la longitud de la contraseña ingresada. </li>" +
        "<li> Los caraceteres especiales son aquellos que definimos previamente como simbolos.</li>" +
        "<li>La cantidad de iguales es la cantidad de veces que se repite un cáracter de forma consecutiva.<br>" +
        " Por ejemplo si ingresamos la siguiente contraseña:<br>aaa  en este caso hay dos cantidades de iguales " +
        "porque entre el primer par de aa es una cantidad de iguales y en el segundo par hay otra cantidad de iguales." +
        " En total hay dos cantidades de iguales.</li>" +
        "<li>La cantidad de distintos son la cantidad de pares de caracteres que son diferentes entre sí.</li>" +
        "<li>La cantidad de consecutivos son la cantidad de pares consecutivos. En el caso de los números, seria los numeros " +
        "consecutivos(no en orden) como por ejemplo 1234 son 3 pares de consecutivos pero 149 no son consecutivos. En el caso" +
        "de las letras, seria son letras en orden alfabetico pero teniendo en cuenta " +
        "abc son letras consecutivas pero aez no son consecutivas.</li>" +

        "</ol>" +
        "</p>";

}

mostrarAclaraciones();

