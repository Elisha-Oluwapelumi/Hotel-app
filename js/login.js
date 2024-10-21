$(function() {
	'use strict';

	
  $('.form-control').on('input', function() {
	  var $field = $(this).closest('.form-group');
	  if (this.value) {
	    $field.addClass('field--not-empty');
	  } else {
	    $field.removeClass('field--not-empty');
	  }
	});

});



let signedupdetails = JSON.parse(localStorage.getItem("userssignedup"))
console.log(signedupdetails);

const Login = () => {
	let input1 = document.getElementById("username").value
	let input2 = document.getElementById("password").value
	

	let Userfound = false

	for (let index = 0; index < signedupdetails.length; index++) {
		if (signedupdetails[index].input4 == input1 && signedupdetails[index].input5 == input2) {
			Userfound = true;
			localStorage.setItem('userloggedin', index)
			localStorage.setItem('userloggedin', index)
		} 
		
	}

	if (Userfound) {
		alert("You Have Been Sucessfully LoggedIn")
		window.location.href = "dashboard.html"
	}else {
		alert('Invalid Credentials or Account Has Not Been Registered')

	}

}