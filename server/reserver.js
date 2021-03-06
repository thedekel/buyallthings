var net = require("net"),
    util = require("util"),
    exec = require("child_process").exec,
    http = require("http"),
    url = require("url"),
    path = require("path");

var OP_NAME = 'findItemsByKeywords',
    SER_VER = "1.0.0",
    SEC_APPNAME = "GeorgiaT-3078-4732-83f0-eaaa3ac8b977",
    GLOBAL_ID = "EBAY-US";


http.createServer(function(req,res){
    var requrl = url.parse(req.url);
    if (requrl.pathname == "/images"){
        var imageurl = requrl.query;
        //console.log(imageurl);
        var headers = {
            "Host": "google.com",
            "Content-Type":"multipart/form-data"
        }
        var subheaders = {
			"host":"images.google.com",
            "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.106 Safari/535.2",
            'Content-Type':'text/html'
        }
//        var client = http.createClient(80,'images.google.com');
 //       var client2 = http.createClient(80,'images.google.com');
  //      var client3 = http.createClient(80,'open.api.ebay.com');
		var options1 = {
			host: 'images.google.com',
			port: 80,
			path: "/searchbyimage?image_url="+imageurl,
			method: "GET"
		};

        var imagerequest = http.request(options1,function(imageres){
            imageres.on('data', function(redirectdata){
               //console.log(redirectdata.toString());
                var mydata = /HREF=".+"/.exec(redirectdata.toString());
                if (mydata==null){
                  return;
                }
                var imageurl = mydata[0].substring(6,mydata[0].length-1);
				//console.log(imageurl);
				imageurl = url.parse(imageurl);
				var options2 = {
					host: imageurl.host,
					port: 80,
					path: imageurl.path,
					method: "GET",
					headers: subheaders
				};
                var stringrequest = http.request(options2, function(finalres){
                //console.log(imageurl);
					var found = null;
					finalres.on('data',function(finaldata){
//						console.log(finaldata.toString());
                        start = /:bold">/.exec(finaldata.toString());
                        end = /<\/a/.exec(finaldata.toString());

                        if(start){
							found = true;
                            //console.log('hey');
                            //console.log(start.input);
                            temp = start.input.substr(start.index);
                            end = temp.indexOf("</a");
                            var ret = start.input.substr(start.index+7, end-7);
                            if (/nbsp/.test(ret)){
                                return;
                            }
                            //console.log(ret);
                            //use ret here
                            var subheaders2 = {
                                "Host":"svcs.ebay.com",
                                "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.106 Safari/535.2",
                                'Content-Type':'application/json'
                            }
                            ret = ret.replace(/\s/g,"+");
                            //console.log(ret);
                            var command = 'curl '+"\"http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.11.0&SECURITY-APPNAME="+SEC_APPNAME+"&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords="+ret+"&paginationInput.entriesPerPage=10\"";
                            child = exec(command, function(error,stdout,stderr){
                              //console.log("stdout: " +stdout);
                              res.writeHead(200, {"Content-Type":"text/plain"});
                              res.end(stdout);
							  return;
                            });
                        } else{
							if (/Find other sizes/i.exec(finaldata.toString()) && !(/search\?hl=en&amp;q=/i.exec(finaldata.toString()))){
							//console.log(finaldata.toString());
							res.write("nores,"+imageurl.href);
							res.end();
							return;
						}
						}
                    });

                });
                stringrequest.write("hey");
                stringrequest.end();
            });
        });
        imagerequest.end();
    }
}).listen(8000);
