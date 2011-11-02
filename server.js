	var http = require('http');
	http.createServer(function (req, res) {
		
		//text/plain content text/html; charset=UTF-8
		
		//Jun.print(req);
		var url = req.url.match(/(\w+)\.(\w+)/);
		var type = {
			"html":{contentType:"text/html; charset=UTF-8", charSet:"UTF-8"},
			"png":{contentType:"image/png", charSet:"utf-8"},
			"js":{contentType:"text/javascript; charset=UTF-8", charSet:"UTF-8"},
			"css":{contentType:"text/css;charset=UTF-8", charSet:"UTF-8"}		
		};
		
		var fileName = url[0];
		var contentType = type[url[2]] ? type[url[2]].contentType : false;
		var charSet = type[url[2]] ? type[url[2]].charSet : false;
	
		if(contentType){
			var fs = require('fs');
			var data = fs.readFileSync(fileName, charSet);
			res.writeHead(200, {'Content-Type':contentType});	
			res.end(data);			
		}else{
		
			res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'});
			res.end("-404-");
		}
		

	}).listen(8080, "127.0.0.1");
	console.log('Server running at http://127.0.0.1:8080/');

	var Jun = {
		print:function(obj){
			console.log('--------------------------------------------------------------------');
			for(var i in obj){
				if(obj.hasOwnProperty(i)){
					console.log(i+":"+obj[i]);				
				}	
			}
		},
		log:function(msg){
			console.log(msg);
		}
	};
