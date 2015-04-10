/*
 * Talk Central
 * Copy Right @ 2015
 */

;(function(window){
	
	var elements = {
		chat: {
			expandHeight: '400px',
			styles: {
				height: '0px',
				'background-color': '#69d8a6',
				border: '1px solid black',
				transition: 'height 0.3s',
				overflow: 'hidden'
			}
		},
		talkBox: {
			description: 'The most outer container',
			expandWidth: '350px',
			styles: {
				position: 'fixed',
				bottom: '0px',
				right: '2px',
				width: '250px',
				'z-index': '100000',
				transition: 'width 0.3s'
			}
		},
		header: {
			expandHeight: '25px',
			styles: {
				'border-radius': '5px 5px 0 0',
				height: '0px',
				'background-color': '#69d8a6',
				'border-color': '#2fac74',
				color: 'black',
				'font-weight': '900',
				'text-align': 'center',
				'font-family': 'Arial',
				cursor: 'pointer',
				border: '1px solid black',
				transition: 'height 0.5s cubic-bezier(.75,2.5,.67,-0.3)'
			}
		},
		typeHere: {
			styles: {
				position: 'absolute',
				bottom: '1px',
				resize: 'none',
				'border-radius': '4px;',
				resize: 'none',
				padding: '5px',
				width: '320px',
				'box-shadow': 'none',
				border: '1px solid black',
				height: '50px',
				margin: '8px'
			}
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
		applyStyles(talkBox, elements.talkBox.styles);

		var header = document.createElement('div');
		header.innerHTML = "Chat Now";
		applyStyles(header, elements.header.styles);

		talkBox.appendChild(header);

		var chat = document.createElement('div');
		applyStyles(chat, elements.chat.styles);

		talkBox.appendChild(chat);


		var insideChat = document.createElement('div');
		insideChat.style.cssText = "height: 100%; width: 100%; position: relative;"
		chat.appendChild(insideChat)


		var typeHere = document.createElement('textarea');
		applyStyles(typeHere, elements.typeHere.styles);

		insideChat.appendChild(typeHere)

		//Add event handlers
		header.addEventListener("click", function(){
			chat.style.height = chat.style.height !== "0px" ? 0 : elements.chat.expandHeight;
			talkBox.style.width = talkBox.style.width === "250px" ? elements.talkBox.expandWidth : elements.talkBox.styles.width;

			if (chat.style.height === "0px"){
				header.style.height = "0px";
				setTimeout(function(){
					header.style.height = elements.header.expandHeight;
				},300);
			}
		});	

		setTimeout(function(){
			header.style.height = elements.header.expandHeight;
		},0);

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

	
	function applyStyles(element, style){
		var styleStr = "";
		for (var i in style){
			if (style.hasOwnProperty(i)){
				styleStr += i + ": " + style[i] + "; ";
			}
		}
		element.style.cssText = styleStr;
	}

})(window);
