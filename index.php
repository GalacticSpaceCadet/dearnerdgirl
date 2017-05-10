<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $linkedin = $_POST['linkedin'];
    $message = $_POST['message'];
    $from = 'From: '; 
    $to = 'clayton.devecht@gmail.com'; 
    $subject = 'Hello';
    $body = "From: $name\n E-Mail: $email\n Message:\n $message";

    if ($_POST['submitBtn']) {				 
        if (mail ($to, $subject, $body, $from)) { 
	    echo '<p>Your message has been sent!</p>';
	} else { 
	    echo '<p>Something went wrong, go back and try again!</p>'; 
	} 
?>