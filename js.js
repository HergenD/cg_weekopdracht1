var initC = 0;
function loadPage(page) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("container").style.opacity = "0";
            var y = this.responseText;
            setTimeout(function() {
                document.getElementById("container").innerHTML = y;
                document.getElementById("container").style.opacity = "1";
                if (location.hash === "#mijnportfolio" || location.hash === "#makeyourown") {
                    resSite();
                }
				if (window.innerWidth<=800) {
					mobileHide()
				}
                if (initC === 0) {
                    cInit()
                } 
				else if(location.hash == "#makeyourown" || location.hash == "" || location.hash == "#home") {
					showConsole()
				} else {
					hideConsole();
				}
            }, 400);
        }
        if (this.status == 404) {
            location.hash = "";
        }
    };
    xhr.open("GET", page + ".php", true);
    xhr.send();
}

function toPage(page) {
    location.hash = page;
}

function pageSelect() {
    var url = window.location.href;
    var urlSplit = url.split("#");
    var currentPage = urlSplit[1];
    if (location.hash === "" || location.hash === "#home" || location.hash === "#index") {
        loadPage("home");
    } else {
        loadPage(currentPage);
    }
}

var img = "default";
var siteTitle = "http://google.com";
var titleCont = "default";

function getPageTitle(page) {
    var purl = encodeURIComponent(page);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            titleCont = this.responseText;
            addNewSite()
        }
    };
    xhr.open("POST", "gettitle.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("input=" + purl);
}
function showText (targo, message, index, interval) {    
	if (index < message.length) { 
	if(message[index]=="<"){
		document.getElementById(targo).append(document.createElement('br'));
		index ++;
	} else { 
	document.getElementById(targo).append(message[index++]); 
	}
    setTimeout(function () { showText(targo, message, index, interval); }, interval); 
	} 

}
	
function cInit() {
	initC = 1;
	document.getElementById('consoleInput').focus(); 
	showText("msg", ">>>> Welkom op portfoliowebsite.iets < >>>> Je kan hier mijn portfolio bekijken, of je eigen portfolio maken < >>>> Je kan de site ook navigeren en de meeste (+meer) functionaliteit gebruiken door middel van deze console, typ 'help' voor meer commands", 0, 25); 
    var consoleInput = document.getElementById("consoleInput");
    consoleInput.addEventListener("keydown", function(e) {
        if (e.keyCode === 13) {
            cExec();
        }
    });
}

function cExec() {
    var newLine = document.createElement("p");
    var rawInput = document.getElementById('consoleInput').value.replace(/ /g, '');
    var consoleInput = rawInput.split("-");
	var wholeConsole = document.getElementById("console");
    switch (consoleInput[0]) {
        case 'help':
            newLine.innerHTML = 'Available commands: <font style="color:yellow;">topage</font>, <font style="color:yellow;">author</font>, <font style="color:yellow;">about</font>, <font style="color:yellow;">test</font>, <font style="color:red;">reload</font>, <font style="color:red;">clear</font>'
            break;
        case 'author':
            newLine.innerHTML = 'Made by Hergen Dillema'
            break;
        case 'about':
            newLine.innerHTML = 'Custom console-like interface, made using javascript, by Hergen Dillema for CodeGorilla'
            break;
        case 'reload':
			location.reload();
			break;
        case 'topage':
			if (consoleInput.length === 1) {
            newLine.innerHTML = 'Available pages: home, mijnportfolio, makeyourown, contact. Usage: topage -pagename'
			}
			else if(consoleInput[1] == 'home' || consoleInput[1] == 'mijnportfolio' || consoleInput[1] == 'makeyourown' || consoleInput[1] == 'contact') {
				toPage(consoleInput[1]);
			} else {
				newLine.innerHTML = 'Unknown page: "'+consoleInput[1]+'". Available pages: home, mijnportfolio, makeyourown, contact.';
			}
            break;
      case 'js':
			if (consoleInput.length === 1) {
            newLine.innerHTML = 'Usage: js -JAVASCRIPTHERE'
			} else {
				eval(consoleInput[1]);
				newLine.innerHTML = 'Executed: "'+consoleInput[1]+'". Use this at your own risk';
			}
            break;     
			case 'addsite':
			if(location.hash == "#makeyourown"){
				if (consoleInput.length === 1) {
					newLine.innerHTML = 'Usage: addsite -http://SITENAME.com'
				} else {
					sendIt(consoleInput[1]);
				} 
			} else {
				newLine.innerHTML = "Can't add custom websites to this page, please use 'topage' to switch to page 'makeyourown'.";
			}
            break;
        case 'style':
			if (consoleInput.length === 1) {
			newLine.innerHTML = 'Usage: style -"default"/"off"'
			} else if (consoleInput[1] == "off") {
            document.getElementById("pagestyle").setAttribute("href", ""); 
			} else if (consoleInput[1] == "default") {
            document.getElementById("pagestyle").setAttribute("href", "style.css"); 
			} else {
			newLine.innerHTML = 'Style "'+consoleInput[1]+'" unknown. Currently supported: off/default';
			}
            break;
       case 'test':
            newLine.innerHTML = window.location
            break;
        case 'clear':
			var i = wholeConsole.childNodes.length - 3;
			var x=0;
			while (x<i) {			
			wholeConsole.removeChild(wholeConsole.childNodes[0])
			x++;
			}
            break;
        default:
            newLine.innerHTML = 'Command "' + consoleInput[0] + '" is not know, type "help" for a list of all commands. Options used: ' + consoleInput[1];
    }

    wholeConsole.insertBefore(newLine, document.getElementById('start'));
    wholeConsole.scrollTop = wholeConsole.scrollHeight;
    document.getElementById('consoleInput').value = "";
}

function mobileShow() {
	document.getElementById('nav').style.height="240px";
	document.getElementById('show').style.display="none";
	document.getElementById('hide').style.display="block";
}
function mobileHide() {
	document.getElementById('nav').style.height="0px";
	document.getElementById('hide').style.display="none";
	document.getElementById('show').style.display="block";
}

function showConsole () {
	document.getElementById('consoleBox').style.marginTop="50px";
	document.getElementById('bgImg').style.height="404px";
	document.getElementById('showConsole').style.opacity="0";
	document.getElementById('showConsole').style.cursor="default";
		
}
function hideConsole () {
	document.getElementById('consoleBox').style.marginTop="-250px";
	document.getElementById('bgImg').style.height="30px";
	document.getElementById('showConsole').style.opacity="1";	
	document.getElementById('showConsole').style.cursor="pointer";	
}

function addNewSite() {
    //Making divs and image
    var newDiv = document.createElement("div");
    newDiv.className = "siteBlok";
    var newTitle = document.createElement("div");
    newTitle.className = "titleBlok";
    var newImg = document.createElement("img");
    newImg.className = "imgBlok";
    newTitle.innerHTML = "<h2>" + titleCont + "</h2>"

    //Div styling
    newDiv.style.position = "relative";

    newDiv.style.float = "left";
    newDiv.style.margin = "5px";
    newDiv.style.cursor = "pointer";
    newDiv.onclick = function() {
        window.location.href = siteTitle
    };

    //Text styling
    newTitle.style.position = "absolute";
    newTitle.style.bottom = "0";
    newTitle.style.zIndex = "10";
    newTitle.style.backgroundColor = "rgba(0,0,0,0.6)";
    newTitle.style.overflow = "hidden";


    //Resize options
    var containerW = document.getElementById('portContent').offsetWidth;
    var countSites = Math.floor(containerW / 240)
    var divWidth = (containerW / countSites) - 10;
    var divHeight = (divWidth / 4) * 3;
    newDiv.style.width = divWidth + "px";
    newDiv.style.height = divHeight + "px";
    newTitle.style.height = (divHeight / 2.5) + "px";
    newTitle.style.width = divWidth + "px";
    newImg.height = divHeight;
    newImg.width = divWidth;

    //Image styling
    newImg.src = img;
    newImg.style.position = "relative";
    newImg.style.zIndex = "1";
    newImg.style.objectFit = "cover";
    newImg.style.objectPosition = "left";
    //Insert
    newDiv.appendChild(newImg);
    newDiv.appendChild(newTitle);
    document.getElementById("projects").appendChild(newDiv);
    if (window.innerWidth > document.getElementById('container').offsetWidth) {
        resSite();
    }

}

function resSite() {
    // variables
    var containerW = document.getElementById('portContent').offsetWidth;
    var countSites = Math.floor(containerW / 240);
    var divWidth = (containerW / countSites) - 11;
    var divHeight = (divWidth / 4) * 3;
    //Resize siteBlok
    var siteBlok = document.getElementsByClassName("siteBlok");
    for (i = 0; i < siteBlok.length; i++) {
        siteBlok[i].style.width = divWidth + "px";
        siteBlok[i].style.height = divHeight + "px";
    }
    //Resize titleBlok
    var titleBlok = document.getElementsByClassName("titleBlok");
    for (i = 0; i < titleBlok.length; i++) {
        titleBlok[i].style.height = (divHeight / 2.5) + "px";
        titleBlok[i].style.width = divWidth + "px";
    }
    //Resize imgBlok
    var imgBlok = document.getElementsByClassName("imgBlok");
    for (i = 0; i < imgBlok.length; i++) {
        imgBlok[i].height = divHeight;
        imgBlok[i].width = divWidth;
    }
}

function loadImg(a) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            img = this.responseText;
            getPageTitle(siteTitle)
        }
    };
    xhr.open("POST", "screenshot.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(a);
}

function sendIt(a) {
    siteTitle = a;
    var y = "input=" + a;
    loadImg(y);

}

function execInit() {
    pageSelect();
}

function execRes() {
    if (location.hash === "#mijnportfolio" || location.hash === "#makeyourown") {
        resSite();
    }
}

window.onhashchange = execInit;
window.onload = execInit;
window.onresize = execRes;