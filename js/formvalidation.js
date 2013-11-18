$(document).ready(function() {
	
		var fname=document.forms["register"]["firstName"].value;
		var name=document.forms["register"]["lastName"].value;
		var bday=document.forms["register"]["birthday"].value;
		var uname=document.forms["register"]["username"].value;
		var regpword=document.forms["register"]["regpword"].value;
		
		var user=document.forms["login"]["user"].value;
		var password=document.forms["login"]["password"].value;
		
		var need= "<span class=\"needed\">*</span>";
		
		
		
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
	
	
	$(".submenu").click(function() {
		
		bday=document.forms["register"]["birthday"].value;
		
		/* date */
		if(jQuery.isEmptyObject( bday ))
			$("#bday").html  ("Birthday" + need);
		else
			$("#bday").text("Birthday");
	});
	

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
