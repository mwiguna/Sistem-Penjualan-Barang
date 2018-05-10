
module.exports = function(app, view, connection){

	app.get('/', function(req, res){
		connection.query("SELECT * FROM barang ORDER BY id DESC LIMIT 20", function(err, row, field){
			if(err) throw err;

			var html = view.compileFile('./template/index.html') ({
				cookiebradmin:  req.cookies.reqvera,
				cookieadmin:    req.cookies.reqvera,
				cookiebrdistri: req.cookies.reqvede,
				cookiedistri:   req.cookies.reqvede,
				cookiebruser:   req.cookies.reqvedu,
				cookieuser:     req.cookies.reqvedu,
				data: row
			});

			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(html);
		});
	});

	app.post('/', function(req, res){
		barang = req.body.search;
		connection.query("SELECT * FROM barang WHERE nama LIKE '%"+barang+"%' ORDER BY id DESC LIMIT 20", function(err, row, field){
			if(err) throw err;

			var html = view.compileFile('./template/index.html') ({
				cookiebradmin: req.cookies.reqvera,
				cookieadmin: req.cookies.reqvera,
				data: row,
				msg: "Menampilkan hasil pencarian untuk : " + barang
			});

			res.writeHead(200, {"Content-Type": "text/html"});
		res.end(html);
		});
	});

	app.get('/profile/:id', function(req, res){

		id = [req.params.id];
		connection.query("SELECT * FROM user WHERE id = ?", id,
		function(err, row, field){

			if(row.length){
				data    = row[0];
				penjual = [row[0].id];
				connection.query("SELECT * FROM barang WHERE id_penjual = ?", penjual,
				function(err, row, field){

					var html = view.compileFile('./template/profile.html') ({
						cookiebruser: req.cookies.reqvedu,
						cookiebradmin: req.cookies.reqvera,
						cookiebrdistri: req.cookies.reqvedu,
						data: data,
						brg: row
					});

					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(html);
				});
			} else res.end();
		});
	});

	app.post('/profile/:id', function(req, res){
		brg = req.body.search;
		id  = [req.params.id];
		connection.query("SELECT * FROM user WHERE id = ?", id,
		function(err, row, field){

			if(row.length){
				datas = [row[0].id, "%"+brg+"%"];
				connection.query("SELECT * FROM barang WHERE id_penjual = ? AND nama LIKE ?", datas,
				function(err, row, field){

					var html = view.compileFile('./template/profile.html') ({
						cookiebruser: req.cookies.reqvedu,
						data: data,
						brg: row,
						msg: "Menampilkan hasil pencarian untuk : " + brg
					});

					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(html);
				});
			} else res.end();
		});
	});

};