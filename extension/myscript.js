//document.body.removeChild(document.getElementById("uniqueidnoonewilleverthinktouse"));
container = document.createElement("div");
loadinggif = document.createElement('img');
loadinggif.src = "http://www.rewards1.com/images/welcome-banner/gen/loading_animation.gif";
loadinggif.setAttribute("style", "margin-left:-50px;position:absolute;margin-right:auto;margin-top:-50px;top:50%;");
container.setAttribute("style", "margin-left:-390px;left:50%;margin-top:-150px;height:300px;width:780px;top:"+(((window.innerHeight>300)?window.innerHeight/2:150)+ window.scrollY) +"px;z-index:9001;background-color:rgba(200,200,200,0.8);position:absolute;text-align:center;");
container.setAttribute("id","muahahahaha");
container.appendChild(loadinggif);
document.body.appendChild(container);
container.onclick = function(){
    document.body.removeChild(document.getElementById("muahahahaha"));
}
xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if (xhr.readyState==4 && (xhr.status==0 || xhr.status==200)){
        if (!xhr.responseText){
            console.log('1');
            container.innerHTML = "<p style='position:fixed;top:50%;margin-top:-.5em;'>Sorry, no results were found.</p>";
            
            console.log('2');
            container.onclick = function(){
                document.body.removeChild(container);
            };
        }
        myobj = JSON.parse(xhr.responseText);
        console.log(myobj);
        results = myobj.findItemsByKeywordsResponse[0].searchResult[0].item;
        console.log(results);
        totalRes = myobj.findItemsByKeywordsResponse[0].paginationOutput[0].totalEntries[0];
        moreurl = myobj.findItemsByKeywordsResponse[0].itemSearchURL[0];
        console.log(totalRes);
        console.log(moreurl);
        container.removeChild(loadinggif);
        if (parseInt(totalRes)==0){
            container.innerHTML = "<p style='position:fixed;top:50%;margin-top:-.5em;'>Sorry, no results were found.</p>";
            container.onclick = function(){
                document.body.removeChild(container);
            };
            return;
        }
        container.onclick = function(){};
        max = (parseInt(totalRes)>=3)?3:parseInt(totalRes);
        for (i=0; i<max; i++){
            dd = document.createElement("div");
            dd.setAttribute('style','cursor:pointer;overflow-x:hidden;width:250px;height:250px;margin-left:4px;margin-right:4px;padding:0px;display:inline-block;top:0px;text-align:center;');
            dd.innerHTML = "<img src="+results[i].galleryURL[0]+" />";
            dd.innerHTML+="<p style='color:blue;'>$"+results[i].sellingStatus[0].currentPrice[0].__value__+"</p><p>"+results[i].title[0]+"</p>";
           dd.setAttribute("onclick","location.href = '"+results[i].viewItemURL[0]+"'");
           container.appendChild(dd);

        }
        bottom = document.createElement("div");
        bottom.setAttribute("style",'width:inherit;height:20px;text-align:center;');
        bottom.innerHTML = "<a href='#' onclick='document.body.removeChild(document.getElementById(\"muahahahaha\"))' style='margin-right:10px;'>Close Window</a><a style='margin-left:10px;' href='"+moreurl+"'>View All Results</a>";
        container.appendChild(bottom);

    }
}
var srcUrl = document.getElementById("uniqueidnoonewilleverthinktouse").innerHTML;
xhr.open("GET", "http://thedekel.net/images?"+srcUrl,true);
xhr.send();
