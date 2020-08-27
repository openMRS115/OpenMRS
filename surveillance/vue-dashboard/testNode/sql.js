var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '127.0.0.1', 
	user: 'root', 
	password: 'root', 
	database: 'testdb'
}); 
connection.connect();

function getSql(sql,sucCallback){
	console.log(sql)
	connection.query(sql, function(error, results, fields) {
		if (error) throw error;
		let array = [] ; 
		results.map(item=>{
			console.log(item)
			let obj = {
				"id" : item.id,
				"name": item.name,
				"age" : item.age,
				"sex" : item.sex,
				"province": item.province,
				"city": item.city,
				"status": item.status ,
				"longitude": item.longitude,
				"latitude": item.latitude,
				"confirmed_date": item.confirmed_date,
				"cure_date": item.cure_date,
				"death_date": item.death_date
			}
			
			array.push(obj);
		})
		sucCallback(array) 
	});
}

exports.getSql = getSql;
