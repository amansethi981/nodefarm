//overview(Homepage)
//product page
//"/api=>api"(display data.json to browser)
//error 404
var http=require("http");
var fs=require("fs");
var url=require("url");
var myfile=fs.readFileSync("./product.html");
var json=fs.readFileSync("./data.json");
myfile=myfile+"";
var json=JSON.parse(json);
// myfile=myfile.replace(/)
function replace(product,template){
    template=template.replace(/#image#/g,product["image"]);
    template=template.replace(/#product#/g,product["productName"]);
    template=template.replace(/#From#/g,product["from"]);
    template=template.replace(/#Nutrients#/g,product["nutrients"]);
    template=template.replace(/#Quantity#/g,product["quantity"]);
    template=template.replace(/#price#/g,product["price"]);
    template=template.replace(/#description#/g,product["description"]);
    if(!product["organic"])
    {
        template=template.replace(/#not-organic#/g,not-organic);
        

    }
    return template;
}
var server =http.createServer(function(req,res){
    console.log(req.url);
    var parsedUrl=url.parse(req.url,true);
    var id=parsedUrl.query.id;
    console.log(id);
    var path=parsedUrl.pathname;

    if(path=="/product"){
        // console.log(json[id]);
        var productpage=replace(json[id],myfile)
        res.write(productpage);
        res.end();
         
    }
    else if(req.url=="/"||req.url==""||req.url==","){
        res.write("homepage");
        res.end("you are at home page");
    }
    else if(req.url=="/api"){
        res.write(json);
        res.end();
    }
    else{
        res.end("Error at 404");
    }

});
server.listen(3000,function(){
    console.log("server has started at port 3000");
});