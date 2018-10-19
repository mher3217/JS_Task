// event emmited when connected
ws.onopen = function () {
		console.log('websocket is connected ...')
		// sending a send event to websocket server
		//ws.send(JSON.stringify(user));

}


// event emmited when receiving message
ws.onmessage = function (ev) {

	if(ev.data == "find"){
		document.getElementById("registr").style.display = "none";
		document.getElementById("message").style.display = "block";
		console.log("find!!!!");
	}else if(ev.data == "new_user"){
		document.write("creat_new_user!!!!!");
	}else{
		document.getElementById("errorMessage").style.display = "block";
		console.log("can't find!!!");
	}
}
