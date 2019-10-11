class Articulo{
	constructor(cod, nom, pre, can, des){
		this._cod = cod;
		this._nom = nom;
		this._pre = pre;
		this._can = can;
		this._des = des;
		this._sig = null;
	}
	set siguiente(v){this._sig = v;}
	get siguiente(){return this._sig;}
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

	agregarAlFinal(obj){
		if (!this._primero) {
			this._primero = obj;
			this._ultimo = obj;
		}else{
			this._ultimo.siguiente = obj;
			this._ultimo = obj;
		}
	}

	eliminar(codigo){
		var actual = this._primero;
		if (this._primero.codigo == codigo) {
			if (!this._primero.siguiente) {
				this._primero = null;
				this._ultimo = null;
			}else{
				this._primero = this._primero.siguiente;
			}
			return true;
		}else{
			while(actual.siguiente && actual.siguiente.codigo != codigo){
				actual = actual.siguiente;
			}
			if (actual) {
				if (actual.siguiente == this._ultimo) {
					actual.siguiente = null;
				}else{
					actual.siguiente = actual.siguiente.siguiente;
				}
				return true;
			}else{
				return null;
			}
		}


	}

	buscar(codigo){
		var actual = this._primero;
		while(actual && actual.codigo != codigo){
			actual = actual.siguiente;
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
			actual = actual.siguiente;
			count++;
		}
		return cadena;
	}

}
var inventario = new Inventario();

///Aqui comienza el main.js///

document.querySelector("#btnAgregar").addEventListener("click",agregar);

function agregar() {
	var cod = document.querySelector("#txtCodigo").value;
	var nom = document.querySelector("#txtNombre").value;
	var pre = document.querySelector("#txtPrecio").value;
	var can = document.querySelector("#txtCantidad").value;
	var des = document.querySelector("#txtDescripcion").value;
	var pos = document.querySelector("#txtPosicion").value;

	inventario.agregarAlFinal(new Articulo(cod, nom, pre, can, des));
	document.querySelector("#lista").innerHTML = inventario.toString();
	document.querySelector("#actividad").innerHTML += "Articulo agregado<br>";
}

document.querySelector("#btnEliminar").addEventListener("click",eliminar);

function eliminar() {
	var cod = document.querySelector("#txtCodigoE").value;
	var x = inventario.eliminar(cod)

	if (x) {
		document.querySelector("#actividad").innerHTML += "Articulo eliminado<br>";
	}else{
		document.querySelector("#actividad").innerHTML += "No se encontro<br>";
	}
	document.querySelector("#lista").innerHTML = inventario.toString();
}


document.querySelector("#btnBuscar").addEventListener("click",buscar);

function buscar() {
	var cod = document.querySelector("#txtCodigoB").value;
	var x = inventario.buscar(cod)

	if (x) {
		document.querySelector("#actividad").innerHTML += "Articulo encontrado<br>";
	}else{
		document.querySelector("#actividad").innerHTML += "No se encontro<br>";
	}
}


inventario.agregarAlFinal(new Articulo(2856, "Pera", 49, 100, "esta rica"));
inventario.agregarAlFinal(new Articulo(8954, "Lapiz", 9, 250, "hb dibujo"));
inventario.agregarAlFinal(new Articulo(2378, "Cel", 3900, 3, "Moto e4 plus"));
document.querySelector("#lista").innerHTML = inventario.toString();

