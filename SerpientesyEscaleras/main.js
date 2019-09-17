function nRandom(min,max) {
	return Math.trunc(Math.random()*(max-min+1)+min);
}

class Dado{
	lanzar(){
		return nRandom(1,6);
	}
}

class Jugador{
	constructor(){
		this._posicion = 0;
		this._dado = new Dado();
	}
	get posicion(){return this._posicion;}
	set posicion(v){this._posicion = v;}

	avanzar(tablero){
		var x = this._dado.lanzar();
		var enunciado;
		this.posicion += x;
		enunciado = "salió un "+x+", avanza a la casilla: "+this.posicion;

		var contenidoCasilla = tablero[this.posicion];

		while(contenidoCasilla != 0 && this.posicion<=100){

		this.posicion += contenidoCasilla;

			if(contenidoCasilla > 0)
				enunciado += "<br>Escalera! sube a la casilla: "+this.posicion;
			else
				enunciado += "<br>Serpiente! retrocede a la casilla: "+this.posicion;

			contenidoCasilla = tablero[this.posicion]
		}
		return enunciado;
	}
}

class Juego{
	constructor(){
		this._tablero = new Array(101);
		this._j1 = new Jugador();
		this._j2 = new Jugador();
		this.nuevoTablero();
	}

	get tablero(){return this._tablero;}
	get j1(){return this._j1;}
	get j2(){return this._j2;}

	nuevoTablero(){
		this._tablero.fill(0);

		for (var i = 0; i < nRandom(8,10); i++) {//crear escaleras
			var x = nRandom(5,50);
			var y = nRandom(2,99-x);
			if(this._tablero[y] == 0)
				this._tablero[y] = x;
			else
				i--;
		}

		for (var i = 0; i < nRandom(8,10); i++) {//crear serpientes
			var x = nRandom(5,50);
			var y = nRandom(x+1,99);
			if(this._tablero[y] == 0)
				this._tablero[y] = -x;
			else
				i--;
		}
	}

	imprimirTablero(){
		var tablerovisual = "";
		for (var i = 1; i < this._tablero.length; i++) {
			tablerovisual += i;
			if (this.tablero[i] != 0){
				if (this.tablero[i] > 0)
					tablerovisual += " Escalera sube a la "+Number(this.tablero[i]+i);
				else
					tablerovisual += " Serpiente baja a la "+Number(i+this.tablero[i]);
			}
			tablerovisual += "<br>";
		}
		return tablerovisual;
	}
}

var x = new Juego();
document.querySelector("#tablero").innerHTML = x.imprimirTablero();

document.querySelector("#btnJugar").addEventListener("click",jugar);

function jugar(){
	x.j1.posicion = 0;
	x.j2.posicion = 0;
	document.querySelector("#j1").innerHTML = "";
	document.querySelector("#j2").innerHTML = "";

	while(x.j1.posicion<100 && x.j2.posicion<100){
	document.querySelector("#j1").innerHTML += x.j1.avanzar(x.tablero) +"<br>";
	document.querySelector("#j2").innerHTML += x.j2.avanzar(x.tablero) +"<br>";
	}
	if (x.j1.posicion>=100 && x.j2.posicion>=100)
		document.querySelector("#resultado").innerHTML = "EMPATE!";
	else{
		if (x.j1.posicion>=100)
			document.querySelector("#resultado").innerHTML = "EL JUGADOR 1 GANÓ!";
		else
			document.querySelector("#resultado").innerHTML = "EL JUGADOR 2 GANÓ!";
	}
}

document.querySelector("#btnNuevo").addEventListener("click",nuevo);

function nuevo(){
	x.nuevoTablero();
	document.querySelector("#tablero").innerHTML = x.imprimirTablero();
}