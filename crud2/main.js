class Articulo{
	constructor(codigo,nombre,precio,cantidad,descripcion){
		this._codigo = Number(codigo);
		this._nombre = nombre;
		this._precio = Number(precio);
		this._cantidad = Number(cantidad);
		this._descripcion = descripcion;
	}
	get codigo(){return this._codigo;}
	get nombre(){return this._nombre;}
	get precio(){return this._precio;}
	get cantidad(){return this._cantidad;}
	get descripcion(){return this._descripcion;}

	toString(){
		console.log("Articulo: "+this._nombre+", Codigo: "+this._codigo+", Precio: "+this._precio);
	}
}

var lista = [];

document.querySelector("#add").addEventListener("submit",function(e){
	e.preventDefault();
	let cod = document.querySelector("#codigo");
	let nom = document.querySelector("#nombre");
	let pre = document.querySelector("#precio");
	let can = document.querySelector("#cantidad");
	let des = document.querySelector("#descripcion");

	var obj = new Articulo(cod.value,nom.value,pre.value,can.value,des.value);


	lista[lista.length] = obj;

	var long = lista.length;
	for (var i = 1; i < long; i++) {
		for (var j = 0; j < (long - i); j++) {
			if (lista[j].codigo > lista[j+1].codigo) {
				var c = lista[j];
				lista[j] = lista[j+1];
				lista[j+1] = c;
			}
		}
	}

	cod.value = "";
	nom.value = "";
	pre.value = "";
	can.value = "";
	des.value = "";

	imprimirActividad("Agregar: se agregó un Articulo");
	mostrarLista(lista);
});

document.querySelector("#search").addEventListener("submit",function(e){
	e.preventDefault();
	let n = document.querySelector("#nombreBuscar").value;
	
	let encontrados = []
	lista.forEach(function(e){
		if (e.nombre == n)
			encontrados.push(e);
	});

	if (encontrados.length){
		mostrarLista(encontrados);
		imprimirActividad("Buscar: se encontraron "+encontrados.length+" Articulos con el nombre "+n);
	}else
		imprimirActividad("Buscar: no se encontro ningun Articulo con el nombre "+n);
});

document.querySelector("#delete").addEventListener("submit",function(e){
	e.preventDefault();
	let n = Number(document.querySelector("#codigoEliminar").value);
	
	let indice = false;
	lista.forEach(function(e,i){
		if (e.codigo == n)
			indice = i;
	});

	if (indice){
		lista.splice(indice,1);
		imprimirActividad("Eliminar: se eliminó el Articulo con codigo "+n);
	}
	else
		imprimirActividad("Eliminar: no se encontro el Articulo con codigo "+n);

	mostrarLista(lista);
});

function imprimirActividad(s) {
	document.querySelector("#act").innerHTML += "<br>"+s;
}

function mostrarLista(arr) {
	let tbody = document.querySelector("#lista");
	tbody.innerHTML = "";

	arr.forEach(function(e,i) {
		let row = tbody.insertRow(-1);
		row.insertCell(0).innerText = i;
		row.insertCell(1).innerText = e.codigo;
		row.insertCell(2).innerText = e.nombre;
		row.insertCell(3).innerText = e.precio;
		row.insertCell(4).innerText = e.cantidad;
		row.insertCell(5).innerText = e.descripcion;
	});
}