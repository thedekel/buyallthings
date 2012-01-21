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

var imageurl = "http://images.google.com/search?tbs=sbi:AMhZZis6ksPb8aRhLMi9YU78_1fgt7qhdz6K8c77wRl5RQpP1Lrn5oEramMsHOidd0Jtke1-B1vSmbDW8jpNJBruiE4fTvFLOXRMf7Zjll-9Vwu0NmOADdDkF2NHBWbCjznevR0_1J196qmIomw5TUsTsoSmfE6h4sX7iYTwBrRcWeZTq2RsVus6NI1UkGheaBgTLvh5YpJnYC1tWAfYoghIfN2ascZvkfvFi44gWGzZFp3D98d_1TVSKAvISBG0Rhk1T06HNkL274UHSpGW6hD4zUgIJB5-mKR7Cv9LdPtTRCzZag_11sLh3fRzLldf9Lm1_1xVHXdTA0i7Z3xx7wkbHAEEvuKGYEtOfhQ-exo0qUd0ib3iIkxhRQpa4BW11ky5XUIsiDFrY2w-Z-XD5cjDYwJmWerq9DkdWXGS13OWZbFtiSSP-svKyhOImWmGCc2fb36KQ3-4QNHGl6z3UJgYXHPD6CbUFFkL1PM6gKzlMfOhFmanwRx7fmnKWzs-vQAzfCcIaPyVekkI6Esfd0LjzzgfwAkQynEOoxOBVl3i1Wz5970ZFeULIA4kv5xSJQxBvzvYbN_1liPct72_1x7G9KyANCyTjCjoh2Hi_1r-L7BpTCqLniJwPn6oAiXuvJAdKIEFI1EXpXj9hIg9fTZ7yXUTRMi3UXGxnQazo0WopWO-3d3cBCG62aSZHreyQO5b4bJ72zd7KcQMG2pXbNPV5niqWTltKNBZAJjMAHis8_1OF27CjtJKnhNptkv46_1xxJin1RyJDSXbkqR8s5aSdZTVJXNw46O0v6m2CPmPCb4cr1Gr0MzBEOXSpGY4gOdz3KNwqPZLBKc1ONnSNzqfZKnLjhOzRJo4XzJiwU61JzgFaPQO7pD0xiZomXj4J8AUPWdJZN6XevGA3kLCh_1nucK8WBQ2KxUDFJ1VgWbGP8Id5GEXTnsaZBhjmD4KuJIz2qnnPD7CR3Pw7HTPvYWamwSIxUwZO_1s7DAxcr2hnDnbJBtWLxNPVnTez4UxBXFeIesah-UDR94xhIrWGALwdo2aaLC8PhxwXHwRGqIz4Fpw-UgYmmwWOyS6TwroRauWo6xywuosIJYYd3gSR0tLZyTisWVKdkz0sBHVTPlbO_1n4S0ar3HhQUpHDs8Tbtu6x9flxjPEXeMXet6ePvh-O0L07q5I58sg6Ayjrk_1vI8Aska4zM3cnsGZFQJKsJ7CLWDOCnJCoLcQcK6iBusUWob5Je0b6fJCtjjonhA22H7-icXolC9yKLHOAzBeX-EEH0bWYQMQ2zjuUfuwEAOOF3vQuGJy_1fVccGYSbMLPwJAx_1DrcAjK39soDMEYfrhenSUeGTVOvZrQupzfeOHuElabq296VP2bPABXTstuAGON3_1ovw_1S41LNbplHDtqvIid2mecp43NuYgt6ca7GF2Hy";

var searchrequest = http.createClient(80,'images.google.com').request("GET", imageurl, {"Host":'images.google.com','Content-Type':"text/html"});
searchrequest.on("response",function(res2){
res2.on("data",function(chunk2){
data2 = /<div class="gsfi".+dir="ltr".+<\/div>/.exec(chunk2.toString());
console.log(chunk2.toString());
});
});
searchrequest.write("yes");
searchrequest.end();
});

imagerequest.write("hello");
imagerequest.end();
