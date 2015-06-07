$(function() {
	updateBlocks();
	window.systems=[
		["Homecomputer","http://www.bloxapi.com/?action=blockModule&subaction=readBlock&strKey=9FSaOHPwp2UtYxuPkWuiBYjr7UZ1CRlwtU9H9nNBmSlQQHeXlqJPZ9cYVf4wybsp"],
		["NAS","http://www.bloxapi.com/?action=blockModule&subaction=readBlock&strKey=VLYaypfaUMsAow9vXV29C0dMNuUR5XNWdEDxFzagGpukkLdOSgR4tcvtqrJ9rGsr"],
	];
	
	var systemsdevices="";
	var i=0;
	while (i<window.systems.length) {
		var bittybits=stringToBits(window.systems[i][0]);
		systemsdevices+='<div id="'+window.systems[i][0]+'" class="column">';
		var bits="";
		var j=0;
		while (j<bittybits.length) {
			if (bittybits[j]=="1") {
				bits+='<div class="one"></div>';
			} else {
				bits+='<div class="zero"></div>';
			}
			j++;
		}
		systemsdevices+=bits+bits+bits+bits+'</div>';
		i++;
	}
	$("#systems").html(systemsdevices);
	setInterval(function() {
		var i=0;
		while (i<window.systems.length) {
			test="ayy";
			test2="ayy lmao";
			request=$.get(window.systems[i][1]);
			request.done(function(data) {
				time=new Date().getTime() / 1000;
				difference = time - data;
				console.log(test);
				console.log(test2);
				if (difference < 20) {
					$("#"+window.systems[i][0]).removeClass("down");
					$("#"+window.systems[i][0]).addClass("up");
				} else {
					$("#"+window.systems[i][0]).removeClass("up");
					$("#"+window.systems[i][0]).addClass("down");
				}
			});
			request.fail(function() {
				console.log("fail");
			});
			i++;
		}
	},10000);
});

setInterval(function() {
	updateBlocks();
},60000);

window.cursorstate=true;
setInterval(function() {
	if (window.cursorstate) {
		$("#cursorblinking").text("\
		.mark {\
			text-decoration:none;\
		}\
		");
		window.cursorstate=false;
	} else {
		$("#cursorblinking").text("\
		.mark {\
			text-decoration:underline;\
		}\
		");
		window.cursorstate=true;
	}
},350);
function updateBlocks() {
	request=$.get("http://www.bloxapi.com/index.php?action=blockModule&subaction=readBlock&strKey=YM17fqok3rdBeQfPD1F1CzqB0jqS3hPO");
	request.done(function(data) {
		$("#temperature").html(data.substr(0,4));
	});
	request=$.get("http://www.bloxapi.com/index.php?action=blockModule&subaction=readBlock&strKey=BXLm1Mlg1PQhw5kaAQaLEMx8cZCSrOMR");
	request.done(function(data) {
		$("#humidity").html(data.substr(0,4));
	});
	request=$.get("http://www.bloxapi.com/index.php?action=blockModule&subaction=readBlock&strKey=f8KxOxivgxtkm33mve6yUrADJS7R8EE0");
	request.done(function(data) {
		$("#dewpoint").html(data.substr(0,4));
	});
}
	
function strip(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function stringToBits(input) {
	output="";
	for (i=0; i < input.length; i++) {
        output +=input[i].charCodeAt(0).toString(2);
    }
	return output;
}