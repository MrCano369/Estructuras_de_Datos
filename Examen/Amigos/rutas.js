class Ruta{
	constructor(n,t,s){
		this._nombre = n;
		this._tiempo = t;
		this._salida = s;
	}

	get nombre(){return this._nombre;}
	get tiempo(){return this._tiempo;}
}

class Base{
	constructor(n,x,y){
		this._nombre = n;
		this._latitud = x;
		this._longitud = y;
	}
	get nombre(){return this._nombre;}
	get latitud(){return this._latitud;}
	get longitud(){return this._longitud;}
}

class Salida{
	constructor(b,hi,hf,s){
		this._baseInicio = b;
		this._horaInicio = hi;
		this._horaFin = hf;
		this._secuencia = s;
	}
	get baseInicio(){return this._baseInicio;}
	get horaInicio(){return this._horaInicio;}
	get horaFin(){return this._horaFin;}
	get secuencia(){return this._secuencia;}
}

var b1 = new Base("UdC",76,34);
var b2 = new Base("Zentralia",112,82);
var b3 = new Base("Soriana",23,253);
var b4 = new Base("La Villa",67,89);
var b5 = new Base("Tabachines",38,295);

var r1 = new Ruta("20",2);

var s1 = new Salida(b2,7,20,[b3,15,b4,20,b5,10,b1,20,b2,10]);
var s2 = new Salida(b3,6,19,[b4,15,b5,20,b1,10,b2,20,b3,10]);
var s3 = new Salida(b4,6,20,[b5,15,b1,20,b2,10,b3,20,b4,10]);
var s4 = new Salida(b2,8,21,[b3,15,b4,20,b5,10,b1,20,b2,10]);
var s5 = new Salida(b3,8,20,[b4,15,b5,20,b1,10,b2,20,b3,10]);