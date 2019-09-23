document.querySelector("#btn").addEventListener("click",amigos);

function amigos() {
	var n = document.querySelector("#n").value;
	for (var a = 220; a < n; a++) {
		var b = sumaDeDivisores(a);
		if (a == sumaDeDivisores(b) && a != b)
			document.querySelector("#amigos").innerHTML += a +" , "+b+"<br>";
	}
}

function sumaDeDivisores(n){
	var cont = 0;
	for (var i = 1; i <= n/2; i++) {
		if (n%i==0)
			cont += i;
	}
	return cont;
}