
//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var pausa=false;
var timerFuel=null;
var aux;
var explotar=false;
var dificultad=5;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var int=0;
var a = g;//la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
var intentos=null;

//al cargar por completo la página...
window.onload = function(){
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");
    intentos=document.getElementById("intentos");
    funcionalidadGeneral();
    document.getElementById("naves").src="img/nave_sin_fuego.png";
	//definición de eventos
	
    	
	//encender/apagar el motor al hacer click en la pantalla
	document.onkeydown = function () {
 	  if (a==g ){
  		motorOn();
 	  } else{
  		motorOff();
 	  }
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeyup = motorOff;
	document.onkeydown=motorOn;
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
	clearInterval(timerFuel);
}

function moverNave(){
	var vReal=null;
	var aReal=null;
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	//velocidad siempre positiva.
	if(v<0){
		vReal=-v;
	}
	else if(v>=0){
		vReal=v;
	}
	//altura de mayor a menor cuando bajamos
	aReal=70-y;
	
	if(aReal<=0){
		vReal=0;
	}
	//limite superior
	if(aReal>=73 && vReal>0){
		v-=v;
		y+=0.1;
		clearInterval(timerFuel);
	}
	else{
	v=v;	
	}
	//actualizar marcadores
	document.getElementById("aguja").style.transform="rotate("+(vReal-107)*5+"deg)";
	velocidad.innerHTML=vReal.toFixed(2);
	altura.innerHTML=aReal.toFixed(0);
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){
		document.getElementById("nave").style.top = y+"%";
		}

	else{ 
		mostrar_nave_explotada();
		stop();
	}
}
function motorOn(){
	//el motor da aceleración a la nave
	a=-g;
	//mientras el motor esté activado gasta combustible, el motor no gasta combustible si la nave ha aterrizado.
	if (timerFuel==null && y<70){
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
	document.getElementById("naves").src="img/nave_con_fuego.png";
	document.getElementById("alienigena").src="img/Alienigena_con_pelo.png";
	}
	if(c<=0){
    motorOff();
	}		
}
function motorOff(){	
	a=g;
	clearInterval(timerFuel);
	if(explotar==false){
	document.getElementById("naves").src="img/nave_sin_fuego.png";
	document.getElementById("alienigena").src="img/Alienigena.png";
	encendido=false;
	}
	timerFuel=null;
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ){
	c = 0;	
	} 
	if(pausa==true){
		c=100;
	}
	document.getElementById("movimiento").style.bottom=(c*0.6-60)+"%";
	
	
	combustible.innerHTML=c.toFixed(1);		
}

function mostrar_nave_explotada (){
	if(v>dificultad){
    explotar=true;
	incrementarMarcador();
	document.getElementById("naves").src="img/nave_explotada.gif";
	}	
}

function reiniciar(){

	document.getElementById("reiniciar_img").onclick=function(){
	y = 10;
	v = 0;
	c = 100;
	explotar=false;
	//ponemos a 100 los marcadores de fuel.
	combustible.innerHTML=100;
	document.getElementById("movimiento").style.bottom=(c*0.6-60)+"%";
	clearInterval(timer);
	document.getElementById("naves").src="img/nave_sin_fuego.png";
	start();
}
}
function pausa_continuar(){
	var menu=document.getElementById("menu");
	var invisible=document.getElementById("invisible");
document.getElementById("pausa_img").onclick=function(){
	stop();
	pausa=true;
	menu.style.display="block";
	invisible.style.display="block";
}
document.getElementById("Continuar").onclick=function(){
	menu.style.display="none";
	pausa=false;
	start();
	invisible.style.display="none";
}
}


function incrementarMarcador(){
		int++;
		intentos.innerHTML=int;
}
function mostrarMenus(){
var menuDif=document.getElementById("menuDificultad");
document.getElementById("Dificultad").onclick=function(){
	menuDif.style.display="block";
}
document.getElementById("volver").onclick=function(){
 menuDif.style.display="none";	
}
}
function funcionalidadGeneral(){
	reiniciar();
	pausa_continuar();
	mostrarMenus();
	dificultades();
	apretarAlien();
}
function dificultades(){
	var facil=document.getElementById("Facil");
	var normal=document.getElementById("Normal");
	var dificil=document.getElementById("Dificil");
	facil.style.backgroundColor="#120229";
dificil.onclick=function(){
	dificultad=1;
	dificil.style.backgroundColor="#120229";
	normal.style.backgroundColor="#020140";
	facil.style.backgroundColor="#020140";
}
normal.onclick=function(){
	dificultad=3;
	normal.style.backgroundColor="#120229";
	dificil.style.backgroundColor="#020140";
	facil.style.backgroundColor="#020140";
}
facil.onclick=function(){
	dificultad=5;
	facil.style.backgroundColor="#120229";
	normal.style.backgroundColor="#020140";
	dificil.style.backgroundColor="#020140";
}

}

function apretarAlien(){
var click=1;
document.getElementById("alien").onclick=function(){
click++;	
if(click%2==0){
motorOn();
}

else{
motorOff();
}
}  
}





