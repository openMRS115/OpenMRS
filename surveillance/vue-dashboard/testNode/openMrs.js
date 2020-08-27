var express=require('express');
var history = require('connect-history-api-fallback');
var app =express();
var sql = require("./sql")
app.use(history({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
    rewrites: [
      {
        from: /^\/.*$/,
        to: function () {
          return "/";
        }
      },
    ]
}));
//设置跨域访问
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});
console.log(sql)

//写个接口
app.get('/init',function(req,res){
	console.log("123123123")
    res.status(200);
		sql.getSql( "select * from surveillance_system_data  order by confirmed_date" , (result)=>{
			 res.json(result)
		} )
	
	
});
//配置服务端口
var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
	console.log("login")
    console.log('Example app listening at http://%s:%s', host, port);
})