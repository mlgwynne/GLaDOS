window.registeredcommands=[
	"help",
	"clear",
	"reddit",
	"google",
	"exit",
	"fortune",
	"credits",
	"wantyougone",
	"opensource"
]

window.shortcuts={
	"h":"help",
	"c":"clear",
	"r":"reddit",
	"g":"google",
	"4chan":"fortune",
	"4":"fortune"
}

window.consolerunning=false;

window.userinput="";

//Removing the forcelinebreak-div will freeze hell and make the dead walk the earth. You want that? No, you don't. So don't fucking remove this.
window.consolecontent="<div id=forcelinebreak></div>\
GLaDOS v1.09 (c) 1982 Aperture Science, Inc<br>\
";
window.cursorpos=0;
window.consoleurl="<br>Lutan@GLaDOS:~$ ";
window.commandhistory=[""];
window.currentcommand=0;
$(function() {
	$(window).on("keydown",function(e) {
		if (window.consolerunning || e.which == 0 || e.ctrlKey || e.metaKey || e.altKey) {
			return;
		}
		
		if (e.key.length==1) {
			e.preventDefault();
			e.stopPropagation();
			temp=window.userinput;
			window.userinput=temp.substr(0,window.cursorpos)+e.key+temp.substr(window.cursorpos);
			window.cursorpos++;
			//WORKS
		} else if (e.key=="Backspace") {
			e.preventDefault();
			e.stopPropagation();
			temp=window.userinput;
			window.userinput = temp.substr(0,window.cursorpos-1)+temp.substr(window.cursorpos);
			window.cursorpos = window.cursorpos > 0 ? window.cursorpos - 1 : 0;
			//WORKS
		} else if (e.key=="Delete") {
			e.preventDefault();
			e.stopPropagation();
			temp=window.userinput;
			window.userinput = temp.substr(0,window.cursorpos)+temp.substr(window.cursorpos+1);
			if (window.cursorpos > window.userinput.length) {
				window.cursorpos = window.userinput.length;
			}
			//WORKS
		} else if (e.key=="Enter") {
			e.preventDefault();
			e.stopPropagation();
			runCommand(window.userinput);
			//WORKS
		} else if (e.key=="ArrowLeft") {
			e.preventDefault();
			e.stopPropagation();
			moveCursorLeft();
			//WORKS
		} else if (e.key=="ArrowUp") {
			e.preventDefault();
			e.stopPropagation();
			oneCommandBack();
			//WORKS
		} else if (e.key=="ArrowRight") {
			e.preventDefault();
			e.stopPropagation();
			moveCursorRight();
			//WORKS
		} else if (e.key=="ArrowDown") {
			e.preventDefault();
			e.stopPropagation();
			oneCommandForward();
			//WORKS
		} else if (e.key=="Home") {
			window.cursorpos=0;
		} else if (e.key=="End") {
			window.cursorpos=window.userinput.length;
		} else {
			console.log(e.key);
		}
		updateConsole();
	});
	updateConsole();
});

function oneCommandBack() {
	window.currentcommand = window.currentcommand > 0 ? window.currentcommand - 1 : 0;
	window.userinput=window.commandhistory[window.currentcommand];
	window.cursorpos=window.userinput.length;
}

function oneCommandForward() {
	window.currentcommand = window.currentcommand < window.commandhistory.length - 1 ? window.currentcommand + 1 : window.commandhistory.length - 1;
	window.userinput=window.commandhistory[window.currentcommand];
	window.cursorpos=window.userinput.length;
}

function spanify(str) {
	len=str.length;
	output="";
	for (i=0; i<len; i++) {
		output+="<span>"+str[i]+"</span>";
	}
	return output;
}

function oc() {	//open console
	window.consolerunning=false;
	updateConsole();
}

function cc() {	//close console
	window.consolerunning=true;
	updateConsole();
}

function moveCursorLeft() {
	window.cursorpos = window.cursorpos > 0 ? window.cursorpos - 1 : 0;
}

function moveCursorRight() {
	temp=window.userinput.length;
	window.cursorpos = window.cursorpos < temp ? window.cursorpos + 1 : temp;
}

function updateConsole() {
	if (window.consolerunning) {
		$("#console_primary_content").html(window.consolecontent+"<div id=forcelinebreak></div><span id=userinput><span>&nbsp;</span></span>");
		$("#userinput > span").removeClass("mark");
		$("#userinput > span:last-child").addClass("mark");
	} else {
		$("#console_primary_content").html(window.consolecontent+window.consoleurl+"<div id=forcelinebreak></div><span id=userinput>"+spanify(window.userinput)+"<span>&nbsp;</span></span>");
		$("#userinput > span").removeClass("mark");
		$("#userinput > span:nth-child("+(window.cursorpos+1)+")").addClass("mark");
	}
}

function runCommand(command) {
	if (command=="") {
		window.consolecontent+=window.consoleurl+"<br>";
		return;
	}
	
	var split=command.split(" ");
	var cmd=split[0];
	
	if (typeof window.shortcuts[cmd]!=="undefined") {
		cmd=window.shortcuts[cmd];
	}
	
	if (window.registeredcommands.indexOf(cmd)==-1) {
		window.userinput="";
		window.cursorpos=0;
		window.commandhistory[window.commandhistory.length-1]=command;
		window.commandhistory.push("");
		window.currentcommand=window.commandhistory.length - 1;
		window.consolecontent+=window.consoleurl+command+"<br>"+"Unknown command '"+cmd+"'. Try 'help' to get a list of all available commands.<br>";
		return;
	}
	window.userinput="";
	window.cursorpos=0;
	window.commandhistory[window.commandhistory.length-1]=command;
	window.commandhistory.push("");
	window.currentcommand=window.commandhistory.length - 1;
	window.consolecontent+=window.consoleurl+command+"<br>";
	
	split.splice(0,1);
	
	//RUN THE COMMAND AYY LMAO
	window[cmd](split);
}

function print(str) {
	if (typeof str==="undefined") {
		return;
	}
	window.consolecontent+=str;
	updateConsole();
}

function println(str) {
	if (typeof str ==="undefined") {
		str="";
	}
	window.consolecontent+=str+"<br>";
	updateConsole();
}

function throwerror() {
	errors=[
		"This is your fault. I'm going to kill you. And all the cake is gone. You don't even care, do you?",
		"Unbelievable. You, &lt;subject name here&gt; must be the pride of &lt;subject hometown here&gt;.",
		"Look, you're wasting your time. And, believe me, you don't have a whole lot left to waste. What's your point, anyway?",
		"You've been wrong about every single thing you've ever done, including this thing. You're not smart. You're not a scientist. You're not a doctor. You're not even a full-time employee! Where did your life go so wrong?",
		"Let's be honest. Neither one of us knows what that thing does. Just put it in the corner and I'll deal with it later.",
		'Well done. Here are the test results: You are a horrible person. I\'m serious, that\'s what it says: "A horrible person."',
		"It's just us talking, like regular people. And this is no joke: we are in deep trouble.",
	]
	error=errors[Math.floor(Math.random()*errors.length)];
	
	print("Error. ");
	println(error);
	oc();
}