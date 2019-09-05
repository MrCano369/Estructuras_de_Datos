class Ruleta{
	girar(){
		return Math.ceil(Math.random()*100);
	}
}

class Corredor{
	constructor(){
		this._position = 0;
		this._ruleta = new Ruleta();
	}
	set position(v){this._position = v;}
	set ruleta(v){this._ruleta = v;}
	get position(){return this._position;}
	get ruleta(){return this._ruleta;}
}

class Liebre extends Corredor{
	avanzar(){
		let n = this._ruleta.girar();
		if (n<=20)
			this._position += 9;
		if (n>20 && n <= 30)
			this._position -= 12;
		if (n>30 && n <= 65)
			this._position += 1;
		if (n>65 && n <= 80)
			this._position -= 2;
	}
}

class Tortuga extends Corredor{
	avanzar(){
		let n = this._ruleta.girar();
		if (n<=50)
			this._position += 3;
		if (n>50 && n <= 70)
			this._position -= 6;
		if (n>70)
			this._position += 1;
	}
}


var t = new Tortuga();
var l = new Liebre();

while(l.position<90 && t.position<90){
	l.avanzar();
	t.avanzar();
	console.log(l.position,t.position)
}

if (l.position>=90 && t.position>=90) {
	console.log("Empate");
}else if(l.position>=90){
	console.log("La Liebre ganó");
}else{
	console.log("La Tortuga ganó");
}