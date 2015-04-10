/*
 * Talk Central
 * Copy Right @ 2015
 */

;(function(window){
	
	var properties = {
		chat: {
			height: 400
		}
	}

	if (window.document.body) {
		talkCentral();
	} else {
		window.addEventListener("load", talkCentral, false);
	}

	function talkCentral(){

		//Build HTML
		var talkBox = document.createElement('div');
		talkBox.style.cssText = " position: fixed; \
				bottom: 0px; \
				right: 2px; \
				width: 250px; \
				z-index: 100000";

		var header = document.createElement('div');
		header.innerHTML = "Chat Now";
		header.style.cssText = "border-radius: 5px 5px 0 0; \
				height: 25px; \
				background-color: #69d8a6; \
				border-color: #2fac74; \
				color: black; \
				font-weight: 900; \
				text-align: center; \
				font-family: Arial; \
				cursor: pointer; \
				border: 1px solid black;";	

		talkBox.appendChild(header);

		var chat = document.createElement('div');
		chat.style.cssText = "height: 0; \
				background-color: #69d8a6; \
				border: 1px solid black; \
				transition: height 0.3s; \
				overflow: hidden;"

		talkBox.appendChild(chat);


		var insideChat = document.createElement('div');
		insideChat.style.cssText = "height: 100%; width: 100%; position: relative;"
		chat.appendChild(insideChat)


		var typeHere = document.createElement('textarea');
		typeHere.style.cssText = "position: absolute; \
				bottom: 1px; \
				resize: none; \
				border-radius: 4px; \
				resize: none; \
				padding: 5px; \
				margin: 10px; \
				width: 200px; \
				box-shadow: none; \
				border: 1px solid black;"

		insideChat.appendChild(typeHere)

		//Add event handlers
		header.addEventListener("click", function(){
			chat.style.height = chat.style.height !== "0px" ? 0 : properties.chat.height + "px";
		});	

		window.document.body.appendChild(talkBox);
	}


	//Websocket API
	function socket(){
		if (window.WebSocket) {
			var ws = new WebSocket("wss://s-dal5-nss-25.firebaseio.com/.ws?v=5&ns=videoshare");
			ws.onopen = function()
		     {
		        // Web Socket is connected, send data using send()
		        ws.send({hello: 'world'});
		        alert("Message is sent...");
		     };

		    ws.onmessage = function (evt) 
		     { 
		        console.log(evt);
		        alert("Message is received...");
		     };
		     ws.onclose = function()
		     { 
		        // websocket is closed.
		        alert("Connection is closed..."); 
		     };
		} else {
			//Long polling
		}
	}

	socket();

})(window);
