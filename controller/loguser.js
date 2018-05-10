
module.exports = function(app, view, connection, passwordHash){
	
	app.get('/register', function(req, res){
		var html = view.compileFile('./template/user/register.html')({
			msg: ""
		});

		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(html);
	});

	app.post('/register', function(req, res){
		nama      = req.body.nama;
		email     = req.body.email;
		password  = passwordHash.generate(req.body.password);

		datas = [nama, email, password];
		
		connection.query("INSERT INTO user (nama, email, password, teman, namarek, bank) VALUES (?, ?, ?, '', NULL, NULL) ", datas,
			function(err, field){
			if(err) throw err;
				
			res.redirect('/login');
		});
	});

	app.get('/login/:err?', function(req, res){
		if(req.params.err === undefined){
			if(req.cookies.reqvera === undefined && req.cookies.reqvede === undefined){
				if(req.cookies.reqvedu === undefined){
					var html = view.compileFile('./template/user/login.html')();

					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(html);
				} else res.redirect('/homeuser'); 
			} else res.redirect('/homeadmin');
		} else {
			var html = view.compileFile('./template/user/login.html') ({
				msg: "Harap login sebelum memesan."
			});

			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(html);
		}
	});

	app.post('/login/:err?', function(req, res){
		email    = req.body.email;
		datas    = [email];

		function redLog(){
			var html = view.compileFile('./template/user/login.html') ({
				msg: "Username dan password tak cocok."
			});

			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(html);
		}

		connection.query("SELECT * FROM user WHERE email = ?", datas,
			function(err, row, field){
			if(err) throw err;

				if(row.length){
					password = row[0].password;
					me = row[0].id;
					if(passwordHash.verify(req.body.password, password)){
						var text = "";
					    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
					    for(var i = 0; i < possible.length; i++) {
					        text += possible.charAt(Math.floor(Math.random() * possible.length));
					    }
						
						cache = [text, email];
						connection.query("UPDATE user SET cache = ? WHERE email = ?", cache,
							function(err, row, field){

							res.cookie('reqvedu', text, { maxAge: 60*60*1000, httpOnly: true });
							res.redirect('/biodata');
						});
					} else redLog();
				} else redLog();

		});
	});

	app.get('/homeuser', function(req, res){
		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
		function(err, row, field){

			if(row.length){
				me = row[0].id;
				connection.query("SELECT penjualan.id_pembelian, pembelian.*, user.nama, barang.nama AS namabarang FROM penjualan INNER JOIN pembelian INNER JOIN user INNER JOIN barang ON penjualan.id_pembelian = pembelian.id AND user.id = pembelian.id_pemesan AND barang.id = pembelian.id_barang AND pembelian.id_pengirim = ? AND penjualan.validasi = 1 ORDER BY id DESC", [me],
				function(err, row, field){
					rows  = row;
					total = row.length;
					connection.query("UPDATE penjualan SET ir_user = 1 WHERE id_sender = ?", [me],
					function(err, row, field){

						var html = view.compileFile('./template/user/home.html')({
							cookiebruser: cache,
							data: rows,
							total: total,
							me: me
						});

						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					});
				});
			} else {
				res.redirect('/login');
			}
		});
	});

	app.get('/logoutuser', function(req, res){
		cache = [req.cookies.reqvedu];
		connection.query("UPDATE user SET cache = NULL WHERE cache = ?", [cache],
		function(err, row, field){
			res.clearCookie('reqvedu');
			res.redirect('/login');
		});
	});

}