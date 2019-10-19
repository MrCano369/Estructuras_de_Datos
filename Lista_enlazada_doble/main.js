class Articulo{
	constructor(cod, nom, pre, can, des){
		this._cod = cod;
		this._nom = nom;
		this._pre = pre;
		this._can = can;
		this._des = des;
		this._sig = null;
		this._ant = null;
	}
	set sig(v){this._sig = v;}
	set ant(v){this._ant = v;}
	get sig(){return this._sig;}
	get ant(){return this._ant;}
	get codigo(){return this._cod;}
	get nombre(){return this._nom;}
	get precio(){return this._pre;}
	get cantidad(){return this._can;}
	get descripcion(){return this._des;}
}

class Inventario{
	constructor(){
		this._primero;
		this._ultimo;
	}
	get primero(){return this._primero;}
	get ultimo(){return this._ultimo;}

	agregarAlFinal(nuevo){
		if (this._primero) {
			nuevo.ant = this._ultimo;
			this._ultimo.sig = nuevo;
			this._ultimo = nuevo;
		}else{
			this._primero = nuevo;
			this._ultimo = nuevo;
		}
	}

	agregarOrdenado(nuevo){
		var actual = this._primero;
		while(actual && actual.codigo < nuevo.codigo){
			actual = actual.sig;
		}
		if (actual) {
			if (actual == this._primero) {
				actual.ant = nuevo;
				nuevo.sig = actual;
				this._primero = nuevo;
			}
			else{
				nuevo.ant = actual.ant;
				nuevo.sig = actual;
				nuevo.ant.sig = nuevo;
				actual.ant = nuevo;
			}
		}else{
			this.agregarAlFinal(nuevo);
		}
	}

	eliminar(codigo){
		var actual = this.buscar(codigo);
		if (actual){
			if (actual == this._primero) { // si es el primero
				if (actual.sig) { // si no es el unico
					this._primero = actual.sig;
					this._primero.ant = null;
				}else{ //si es el unico
					this._primero = null;
					this._ultimo = null;
				}
			}else if (actual == this._ultimo) { //si es el ultimo
				this._ultimo = actual.ant;
				this._ultimo.sig = null;
			}else{ //si esta en medio
				actual.sig.ant = actual.ant;
				actual.ant.sig = actual.sig;
			}
			return true;
		}else{
			return null;
		}
	}

	buscar(codigo){
		var actual = this._primero;
		while(actual && actual.codigo != codigo){
			actual = actual.sig;
		}
		if (actual) {
			return actual;
		}else{
			return null;
		}
	}

	toString(){
		var cadena = "";
		var count = 0;
		var actual = this._primero;
		while(actual){
			cadena += "<tr>";
			cadena += "<td>"+count+"</td>";
			cadena += "<td>"+actual.codigo+"</td>";
			cadena += "<td>"+actual.nombre+"</td>";
			cadena += "<td>"+actual.precio+"</td>";
			cadena += "<td>"+actual.cantidad+"</td>";
			cadena += "<td>"+actual.descripcion+"</td>";
			cadena += "</tr>";
			actual = actual.sig;
			count++;
		}
		return cadena;
	}

	toStringInverso(){
		var cadena = "";
		var count = 0;
		var actual = this._ultimo;
		while(actual){
			cadena += "<tr>";
			cadena += "<td>"+count+"</td>";
			cadena += "<td>"+actual.codigo+"</td>";
			cadena += "<td>"+actual.nombre+"</td>";
			cadena += "<td>"+actual.precio+"</td>";
			cadena += "<td>"+actual.cantidad+"</td>";
			cadena += "<td>"+actual.descripcion+"</td>";
			cadena += "</tr>";
			actual = actual.ant;
			count++;
		}
		return cadena;
	}
}


var inventario = new Inventario();

document.querySelector("#btnAgregar").addEventListener("click", () => {
	var cod = document.querySelector("#txtCodigo").value;
	var nom = document.querySelector("#txtNombre").value;
	var pre = document.querySelector("#txtPrecio").value;
	var can = document.querySelector("#txtCantidad").value;
	var des = document.querySelector("#txtDescripcion").value;
	inventario.agregarOrdenado(new Articulo(cod, nom, pre, can, des));
	document.querySelector("#lista").innerHTML = inventario.toString();
	document.querySelector("#actividad").innerHTML += "Articulo agregado<br>";
});

document.querySelector("#btnEliminar").addEventListener("click", () =>{
	var cod = document.querySelector("#txtCodigoE").value;
	var x = inventario.eliminar(cod);
	if (x)
		document.querySelector("#actividad").innerHTML += "Articulo eliminado<br>";
	else
		document.querySelector("#actividad").innerHTML += "Articulo no encontrado<br>";
	document.querySelector("#lista").innerHTML = inventario.toString();
});

document.querySelector("#btnBuscar").addEventListener("click", () => {
	var cod = document.querySelector("#txtCodigoB").value;
	var x = inventario.buscar(cod)
	if (x)
		document.querySelector("#actividad").innerHTML += "Articulo: "+x.nombre+" encontrado<br>";
	else
		document.querySelector("#actividad").innerHTML += "Articulo no encontrado<br>";
});

document.querySelector("#btnInvertir").addEventListener("click", () => {
	document.querySelector("#lista").innerHTML = inventario.toStringInverso();
});

inventario.agregarOrdenado(new Articulo(2856, "Pera", 49, 100, "esta rica"));
inventario.agregarOrdenado(new Articulo(8954, "Lapiz", 9, 250, "hb dibujo"));
inventario.agregarOrdenado(new Articulo(2378, "Cel", 3900, 3, "Moto e4 plus"));
document.querySelector("#lista").innerHTML = inventario.toString();