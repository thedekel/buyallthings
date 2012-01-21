var net = require("net"),
    http = require("http");

var client = http.createClient(80, 'www.google.com');

var headers ={
    'Host': "www.google.com",
    'Content-Type':'multipart/form-data'
}

var searchstring = "http://www.chucksanimeshrine.com/animeblog/uploaded_images/Black_Rock_shooter_1-726069.jpg";

var request = client.request("GET", "http://images.google.com/searchbyimage?image_url="+searchstring, headers);

request.on('response',function(res){
    res.on('data',function(chunk){
        console.log(chunk.toString());
    });
    res.on('end',function(){
        console.log('works');
    });
});

request.write("hello");
request.end();
