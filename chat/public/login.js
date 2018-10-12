function login() {
	//document.getElementById("login").classList.toggle("hinde");
	document.getElementById("login").style.display = "block";
	document.getElementById("autorize").style.display = "none";
}
function autorize() {
	document.getElementById("autorize").style.display = "block";
	document.getElementById("login").style.display = "none";
}

var user_log = {};
var user_auto = {};
var user_msg = {};
var ws = new WebSocket('ws://localhost:27403');

function send_login(){
	user_log.username = document.getElementById("name").value;
	user_log.password = document.getElementById("password").value;
	user_log.login = "login";
	ws.send(JSON.stringify(user_log));
				console.log(user_log);
}

function send_autorize(){
	user_auto.username = document.getElementById("a_name").value;
	user_auto.password = document.getElementById("a_password").value;
	user_auto.age = document.getElementById("a_age").value;
	user_auto.autorize = "autorize";
	ws.send(JSON.stringify(user_auto));
	console.log(user_auto);
}

function message() {
	user_msg.message = document.getElementById("t_message").value;
	user_msg.username = document.getElementById("name").value;
	document.getElementById("demo").innerHTML = document.getElementById("t_message").value;
//	console.log(user);
	ws.send(JSON.stringify(user_msg));
}

// event emmited when connected
ws.onopen = function () {
		console.log('websocket is connected ...')
		// sending a send event to websocket server
		//ws.send(JSON.stringify(user));
}

ws.onclose = () => {
	console.log("closed");
};
// event emmited when receiving message
ws.onmessage = function (ev) {

	if(ev.data == document.getElementById("name").value){
		document.getElementById("registr").style.display = "none";
		document.getElementById("message").style.display = "block";

		console.log(ev);
	}else if(ev.data == "new_user"){
		document.getElementById("registr").style.display = "none";
		document.getElementById("message").style.display = "block";
		console.log("creat_new_user!!!!!");
		// document.write("creat_new_user!!!!!");
	}else if(ev.data == "error"){
		document.getElementById("errorMessage").style.display = "block";
		console.log("can't find!!!");
	}
	else{

			document.getElementById("demo").innerHTML = ev.data;
	}
}
