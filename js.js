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

function addNewSite(){	
	//Making divs and image
	var newDiv = document.createElement("div");
	var newTitle = document.createElement("div");
	var newImg = document.createElement("img");
	newTitle.innerHTML = "<h2>"+titleCont+"</h2>"
	
	//Div styling
	newDiv.style.position="relative";
	newDiv.style.width="260px";
	newDiv.style.height="200px";
	newDiv.style.float="left";
	newDiv.style.margin="5px";
	
	//Text styling
	newTitle.style.position="absolute";
	newTitle.style.bottom="0";
	newTitle.style.zIndex="10";
	newTitle.style.height="80px";
	newTitle.style.width="260px";
	newTitle.style.backgroundColor="rgba(0,0,0,0.6)";
	
	//Image styling
	newImg.src=img;
	newImg.height="200";
	newImg.width="260";
	newImg.style.position="relative";
	newImg.style.zIndex="1";
	newImg.style.objectFit="cover";
	newImg.style.objectPosition="left";
	//Insert
	newDiv.appendChild(newImg);  
	newDiv.appendChild(newTitle);  
	document.getElementById("projects").appendChild(newDiv);		
			
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
}

window.onhashchange = execInit;
window.onload = execInit;
window.onresize = execRes;