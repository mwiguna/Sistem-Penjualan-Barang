
module.exports = function(app, view, connection, upload, timenow){

	app.get('/biodata', function(req, res){
		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){

			if(row.length){
				me = row[0].id;
				var html = view.compileFile('./template/user/biodata.html')({
					cookiebruser: cache,
					data: row[0],
					me: me,
					msg: "Harap melengkapi biodata sebelum melakukan pembelian."
				});

				res.writeHead(200, {"Content-Type": "text/html"});
				res.end(html);
			} else {
				res.redirect('/login');
			}
		});
	});

	app.post('/biodata/:id', function(req, res){
		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				me      = row[0].id;
				id      = req.params.id;
				nama    = req.body.nama;
				email   = req.body.email;
				nohp    = req.body.nohp;
				alamat  = req.body.alamat;
				kota	= req.body.vo;
				namarek = req.body.namarek;
				bank    = req.body.bank;
				datas   = [nama, email, nohp, alamat, kota, namarek, bank, id];

				if(me != id) res.redirect('/homeuser');
				connection.query("UPDATE user SET nama = ?, email = ?, nohp = ?, alamat = ?, kota = ?, namarek = ?, bank = ? WHERE id = ?", datas,
					function(err, row, field){
					if(err) throw err;

					res.redirect('/biodata');
				});
			} else res.redirect('/login');
		});
	});

	app.get('/pembelian', function(req, res){
		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
		function(err, row, field){

			if(row.length){
				me = row[0].id;
				id = [me];

					connection.query("SELECT pembelian.*, barang.harga, barang.nama FROM pembelian INNER JOIN barang ON pembelian.id_barang = barang.id AND id_pemesan = ? ORDER BY id DESC", id,
					function(err, row, field){

						var html = view.compileFile('./template/user/pembelian.html')({
							cookiebruser: cache,
							data: row,
							me: me
						});

						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					});

			} else res.redirect('/login');
		});
	});

	app.get('/confirm/:id', function(req, res){
		cache = [req.cookies.reqvedu];

		connection.query("SELECT * FROM user WHERE cache = ?", cache,
		function(err, row, field){

			if(row.length){
				me   = row[0].id;
				name = row[0].nama;
				id   = [req.params.id, me];
				rows = row[0];

				connection.query("SELECT pembelian.*, barang.harga, barang.nama FROM pembelian INNER JOIN barang ON pembelian.id_barang = barang.id AND pembelian.id = ? AND pembelian.id_pemesan = ?", id,
				function(err, row, field){
					if(row.length){
						var html = view.compileFile('./template/user/konfirmasi.html')({
							cookiebruser: cache,
							data: row[0],
							rows: rows,
							name: name,
							me: me
						});

						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					} else res.redirect('/homeuser');
				});

			} else res.redirect('/login');
		});
	});


	app.post('/confirm/:id', function(req, res){
		cache = [req.cookies.reqvedu];

		connection.query("SELECT * FROM user WHERE cache = ?", cache,
		function(err, row, field){

			if(row.length){
				me      = row[0].id;
				namarek = req.body.namarek;
				bank    = req.body.bank;
				datas   = [namarek, bank, req.params.id, me];

				connection.query("UPDATE pembelian SET ir = 1, namarek = ?, bank = ? WHERE id = ? AND id_pemesan = ?", datas,
				function(err, row, field){

					connection.query("SELECT * FROM pembelian WHERE id = ?", req.params.id,
					function(err, row, field){

						datas = [req.params.id, row[0].id_pengirim];
						connection.query("INSERT INTO penjualan VALUES (NULL, ?, ?, 0, NULL, 0, 0)", datas,
						function(err, row, field){

							res.redirect('/pembelian');
						});

					});
				});

			} else res.redirect('/login');
		});
	});

	app.get('/notajualuser/:id', function(req, res){
		cache = [req.cookies.reqvedu];

		connection.query("SELECT * FROM user WHERE cache = ?", cache,
		function(err, row, field){

			if(row.length){
				me   = row[0].id;
				id   = [req.params.id, me, me];

				connection.query("SELECT pembelian.*, penjualan.resi, barang.nama, barang.harga, user.nama AS pemesan FROM pembelian INNER JOIN penjualan INNER JOIN user INNER JOIN barang ON penjualan.id_pembelian = pembelian.id AND user.id = pembelian.id_pemesan AND barang.id = pembelian.id_barang AND pembelian.id = ? AND (pembelian.id_pemesan = ? OR pembelian.id_pengirim = ?)", id,
				function(err, row, field){
					if(row.length){
						rows = row[0];
						idu  = [rows.id_pengirim];
						connection.query("SELECT nama FROM user WHERE id = ?", idu,
						function(err, row, field){
							pengirim = row[0].nama;

							var html = view.compileFile('./template/user/nota.html')({
								cookiebruser: cache,
								data: rows,
								id: req.params.id,
								me: me,
								pengirim: pengirim
							});

							res.writeHead(200, {"Content-Type": "text/html"});
							res.end(html);
						});
					} else res.redirect('/homeuser');
				});

			} else res.redirect('/login');
		});
	});

	app.get('/tambahuser', function(req, res){
		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){

			if(row.length){
				var html = view.compileFile('./template/user/tambah.html')({
					cookiebruser: cache,
					me: row[0].id
				});

				res.writeHead(200, {"Content-Type": "text/html"});
				res.end(html);
			}	else {
				res.redirect('/login');
			}

		});
	});

	app.post('/resi/:id', function(req, res){
		resi  = req.body.resi;
		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){
			
			if(row.length){
				datas = [resi, req.params.id];
				
				connection.query("UPDATE penjualan SET resi = ? WHERE id_pembelian = ?", datas,
					function(err, field){
					res.redirect('/notajualuser/'+req.params.id);
				});
			} else res.redirect('/login');
		});
	});

	app.post('/tambahuser', upload.single('img'), function(req, res){
		nama      = req.body.nama;
		harga     = req.body.harga;
		stok      = req.body.stok;
		berat     = req.body.berat;
		img       = "img/"+req.file.originalname;
		
		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){
			
			if(row.length){
				datas = [nama, harga, berat, stok, img, row[0].nama, row[0].id];
				
				connection.query("INSERT INTO barang VALUES (NULL, ?, ?, ?, ?, ?, ?, ?) ", datas,
					function(err, field){
						if(err) throw err;
						res.writeHead(302, {"Location": "/tambahuser"});
						res.end();
				});
			} else res.redirect('/login');
		});
	});

	app.get('/cancel/:id', function(req, res){
		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){
			
			if(row.length){
				id = row[0].id;
				connection.query("SELECT id_pemesan FROM pembelian WHERE id = ?", [req.params.id],
				function(err, row, field){
					if(row.length) if(id != row[0].id_pemesan) res.redirect('/homeuser');
					else {
						connection.query("DELETE FROM pembelian WHERE id = ?", [req.params.id],
							function(err, field){	
							res.redirect('/pembelian');
						});
					}
					else res.redirect('/homeuser'); 
				});
			} else res.redirect('/login');
		});
	});

	app.get('/baranguser', function(req, res){

		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){
			
			if(row.length){
				me         = row[0].id;
				cookieuser = row[0].cache;
				connection.query("SELECT * FROM barang WHERE id_penjual = '"+me+"' ORDER BY id DESC",
				function(err, row, field){
					if(err) throw err;

					var html = view.compileFile('./template/user/daftar.html') ({
						cookiebruser: cache,
						me: me,
						data: row
					});

					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(html);
				});
			} else res.redirect('/login');

		});
	});

	app.post('/baranguser', function(req, res){
		barang = req.body.search;
		cache  = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){

				if(row.length){
					connection.query("SELECT * FROM barang WHERE nama LIKE '%"+barang+"%' AND id_penjual = '"+row[0].id+"' ORDER BY id DESC", function(err, row, field){
						if(err) throw err;

						var html = view.compileFile('./template/user/daftar.html') ({
							cookiebruser: cache,
							data: row,
							msg: "Menampilkan hasil pencarian untuk : " + barang
						});

						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					});
				} else res.redirect('/login');
		});
	});

	app.get('/editbarang/user/:id', function(req, res){
		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				id = [req.params.id, row[0].id];
				connection.query("SELECT * FROM barang WHERE id = ? AND id_penjual = ?", id,
				function(err, row, field){
					if(err) throw err;

					if(row.length){
						var html = view.compileFile('./template/user/edit.html') ({
							cookiebruser: cache,
							data: row[0]
						});

						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					} else res.redirect('/homeuser');
				});
			} else res.redirect('/login');
		});
	});

	app.post('/editbarang/user/:id', function(req, res){
		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
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

					res.redirect('/baranguser');
				});
			} else res.redirect('/login');
		});
	});

	app.get('/deletebarang/user/:id', function(req, res){
		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				id = [req.params.id];
				connection.query("DELETE FROM barang WHERE id = ?", id,
				function(err, row, field){
					if(err) throw err;

					res.redirect('/baranguser');
				});
			} else res.redirect('/login');
		});
	});

	app.get('/buy/:id', function(req, res){
		cache = req.cookies.reqvedu;

		if(cache){
			table = "user";	
			cache = [cache];
		} 
		else {
			table = "admin";
			cache = [req.cookies.reqvera];
		}
		connection.query("SELECT * FROM "+table+" WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				id   = [req.params.id];
				rows = row[0];
				connection.query("SELECT barang.*, user.kota FROM barang INNER JOIN user ON user.id = barang.id_penjual AND barang.id = ?", id,
				function(err, row, field){
					if(row.length){
						if(err) throw err;

						var html = view.compileFile('./template/buy.html') ({
							cookiebruser: cache,
							data: row[0],
							row: rows
						});

						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					} else res.redirect('/baranguser');
				});
			} else res.redirect('/login/err');
		});
	});

	app.post('/buy/:id', function(req, res){
		cache = [req.cookies.reqvedu];

		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				id    = [req.params.id];
				rows  = row[0];
				
				connection.query("SELECT * FROM barang WHERE id = ?", id,
				function(err, row, field){

					time  = new Date();
					year  = time.getFullYear();
					month = time.getMonth() + 1;
					date  = time.getDate();
					hour  = time.getHours();
					min   = time.getMinutes();
					sec   = time.getSeconds();
						
					if(month < 10) month = "0"+month;
					if(date  < 10) date  = "0"+date;
					if(hour  < 10) hour  = "0"+hour;
					if(min   < 10) min   = "0"+min;
					if(sec   < 10) sec   = "0"+sec;	

					time = year+"-"+month+"-"+date+" "+hour+":"+min+":"+sec;

					idbarang   = row[0].id;
					idpengirim = row[0].id_penjual;
					qty        = req.body.total;
					harga	   = row[0].harga;
					stok       = row[0].stok - qty;
					alamat     = req.body.alamat;
					ongkir 	   = req.body.ot;
					total      = (harga * qty) + (ongkir * 1);
					idpemesan  = rows.id;
					timenow    = time;
					datas      = [idbarang, qty, idpengirim, idpemesan, alamat, ongkir, timenow];
					
					connection.query("INSERT INTO pembelian VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, 0, NULL, NULL)", datas,
					function(err, row, field){
						if(err) throw err;

						datas = [stok, id];
						connection.query("UPDATE barang SET stok = ? WHERE id = ?", datas,
						function(err, row, field){
						
							var html = view.compileFile('./template/pembelian.html') ({
								cookiebruser: cache,
								row: rows,
								total: total
							});

							res.writeHead(200, {"Content-Type": "text/html"});
							res.end(html);

						});
					});
				});

			} else res.redirect('/login');
		});
	});

	app.post('/ongkir/:id', function(req, res){
		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				me    = row[0].id;
				datas = [req.body.ongkir, req.params.id];
				connection.query("UPDATE pembelian SET ongkir = ? WHERE id = ?", datas,
				function(err, row, field){
					if(err) throw err;

					res.redirect('/notajualuser/'+req.params.id);
				});
			} else res.redirect('/login');
		});
	});

	app.get('/memberuser', function(req, res){
		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				me   = row[0].id;
				user = " "+me+",";
				connection.query("SELECT * FROM user WHERE NOT cache = ? OR cache IS NULL ORDER BY nama", cache,
				function(err, row, field){
					if(err) throw err;

					var html = view.compileFile('./template/user/member.html') ({
						cookiebruser: cache,
						user: user,
						me: me,
						data: row
					});

					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(html);
				});
			} else res.redirect('/login');
		});
	});

	app.post('/memberuser', function(req, res){
		member = req.body.search;
		cache  = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){

				datas = ['%'+member+'%'];
				if(row.length){
					connection.query("SELECT * FROM user WHERE nama LIKE ? ORDER BY nama", datas,
					 function(err, row, field){
						if(err) throw err;

						var html = view.compileFile('./template/user/member.html') ({
							cookiebruser: cache,
							data: row,
							msg: "Menampilkan hasil pencarian untuk : " + member
						});

						res.writeHead(200, {"Content-Type": "text/html"});
						res.end(html);
					});
				} else res.redirect('/login');
		});
	});

	app.get('/teman', function(req, res){
		cache = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){
			if(err) throw err;

			if(row.length){
				me   = row[0].id;
				id   = [me];
				connection.query("SELECT teman.*, user.nama AS teman FROM teman INNER JOIN user ON user.id = teman.id_teman AND teman.id_user = ? ORDER BY user.nama", id,
				function(err, row, field){
					if(err) throw err;

					var html = view.compileFile('./template/user/teman.html') ({
						cookiebruser: cache,
						data: row,
						post: false,
						me: me
					});

					res.writeHead(200, {"Content-Type": "text/html"});
					res.end(html);
				});
			} else res.redirect('/login');
		});
	});

	app.post('/teman', function(req, res){
		teman  = req.body.search;
		cache  = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){

				me   = row[0].id;
				data = ['%'+teman+'%'];
				if(row.length){
					connection.query("SELECT id, nama FROM user WHERE nama LIKE ? ORDER BY nama", data,
					 function(err, row, field){
					 	rows = row;
						connection.query("SELECT * FROM teman WHERE id_user = ?", [me],
					 	function(err, row, field){

							var html = view.compileFile('./template/user/teman.html') ({
								cookiebruser: cache,
								data: rows,
								ids: row,
								post: true,
								msg: "Menampilkan hasil pencarian untuk : " + teman
							});

							res.writeHead(200, {"Content-Type": "text/html"});
							res.end(html);
						});
					});
				} else res.redirect('/login');
		});
	});

	app.get('/follow/:id/:idu', function(req, res){		
		cache  = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){

				me    = row[0].id;
				nama  = row[0].nama;
				id_u  = req.params.idu;
				id_t  = req.params.id;  
				datas = [id_u, id_t];
				if(row.length){
					connection.query("INSERT INTO teman VALUES (NULL, ?, ?)", datas,
					 function(err, row, field){
					 	ids = [id_t];		
					 	connection.query("SELECT * FROM user WHERE id = ?", ids,
						function(err, row, field){
							tems  = row[0].teman + " "+me+",";
						 	datas = [tems, id_t];		
							connection.query("UPDATE user SET teman = ? WHERE id = ?", datas,
								function(err, row, field){
									
								res.end();
							});
						});
					});
				} else res.redirect('/login');
		});
	});

	app.get('/unfollow/:id', function(req, res){		
		cache  = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){

				me    = row[0].id;
				id    = req.params.id;
				datas = [me, id];
				if(row.length){
					connection.query("DELETE FROM teman WHERE id_user = ? AND id_teman = ?", datas,
					 function(err, row, field){
					 	ids = [id];
					 	connection.query("SELECT * FROM user WHERE id = ?", ids,
						function(err, row, field){
							teman = row[0].teman;
							teman = teman.split(",");
							me    = teman.indexOf(" "+me);
							teman.splice(me, 1);
							teman = teman.toString();
							datas = [teman, id];

							connection.query("UPDATE user SET teman = ? WHERE id = ?", datas,
								function(err, row, field){
								if(err) throw err;
								res.end();
							});
						});		 	
					});
				} else res.redirect('/login');
		});
	});

	app.get('/pesanuser', function(req, res){
		cache  = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){

				if(row.length){
					me = row[0].id;
					datas = [me, me];
					connection.query("SELECT * FROM pesan WHERE id_pengirim = ? OR id_penerima = ? ORDER BY id DESC", datas,
					function(err, row, field){
						rows = row;
						datas = [me];
						connection.query("UPDATE pesan SET ir = '1' WHERE id_penerima = ?", datas,
						function(err, row, field){

							var html = view.compileFile('./template/user/pesan.html') ({
								cookiebruser: cache,
								ids: [],
								data: rows,
								me: me
							});

							res.writeHead(200, {"Content-Type": "text/html"});
							res.end(html);
						});
					});
				} else res.redirect('/login');
		});
	});

	app.get('/pesanuser/:id', function(req, res){
		cache  = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){
				id = [req.params.id];
			
				if(row.length){
					if(id == row[0].id) res.redirect('/pesanuser');
						else {
						me     = row[0].id;
						mename = row[0].nama;
						connection.query("SELECT * FROM user WHERE id = ?", id,
						function(err, row, field){
							iden  = row[0];
							datas = [me, req.params.id, req.params.id, me];
							connection.query("SELECT * FROM pesan WHERE id_pengirim = ? AND id_penerima = ? OR id_pengirim = ? AND id_penerima = ?", datas,
							function(err, row, field){

								var html = view.compileFile('./template/user/chat.html') ({
									cookiebruser: cache,
									iden: iden,
									me: me,
									mename: mename,
									data: row
								});

								res.writeHead(200, {"Content-Type": "text/html"});
								res.end(html);
							});		
						});
					}
				} else res.redirect('/login');
				
		});
	});

	app.post('/pesanuser/:id', function(req, res){
		pesan  = req.body.pesan; 
		cache  = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){

				if(row.length){
					id        = req.params.id;
					me        = row[0].id;
					pengirim  = row[0].nama;
					connection.query("SELECT * FROM user WHERE id = ?", [id],
					function(err, row, field){
						nama  = row[0].nama;
						timenow();
						datas = [me, id, nama, pengirim, pesan, time];

						connection.query("INSERT INTO pesan VALUES (NULL, ?, ?, ?, ?, ?, ?, 0)", datas,
						function(err, row, field){

							res.redirect("/pesanuser/"+id);
							
						});
					});
				} else res.redirect('/login');
		});
	});

	app.get('/bcpesan', function(req, res){ 
		cache  = [req.cookies.reqvedu];
		connection.query("SELECT * FROM user WHERE cache = ?", cache,
			function(err, row, field){

				if(row.length){
					ids = row[0].id;
					connection.query("SELECT count(ir) AS ir FROM pesan WHERE id_penerima = ? AND ir = '0'", ids,
					function(err, row, field){
						ir = row[0].ir;
						res.end(ir.toString());							
					});
				} else res.redirect('/login');
		});
	});


	app.get('/bcbeli', function(req, res){ 
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
					connection.query("SELECT penjualan.ir AS ir, pembelian.id_pengirim FROM penjualan INNER JOIN pembelian ON penjualan.id_pembelian = pembelian.id AND pembelian.id_pengirim = ? AND penjualan.ir_user = '0' AND penjualan.validasi = 1", ids,
					function(err, row, field){
						ir = row.length;
						res.end(ir.toString());							
					});
				} else res.redirect('/login');
		});
	});

	app.post('/cekOngkir', function(req, res){
		
		var qs   = require("querystring");
		var http = require("http");

		var options = {
		  "method": "POST",
		  "hostname": "api.rajaongkir.com",
		  "port": null,
		  "path": "/starter/cost",
		  "headers": {
		    "key": "71026f242bb97069882d5debfced6409",
		    "content-type": "application/x-www-form-urlencoded"
		  }
		};

		asal   = req.body.asal;
		tujuan = req.body.tujuan;
		berat  = req.body.berat;
		resM   = res;

		var req = http.request(options, function (res) {
		  var chunks = [];

		  res.on("data", function (chunk) {
		    chunks.push(chunk);
		  });

		  res.on("end", function () {
		    var body = Buffer.concat(chunks);
		    var body = JSON.parse(body);
		    var cek  = body.rajaongkir.results[0].costs[1];
		    if(cek != undefined){
		    	var cost = body.rajaongkir.results[0].costs[1].cost[0].value;
		    	resM.json(cost.toString());
			} else resM.json(false);
		  });
		});

		req.write(qs.stringify({ origin: asal,
		  destination: tujuan,
		  weight: berat,
		  courier: 'jne' })
		);

		req.end();
	});

};