	
		
var need= "<span class=\"needed\"> *</span>";
		
var loginalert = "<span class=\"needed\">The given username or password id wrong! Please try again.</span>";
var requieredalert = "<span class=\"needed\">You have to fill in the required fields!</span>";
var bdayalert = "<span class=\"needed\">You're to young for using this service!</span>";

var now = new Date();
var year = now.getYear();
var month = now.getMonth();
var day = now.getDate();

if(year < 999)
	year += 1900;



$(document).ready(function() {
	
	var fname=document.forms["register"]["firstName"].value;
	var name=document.forms["register"]["lastName"].value;
	var bday=document.forms["register"]["birthday"].value;
	var uname=document.forms["register"]["username"].value;
	var regpword=document.forms["register"]["regpword"].value;
	
	var user=document.forms["login"]["user"].value;
	var password=document.forms["login"]["password"].value;
		
	filled();


	/* auf gefüllt oder nicht gefüllt testen bei Tastendruck */
	$(".input").keydown(function() {
		
		fname=document.forms["register"]["firstName"].value;
		name=document.forms["register"]["lastName"].value;
		uname=document.forms["register"]["username"].value;
		regpword=document.forms["register"]["regpword"].value;
		
		user=document.forms["login"]["user"].value;
		password=document.forms["login"]["password"].value;
		
		filled();	
	});
	
	/* datum gefüllt/nicht gefüllt bei mausklick */
	$(".submenu").click(function() {
		
		bday=document.forms["register"]["birthday"].value;
		
		/* date */
		if(jQuery.isEmptyObject( bday ))
			$("#bday").html  ("Birthday" + need);
		else
			$("#bday").text("Birthday");
	});
	
	/* Füllung der einzelnen Formularfelder prüfen */
	function filled() {
		/* register */
		if(jQuery.isEmptyObject( fname ))
			$("#fname").html("First name" + need);
		else
			$("#fname").text("First name");
			
		if(jQuery.isEmptyObject( name ))
			$("#name").html("Last name" + need);
		else
			$("#name").text("Last name");
			
		if(jQuery.isEmptyObject( bday ))
			$("#bday").html("Birthday" + need);
		else
			$("#bday").text("Birthday");
		
		if(jQuery.isEmptyObject( uname ))
			$("#uname").html("Your username" + need);
		else
			$("#uname").text("Your username");
		
		if(jQuery.isEmptyObject( regpword ))
			$("#pword").html("Your password" + need);
		else
			$("#pword").text("Your password");
		
		/* login */	
		if(jQuery.isEmptyObject( user ))
			$("#user").html("Username" + need);
		else
			$("#user").text("Username");
		
		if(jQuery.isEmptyObject( password ))
			$("#password").html("Password" + need);
		else
			$("#password").text("Password");
	}
	

});



/* Auswertung des Login-Formulares */
function logincheck() {
		
	user=document.forms["login"]["user"].value;
	password=document.forms["login"]["password"].value;
		
	if(jQuery.isEmptyObject( user ) || jQuery.isEmptyObject( password )) {
		$("#lognotify").html(requieredalert);
		
	}else if(user != "admin" || password != "12345") {
		$("#lognotify").html(loginalert);
	}
	else
		$("#lognotify").text("Logindata seems to be correct!");
	
	
	
	return false;
		
}

/* Auswertung des Geburtsdatums */
function bdaycheck(bdate) {
	
	/* Parsen vom HTML5-Date-Feld */
	var check = bdate.split("-");
	
	/* Umwandeln der geparsten Daten in ein js-Date-Format */
	check = new Date(check[0], check[1], check[2], now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
	
	/* Zeiraum zw. eingegebenem Datum und dem jetzigen Zeitpunkt berechnen */
	check = now - check;
	
	/* Millisekunden in Jahre umrechene */
	check = (check / 1000) / 60 / 60 / 24 / 365;
	
	
	if(check >= 17.93)
		return true; 
	else
		return false;
	
}

/* Auswertung des Registrieren-Formulares */
function regcheck() {
	
	fname=document.forms["register"]["firstName"].value;
	name=document.forms["register"]["lastName"].value;
	bday=document.forms["register"]["birthday"].value;
	uname=document.forms["register"]["username"].value;
	regpword=document.forms["register"]["regpword"].value;
	
	
	if(jQuery.isEmptyObject( fname ) || jQuery.isEmptyObject( name ) || jQuery.isEmptyObject( bday ) || jQuery.isEmptyObject( uname ) || jQuery.isEmptyObject( regpword )) {
			$("#regnotify").html(requieredalert);
	}else if(bdaycheck(bday) != true)
		$("#regnotify").html(bdayalert);
	else
		$("#regnotify").text("You seem to be old enough!");
	
	
	
	return false;
	
}
