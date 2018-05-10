
module.exports = function(app, view, connection, upload, timenow){

	app.get('/notajualadmin/:id', function(req, res){
		cache = [req.cookies.reqvera];

		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
		function(err, row, field){

			if(row.length){
				id = [req.params.id];
				connection.query("SELECT pembelian.*, penjualan.resi, penjualan.validasi, barang.nama, barang.harga, user.nama AS pemesan FROM pembelian INNER JOIN penjualan INNER JOIN user INNER JOIN barang ON penjualan.id_pembelian = pembelian.id AND user.id = pembelian.id_pemesan AND barang.id = pembelian.id_barang AND pembelian.id = ?", id,
				function(err, row, field){
					rows = row[0];
					idu  = [rows.id_pengirim];
					connection.query("SELECT nama FROM user WHERE id = ?", idu,
					function(err, row, field){
						pengirim = row[0].nama;

						var html = view.compileFile('./template/admin/nota.html')({
							cookiebruser: cache,
							data: rows,
							val: req.params.id,
							pengirim: pengirim
						});

						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					});
				});

			} else res.redirect('/loginadmin');
		});
	});

	app.get('/notajualdistri/:id', function(req, res){
		cache = [req.cookies.reqvede];

		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
		function(err, row, field){

			if(row.length){
				id   = [req.params.id];
				connection.query("SELECT pembelian.*, barang.nama, barang.harga, user.nama AS pemesan FROM pembelian INNER JOIN penjualan INNER JOIN user INNER JOIN barang ON penjualan.id_pembelian = pembelian.id AND user.id = pembelian.id_pemesan AND barang.id = pembelian.id_barang AND pembelian.id = ? AND id_pengirim = 0", id,
				function(err, row, field){
					if(row.length){
						var html = view.compileFile('./template/distri/nota.html')({
							cookiebruser: cache,
							data: row[0]
						});

						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					} else res.redirect('/homedistri');
				});

			} else res.redirect('/loginadmin');
		});
	});

	app.post('/resiadmin/:id', function(req, res){
		resi  = req.body.resi;
		cache = [req.cookies.reqvera];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			
			if(row.length){
				datas = [resi, req.params.id];
				
				connection.query("UPDATE penjualan SET resi = ? WHERE id_pembelian = ?", datas,
					function(err, field){
					res.redirect('/notajualadmin/'+req.params.id);
				});
			} else res.redirect('/login');
		});
	});

	app.get('/laporan', function(req, res){
		cache = [req.cookies.reqvera];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
		function(err, row, field){
			if(err) throw err;

			if(row.length){
				time = new Date();
				year = time.getFullYear();
				year = year+'%';

				connection.query("SELECT pembelian.*, barang.nama, barang.harga, user.nama AS pengirim FROM pembelian INNER JOIN penjualan INNER JOIN barang INNER JOIN user ON user.id = pembelian.id_pengirim AND barang.id = pembelian.id_barang AND penjualan.id_pembelian = pembelian.id AND waktu LIKE ? ORDER BY id DESC", year, 
				function(err, row, field){

					var html = view.compileFile('./template/admin/laporan.html')({
						cookiebradmin: cache,
						data: row,
						att: row.length,
						stt: rows.length
					});

					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(html);
				});

			} else {
				res.redirect('/loginadmin');
			}
		});
	});

	app.get('/bcbeliadmin', function(req, res){ 
		cache  = [req.cookies.reqvedu];
		if(req.cookies.reqvedu) table = 'user';
		else {
			if(req.cookies.reqvera) cache = [req.cookies.reqvera];
			if(req.cookies.reqvede) cache = [req.cookies.reqvede];
			table = 'admin';
		}
		connection.query("SELECT * FROM "+table+" WHERE cache = ?", cache,
			function(err, row, field){

				if(row.length){
					id  = row[0].id;
					if(req.cookies.reqvera || req.cookies.reqvede) id = 0;
					ids = [id];
					connection.query("SELECT penjualan.ir AS ir, pembelian.id_pengirim FROM penjualan INNER JOIN pembelian ON penjualan.id_pembelian = pembelian.id AND pembelian.id_pengirim = ? AND penjualan.ir = '0'", ids,
					function(err, row, field){
						ir = row.length;
						res.end(ir.toString());							
					});
				} else res.redirect('/login');
		});
	});

	app.get('/lapordistri', function(req, res){
		cache = [req.cookies.reqvede];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
		function(err, row, field){
			if(err) throw err;

			if(row.length){
				time = new Date();
				year = time.getFullYear();
				year = year+'%';

				connection.query("SELECT pembelian.*, barang.nama, barang.harga, user.nama AS pengirim FROM pembelian INNER JOIN penjualan INNER JOIN barang INNER JOIN user ON user.id = pembelian.id_pengirim AND barang.id = pembelian.id_barang AND penjualan.id_pembelian = pembelian.id AND pembelian.id_pengirim = 0 AND waktu LIKE ? ORDER BY id DESC", year,
				function(err, row, field){
					if(row.length){
						var html = view.compileFile('./template/distri/laporan.html')({
							cookiebrdistri: cache,
							data: row,
							att: row.length
						});

						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					}
				});
			} else {
				res.redirect('/loginadmin');
			}
		});
	});

	app.get('/barangadmin', function(req, res){
		cache = [req.cookies.reqvera];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				connection.query("SELECT * FROM barang ORDER BY id DESC", function(err, row, field){
					if(err) throw err;

					var html = view.compileFile('./template/admin/daftar.html') ({
						cookiebradmin: cache,
						data: row
					});

					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(html);
				});
			} else res.redirect('/loginadmin');
		});
	});

	app.post('/barangadmin', function(req, res){
		cache = [req.cookies.reqvera];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				barang = req.body.search;
				connection.query("SELECT * FROM barang WHERE nama LIKE '%"+barang+"%' ORDER BY id DESC", function(err, row, field){
					if(err) throw err;

					var html = view.compileFile('./template/admin/daftar.html') ({
						cookiebradmin: cache,
						data: row,
						msg: "Menampilkan hasil pencarian untuk : " + barang
					});

					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(html);
				});
			} else res.redirect('/loginadmin');
		});
	});

	app.get('/validasi/:id', function(req, res){
		cache = [req.cookies.reqvera];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				barang = req.body.search;
				connection.query("UPDATE penjualan SET validasi = 1 WHERE id_pembelian = ?", [req.params.id],
				function(err, row, field){
					if(err) throw err;
					res.redirect('/homeadmin');
				});

			} else res.redirect('/loginadmin');
		});
	});

	app.get('/barangdistri', function(req, res){
		cache = [req.cookies.reqvede];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				connection.query("SELECT * FROM barang WHERE penjual = 'SIP' ORDER BY id DESC", function(err, row, field){
					if(err) throw err;

					var html = view.compileFile('./template/distri/daftar.html') ({
						cookiebrdistri: cache,
						data: row
					});

					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(html);
				});
			} else res.redirect('/loginadmin');
		});
	});

	app.post('/barangdistri', function(req, res){
		cache = [req.cookies.reqvede];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				barang = req.body.search;
				connection.query("SELECT * FROM barang WHERE nama LIKE '%"+barang+"%' AND penjual = 'SIP' ORDER BY id DESC", function(err, row, field){
					if(err) throw err;

					var html = view.compileFile('./template/distri/daftar.html') ({
						cookiebrdistri: cache,
						data: row,
						msg: "Menampilkan hasil pencarian untuk : " + barang
					});

					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(html);
				});
			} else res.redirect('/loginadmin');
		});
	});

	app.get('/tambahdistri', function(req, res){
		cache = [req.cookies.reqvede];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				var html = view.compileFile('./template/distri/tambah.html') ({
					cookiebrdistri: cache,
				});

				res.writeHead(200, {"Content-Type": "text/html"});
				res.end(html);
			} else res.redirect('/loginadmin');
		});
	});

	app.post('/tambahdistri', upload.single('img'), function(req, res){
		nama      = req.body.nama;
		harga     = req.body.harga;
		berat     = req.body.berat;
		stok      = req.body.stok;
		img       = "img/"+req.file.originalname;
		
		datas = [nama, harga, berat, stok, img, "SIP", 0];
		
		connection.query("INSERT INTO barang VALUES (NULL, ?, ?, ?, ?, ?, ?, ?) ", datas,
		function(err, field){
			connection.query("SELECT id FROM barang WHERE nama = ? AND penjual = 'SIP'", nama,
			function(err, row, field){

				id    = row[0].id;
				timenow();
				datas = [id, time];

				connection.query("INSERT INTO barang_masuk VALUES (NULL, ?, ?, 0)", datas,
					function(err, field){
					if(err) throw err;

					res.writeHead(302, {"Location": "/tambahdistri"});
					res.end();
				});
			});
		});
	});

	app.get('/editbarang/admin/:id', function(req, res){
		cache = [req.cookies.reqvera];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				id = req.params.id;
				connection.query("SELECT * FROM barang WHERE id = ?", id,
					function(err, row, field){
					if(err) throw err;

					var html = view.compileFile('./template/admin/edit.html') ({
						cookiebradmin: cache,
						data: row[0]
					});

					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(html);
				});
			} else res.redirect('/loginadmin');
		});
	});

	app.post('/editbarang/admin/:id', function(req, res){
		cache = [req.cookies.reqvera];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				id    = req.params.id;
				nama  = req.body.nama;
				harga = req.body.harga;
				berat = req.body.berat;
				stok  = req.body.stok;
				datas = [nama, harga, berat, stok, id];

				connection.query("UPDATE barang SET nama = ?, harga = ?, berat = ?, stok = ? WHERE id = ?", datas,
					function(err, row, field){
					if(err) throw err;

					res.redirect('/barangadmin');
				});
			} else res.redirect('/loginadmin');
		});
	});

	app.get('/deletebarang/admin/:id', function(req, res){
		cache = [req.cookies.reqvera];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				id = req.params.id;
				connection.query("DELETE FROM barang WHERE id = ?", id,
					function(err, row, field){
					if(err) throw err;

					res.redirect('/barangadmin');
				});
			} else res.redirect('/login');
		});
	});

	app.get('/editbarang/distri/:id', function(req, res){
		cache = [req.cookies.reqvede];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				id = [req.params.id];
				connection.query("SELECT * FROM barang WHERE id = ?", id,
				function(err, row, field){
					if(err) throw err;

					var html = view.compileFile('./template/distri/edit.html') ({
						cookiebrdistri: cache,
						data: row[0]
					});

					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(html);
				});
			} else res.redirect('/loginadmin');
		});
	});

	app.post('/editbarang/distri/:id', function(req, res){
		cache = [req.cookies.reqvede];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				id    = req.params.id;
				nama  = req.body.nama;
				harga = req.body.harga;
				berat = req.body.berat;
				stok  = req.body.stok;
				datas = [nama, harga, berat, stok, id];

				connection.query("UPDATE barang SET nama = ?, harga = ?, berat = ?, stok = ? WHERE id = ?", datas,
					function(err, row, field){
					if(err) throw err;

					res.redirect('/barangdistri');
				});
			} else res.redirect('/loginadmin');
		});
	});

	app.get('/deletebarang/distri/:id', function(req, res){
		cache = [req.cookies.reqvede];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				id = [req.params.id];
				connection.query("DELETE FROM barang WHERE id = ?", id,
				function(err, row, field){
					if(err) throw err;

					res.redirect('/barangdistri');
				});
			} else res.redirect('/login');
		});
	});

	app.get('/member', function(req, res){
		cache = [req.cookies.reqvera];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				connection.query("SELECT * FROM user ORDER BY nama",
				function(err, row, field){
					if(err) throw err;

					var html = view.compileFile('./template/admin/member.html') ({
						cookiebradmin: cache,
						data: row
					});

					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(html);
				});
			} else res.redirect('/loginadmin');
		});
	});

	app.post('/member', function(req, res){
		member = req.body.search;
		cache  = [req.cookies.reqvera];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){

				datas = ['%'+member+'%'];
				if(row.length){
					connection.query("SELECT * FROM user WHERE nama LIKE ? ORDER BY nama", datas,
					 function(err, row, field){
						if(err) throw err;

						var html = view.compileFile('./template/admin/member.html') ({
							cookiebradmin: cache,
							data: row,
							msg: "Menampilkan hasil pencarian untuk : " + member
						});

						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					});
				} else res.redirect('/login');
		});
	});

	app.get('/masukadmin', function(req, res){
		cache = [req.cookies.reqvera];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				connection.query("UPDATE barang_masuk SET ir = '1'",
				function(err, row, field){
					connection.query("SELECT barang_masuk.*, barang.nama FROM barang_masuk INNER JOIN barang ON barang_masuk.id_barang = barang.id ORDER BY id DESC",
					function(err, row, field){
						if(err) throw err;					

						var html = view.compileFile('./template/admin/masuk.html') ({
							cookiebradmin: cache,
							data: row,
							total: row.length
						});

						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					});
				});
			} else res.redirect('/loginadmin');
		});
	});

	app.get('/bcmasuk', function(req, res){
		cache = [req.cookies.reqvera];
		connection.query("SELECT * FROM admin WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				connection.query("SELECT count(ir) AS ir FROM barang_masuk WHERE ir = '0'",
				function(err, row, field){
					if(err) throw err;					
					ir = row[0].ir;
					
					res.end(ir.toString());
				});
			} else res.redirect('/loginadmin');
		});
	});

};