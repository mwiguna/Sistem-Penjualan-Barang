
module.exports = function(app, view, connection, passwordHash){

	app.get('/loginadmin', function(req, res){
		if(req.cookies.reqvedu === undefined){
			if(req.cookies.reqvera === undefined && req.cookies.reqvede === undefined){
				var html = view.compileFile('./template/loginadmin.html')({
					msg: ""
				});

				res.writeHead(200, {"Content-Type": "text/html"});
				res.end(html);
			} else {
				if(req.cookies.reqvera === undefined && req.cookies.reqvede) res.redirect('/homedistri');
				if(req.cookies.reqvera) res.redirect('/homeadmin');
			}
		} else res.redirect('/homeuser');
	});


	app.post('/loginadmin', function(req, res){
		username = req.body.username;
		datas    = [username];

		function redLog(){
			var html = view.compileFile('./template/loginadmin.html') ({
				msg: 'Username dan password tak cocok'
			});

			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(html);
		}


		connection.query("SELECT * FROM admin WHERE username = ?", datas,
			function(err, row, field){
			if(err) throw err;

				if(row.length){
					password = row[0].password;
					if(passwordHash.verify(req.body.password, password)){

						var text = "";
					    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
					    for(var i = 0; i < possible.length; i++) {
					        text += possible.charAt(Math.floor(Math.random() * possible.length));
					    }
						
						cache = [text, username];
						connection.query("UPDATE admin SET cache = ? WHERE username = ?", cache,
							function(err, row, field){

							if(username == 'admin') {
								res.cookie('reqvera', text, { maxAge: 60*60*1000, httpOnly: true });
								res.redirect('/homeadmin');
							} else {
								res.cookie('reqvede', text, { maxAge: 60*60*1000, httpOnly: true });
								res.redirect('/homedistri');
							}
						});
					} else redLog();
				} else redLog();

		});
	});

	app.get('/logoutadmin', function(req, res){
		if(req.cookies.reqvera != undefined){
			cache = [req.cookies.reqvera];
			res.clearCookie('reqvera');
		} else {
			cache = [req.cookies.reqvede];
			res.clearCookie('reqvede');
		}

		connection.query("UPDATE admin SET cache = NULL WHERE cache = ?", cache,
		function(err, row, field){
			res.redirect('/loginadmin');
		});
	});

	app.get('/homeadmin', function(req, res){
		cache = [req.cookies.reqvera];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
		function(err, row, field){
			if(err) throw err;

			if(row.length){
				connection.query("SELECT penjualan.id_pembelian, pembelian.*, user.nama AS pemesan, barang.nama AS namabarang FROM penjualan INNER JOIN pembelian INNER JOIN user INNER JOIN barang ON penjualan.id_pembelian = pembelian.id AND user.id = pembelian.id_pemesan AND barang.id = pembelian.id_barang ORDER BY id DESC",
				function(err, row, field){
					rows = row;
					connection.query("UPDATE penjualan SET ir = 1 WHERE id_sender = 0",
					function(err, row, field){
						var html = view.compileFile('./template/admin/home.html')({
							cookiebradmin: cache,
							data: rows,
							total: rows.length
						});

						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					});
				});
			} else {
				res.redirect('/loginadmin');
			}
		});
	});

	app.get('/homedistri', function(req, res){
		cache = [req.cookies.reqvede];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				connection.query("SELECT penjualan.id_pembelian, pembelian.*, user.nama AS pemesan, barang.nama AS namabarang FROM penjualan INNER JOIN pembelian INNER JOIN user INNER JOIN barang ON penjualan.id_pembelian = pembelian.id AND user.id = pembelian.id_pemesan AND barang.id = pembelian.id_barang AND pembelian.id_pengirim = 0 ORDER BY id DESC",
				function(err, row, field){
					rows  = row;
					total = rows.length;
					connection.query("UPDATE penjualan SET ir = 1 WHERE id_sender = 0",
					function(err, row, field){
						var html = view.compileFile('./template/distri/home.html')({
							cookiebrdistri: cache,
							data: rows,
							total: total
						});

						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					});
				});
			} else res.redirect('/loginadmin');
		});
	});

};