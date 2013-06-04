dayName = new Array ("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
monName = new Array ("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")
now = new Date

var todayDate = monName[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();


mesName = new Array ("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre")

if (now.getDate()==1)
var day = "primer";
else
var day = now.getDate();

var fechaHoy = "El " + day + " de " + mesName[now.getMonth()] + " de " + now.getFullYear();
