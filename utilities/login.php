<?php 
	$name = name;
	$hash = md5(password);
	
	$logins = file('login.txt');

	// Durchgehen des Arrays
	foreach ($logins as $login) {
		list ($login_name, $login_hash) = split(',', $login);
		
		if ($login_name == $name && $login_hash = $hash) {
			return true;
		}
	}
	
	return false;
?>