var net = require("net"),
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
            "Host":"google.com",
            "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.106 Safari/535.2",
            'Content-Type':'text/html'
        }
        var client = http.createClient(80,'images.google.com');
        var client2 = http.createClient(80,'images.google.com');
        var client3 = http.createClient(80,'open.api.ebay.com');
        var imagerequest = client.request("GET", "http://images.google.com/searchbyimage?image_url="+imageurl, headers);

        imagerequest.on('response', function(imageres){
            imageres.on('data', function(redirectdata){
                //console.log(redirectdata.toString());
                var mydata = /HREF=".+"/.exec(redirectdata.toString());
                var imageurl = mydata[0].substring(6,mydata[0].length-1);
                var stringrequest = client2.request("GET", imageurl, subheaders);
                //console.log(imageurl);
                stringrequest.on('response',function(finalres){
                    finalres.on('data',function(finaldata){
                        //console.log(finaldata.toString());
                        start = /:bold">/.exec(finaldata.toString());
                        end = /<\/a/.exec(finaldata.toString());

                        if(start){
                            //console.log('hey');
                            //console.log(start.input);
                            temp = start.input.substr(start.index);
                            end = temp.indexOf("</a");
                            var ret = start.input.substr(start.index+7, end-7);
                            if (/nbsp/.test(ret)){
                                return;
                            }
                            console.log(ret);
                            //use ret here
                            var subheaders2 = {
                                "Host":"open.api.ebay.com",
                                "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.106 Safari/535.2",
                                'Content-Type':'application/json'
                            }
                            var productrequest = client3.request("GET", "http://open.api.ebay.com/shopping?callname=FindItems&responseencoding=JSON&appid=GeorgiaT-3078-4732-83f0-eaaa3ac8b977&siteid=0&QueryKeywords="+ret.replace(" ","+")+"&version=713",subheaders2);
                            productrequest.on('response',function(jsonstream){
                                jsonstream.on('data',function(myjson){
                                    console.log(myjson.toString());
                                    res.writeHead(200,{"Content-Type":"application/json"});
                                    res.write(myjson.toString());
                                    res.end();
                                });
                            });
                            productrequest.write("black rock shooter is pretty good.");
                            productrequest.end();
                        }
                    });
                });
                stringrequest.write("hey");
                stringrequest.end();
            });
        });
        imagerequest.end();
        res.end();
    }
}).listen(8000);
