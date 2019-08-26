document.querySelector("#btn").addEventListener("click",entradaSalida);

function entradaSalida() {
	var hE = document.querySelector("#horaEntrada").value;
	var mE = document.querySelector("#minEntrada").value;
	var sE = document.querySelector("#segEntrada").value;
	var hS = document.querySelector("#horaSalida").value;
	var mS = document.querySelector("#minSalida").value;
	var sS = document.querySelector("#segSalida").value;

	var E = new Date(0,0,0,hE,mE,sE,0);
	var S = new Date(0,0,0,hS,mS,sS,0);

	document.querySelector("#resultado").innerText = diferenciaHoras(E, S);	
}

function diferenciaHoras(horaEntrada, horaSalida) {
	var Segs = (horaSalida - horaEntrada) / 1000;
	if (Segs <= 0) {
		return "La Hora de Salida debe ser despues que la Entrada";
	}

	var Horas = Math.trunc(Segs / 3600);
	Segs = Segs % 3600;

	var Minutos = Math.trunc(Segs / 60);
	Segs = Segs % 60;

	return "Tiempo transcurrido: "+Horas+":"+Minutos+":"+Segs;

}