var net = require("net"),
    http = require("http");

var client = http.createClient(80, 'www.google.com');

var imageurl = "";

var headers ={
    'Host': "www.google.com",
    'Content-Type':'multipart/form-data'
}

var searchstring = "http://www.chucksanimeshrine.com/animeblog/uploaded_images/Black_Rock_shooter_1-726069.jpg";

var imagerequest = client.request("GET", "http://images.google.com/searchbyimage?image_url="+searchstring, headers);

imagerequest.on('response',function(res){
    res.on('data',function(chunk){
//      console.log(chunk.toString());
        data = /HREF=".+"/.exec(chunk.toString());
        imageurl = data[0].substring(6,data[0].length-1);
      console.log(imageurl)
    res.on('end',function(){
    });
});

var searchrequest = http.createClient(80,'www.google.com').request("GET", imageurl, {"Host":'www.google.com','Content-Type':"text/html"});
searchrequest.on("response",function(res2){
res2.on("data",function(chunk2){
data2 = /<div class="gsfi".+dir="ltr".+<\/div>/.exec(chunk2.toString());
});
});
searchrequest.write("yes");
searchrequest.end();
});

imagerequest.write("hello");
imagerequest.end();
