		function Fu_login() {
			document.getElementById("login").style.display = "block";
			document.getElementById("login_buttom").style.display = "none";
			document.getElementById("autorize_buttom").style.display = "none";
			
			
			var user = {
				username: document.getElementById("name").value,
				age: document.getElementById("age").value
			};
			console.log(user.username);
			console.log(user.age);
		}
function show() {
	document.getElementById("back").style.display = "block";
}
	