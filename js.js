function loadPage(page) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("container").style.opacity = "0";
            var y = this.responseText;
            setTimeout(function() {
                document.getElementById("container").innerHTML = y;
                document.getElementById("container").style.opacity = "1";
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

var img = "asd";
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
    xhr.send("input="+purl);
}
var scrollBar = 0;

function addNewSite(){
	
	
	//Making divs and image
	var newDiv = document.createElement("div");
	newDiv.className="siteBlok";
	var newTitle = document.createElement("div");
	newTitle.className="titleBlok";
	var newImg = document.createElement("img");
	newImg.className="imgBlok";
	newTitle.innerHTML = "<h2>"+titleCont+"</h2>"
	
	//Div styling
	newDiv.style.position="relative";

	newDiv.style.float="left";
	newDiv.style.margin="5px";
	newDiv.style.cursor="pointer";
	newDiv.onclick = function(){window.location.href=siteTitle };
	
	//Text styling
	newTitle.style.position="absolute";
	newTitle.style.bottom="0";
	newTitle.style.zIndex="10";
	newTitle.style.backgroundColor="rgba(0,0,0,0.6)";
	newTitle.style.overflow="hidden";
	
	
	//Resize options
	var containerW = document.getElementById('portContent').offsetWidth;
	var countSites = Math.floor(containerW / 270)
	var divWidth = (containerW/countSites) - 10;
	var divHeight = (divWidth/4)*3;
	newDiv.style.width=divWidth+"px";
	newDiv.style.height=divHeight+"px";
	newTitle.style.height=(divHeight/2.5)+"px";
	newTitle.style.width=divWidth+"px";
	newImg.height=divHeight;
	newImg.width=divWidth;
	
	//Image styling
	newImg.src=img;
	newImg.style.position="relative";
	newImg.style.zIndex="1";
	newImg.style.objectFit="cover";
	newImg.style.objectPosition="left";
	//Insert
	newDiv.appendChild(newImg);  
	newDiv.appendChild(newTitle);  
	document.getElementById("projects").appendChild(newDiv);	
	if (window.innerWidth > document.getElementById('container').offsetWidth){
	resSite();
	}	
			
}

function resSite(){
	// variables
	var containerW = document.getElementById('portContent').offsetWidth;
	var countSites = Math.floor(containerW / 270);
	var divWidth = (containerW/countSites) - 11;
	var divHeight = (divWidth/4)*3;
	//Resize siteBlok
	var siteBlok = document.getElementsByClassName("siteBlok");
	for(i = 0; i < siteBlok.length; i++){
    siteBlok[i].style.width=divWidth+"px";
    siteBlok[i].style.height=divHeight+"px";
	}
	//Resize titleBlok
	var titleBlok = document.getElementsByClassName("titleBlok");
	for(i = 0; i < titleBlok.length; i++){
    titleBlok[i].style.height=(divHeight/2.5)+"px";
    titleBlok[i].style.width=divWidth+"px";
	}
	//Resize imgBlok
	var imgBlok = document.getElementsByClassName("imgBlok");
	for(i = 0; i < imgBlok.length; i++){
    imgBlok[i].height=divHeight;
    imgBlok[i].width=divWidth;
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
function sendIt(){
	siteTitle = document.getElementById("myForm").elements[0].value;
	var y = "input=" + siteTitle;
	loadImg(y);

}

function execInit() {
    pageSelect();
}

function execRes() {
	resSite();
}

window.onhashchange = execInit;
window.onload = execInit;
window.onresize = execRes;