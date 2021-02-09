var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(_title,_list,_body) {
	return `
		<!DOCTYPE html>
		<html>
		<head>
			<title>WEB01 - ${_title}</title>
			<meta charset="utf-8">
		</head>
		<body>
			<h1><a href="/?id=Welcomm">WEB</a></h1>
			${_list}
			${_body}
		</body>
		</html>
	`;
	}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;
    var title = queryData.id;
    var menuList;

    if(pathName === '/') {
    	if(title === undefined) {
    		title = 'Welcomm';
    	}
    	fs.readdir('./data',function(err,fList) {
    		menuList = '<ol>';
    		for(i=0;i<fList.length;i++) {
    			if(fList[i] != 'welcomm') {
    				menuList = menuList+`<li><a href="/?id=${fList[i]}">${fList[i]}</a></li> `;
    			}
    		}
    		menuList = menuList+'</ol>';
    	});
  		fs.readFile('./data/'+title, 'utf8',function(err, description) {
		    var template = templateHTML(title,menuList,`<h2>${title}</h2>${description}`);
		    response.writeHead(200);
	    	response.end(template);
	    })
	  } else {
	    response.writeHead(404);
    	response.end('Not found');
	  }
	
});
app.listen(3000);