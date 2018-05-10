-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2016 at 03:32 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_sipeba`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cache` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `password`, `cache`) VALUES
(1, 'admin', 'admin@sip.com', 'sha1$c490b12d$1$f52ffe262d66c8d76115f425198bac7e3ac91a41', NULL),
(2, 'distri', 'distri@sip.com', 'sha1$a0ed46ac$1$84d123cdf98f7802ffac1b3d6ac625540211daec', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL,
  `berat` int(11) NOT NULL DEFAULT '0',
  `stok` int(11) NOT NULL,
  `img` varchar(255) NOT NULL,
  `penjual` varchar(255) NOT NULL,
  `id_penjual` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `nama`, `harga`, `berat`, `stok`, `img`, `penjual`, `id_penjual`) VALUES
(35, 'Mouse Wireless', 120000, 1000, 15, 'img/mouse.jpg', 'SIP', 0),
(36, 'Flashdisk 16 GB', 140000, 1000, 25, 'img/fd16.jpg', 'Ade', 2),
(37, 'Keyboard Wireless', 200000, 1000, 34, 'img/keyboard.jpg', 'SIP', 0),
(38, 'Flashdisk 8GB', 60000, 1000, 15, 'img/fd8.jpg', 'SIP', 0),
(39, 'Flashdisk 2 GB', 25000, 1000, 22, 'img/fd2.jpg', 'Tiqa', 5),
(40, 'Flashdisk 64GB Diskon', 190000, 1000, 5, 'img/fd64.jpg', 'SIP', 0),
(41, 'Mouse Gaming ', 50000, 1000, 55, 'img/mouse.jpg', 'SIP', 0),
(42, 'Flashdisk 4GB', 56000, 1000, 20, 'img/fd4.jpg', 'SIP', 0),
(43, 'Flashdisk 16GB Gulung Tikar ', 45000, 1000, 55, 'img/fd16.jpg', 'SIP', 0),
(44, 'Flashdisk 4GB Bekas Amin Richman', 500000000, 1000, 1, 'img/fd4.jpg', 'SIP', 0),
(45, 'Flashdisk 64 GB Murah', 150000, 1000, 95, 'img/fd64.jpg', 'Ade', 2),
(46, 'Flashdisk 2GB bukan yang biasa', 100000, 1000, 0, 'img/fd2.jpg', 'SIP', 0),
(47, 'Flashdisk 16GB HelloWorld.html Included', 450000, 900, 21, 'img/fd16.jpg', 'SIP', 0),
(48, 'Flashdisk 8 GB', 50000, 1200, 11, 'img/fd8.jpg', 'Tiqa', 5),
(49, 'Flashdisk 16 GB', 90000, 800, 7, 'img/fd16.jpg', 'Ade', 2),
(50, 'Flashdisk 2 GB', 45000, 600, 12, 'img/fd2.jpg', 'SIP', 0),
(51, 'Flashdisk 4 GB', 65000, 550, 0, 'img/fd4.jpg', 'SIP', 0),
(53, 'Flashdisk 16 GB SE', 170000, 900, 35, 'img/fd16.jpg', 'SIP', 0),
(54, 'Flashdisk 8 GB', 70000, 700, 25, 'img/fd8.jpg', 'SIP', 0),
(55, 'Flashdisk 2 GB Terbaru', 50000, 500, 7, 'img/fd2.jpg', 'SIP', 0),
(56, 'Flashdisk 64 GB', 215000, 800, 25, 'img/fd64.jpg', 'Tiqa', 5);

-- --------------------------------------------------------

--
-- Table structure for table `barang_masuk`
--

CREATE TABLE `barang_masuk` (
  `id` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `waktu` varchar(255) NOT NULL,
  `ir` int(3) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `barang_masuk`
--

INSERT INTO `barang_masuk` (`id`, `id_barang`, `waktu`, `ir`) VALUES
(16, 35, '2016-10-26 19:49:49', 1),
(17, 37, '2016-10-27 19:34:54', 1),
(18, 38, '2016-10-27 19:36:40', 1),
(19, 40, '2016-10-28 17:15:06', 1),
(20, 41, '2016-10-28 22:41:53', 1),
(21, 42, '2016-10-28 22:42:32', 1),
(22, 43, '2016-10-28 22:46:23', 1),
(23, 44, '2016-10-28 22:48:27', 1),
(24, 46, '2016-10-29 14:03:39', 1),
(25, 47, '2016-10-29 14:04:56', 1),
(29, 55, '2016-12-02 11:25:17', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pembelian`
--

CREATE TABLE `pembelian` (
  `id` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `id_pengirim` int(11) NOT NULL,
  `id_pemesan` int(11) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `ongkir` int(11) NOT NULL DEFAULT '0',
  `waktu` varchar(255) NOT NULL,
  `ir` int(11) NOT NULL,
  `namarek` varchar(255) DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pembelian`
--

INSERT INTO `pembelian` (`id`, `id_barang`, `qty`, `id_pengirim`, `id_pemesan`, `alamat`, `ongkir`, `waktu`, `ir`, `namarek`, `bank`) VALUES
(45, 39, 1, 5, 4, 'Jambi', 15000, '2016-11-28 09:26:22', 0, NULL, NULL),
(46, 39, 2, 5, 4, 'Jambi', 10000, '2016-11-28 13:30:51', 0, NULL, NULL),
(61, 50, 2, 0, 5, 'California', 22000, '2016-12-01 18:37:46', 1, 'Tiqa Quintilia', 'BRI'),
(64, 47, 1, 0, 5, 'California', 22000, '2016-12-01 19:13:53', 1, 'Tiqa Quintilia', 'BRI'),
(65, 50, 1, 0, 5, 'Jl. Teuku Umar, No.044, Rt.021, Rw.005, Kec. Telanai Pura, Jambi ', 22000, '2016-12-01 19:20:51', 1, 'Tiqa Quintilia', 'BRI'),
(66, 48, 2, 5, 2, 'Jambi', 57000, '2016-12-08 09:11:57', 1, 'Ade', 'BRI'),
(67, 48, 1, 5, 2, 'Jambi', 19000, '2016-12-08 09:16:16', 1, 'Ade', 'BRI'),
(68, 55, 2, 0, 5, 'Jl. Teuku Umar, No.044, Rt.021, Rw.005, Kec. Telanai Pura, Jambi ', 22000, '2016-12-08 11:04:42', 1, 'Tiqa Quintilia', 'BRI'),
(69, 49, 2, 2, 5, 'Jl. Teuku Umar, No.044, Rt.021, Rw.005, Kec. Telanai Pura, Jambi ', 44000, '2016-12-08 11:40:24', 1, 'Tiqa Quintilia', 'BRI'),
(70, 55, 1, 0, 5, 'Jl. Teuku Umar, No.044, Rt.021, Rw.005, Kec. Telanai Pura, Jambi ', 22000, '2016-12-09 14:45:32', 1, 'Tiqa Quintilia', 'BRI'),
(71, 48, 1, 5, 2, 'Jambi', 19000, '2016-12-09 14:52:39', 1, 'Ade', 'BRI'),
(72, 50, 1, 0, 1, 'Jln. Kemajuan No.034', 19000, '2016-12-10 02:15:43', 1, 'Andi ', 'BCA');

-- --------------------------------------------------------

--
-- Table structure for table `penjualan`
--

CREATE TABLE `penjualan` (
  `id` int(11) NOT NULL,
  `id_pembelian` int(11) NOT NULL,
  `id_sender` int(11) NOT NULL,
  `validasi` int(1) NOT NULL DEFAULT '0',
  `resi` varchar(100) DEFAULT NULL,
  `ir` int(11) NOT NULL,
  `ir_user` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `penjualan`
--

INSERT INTO `penjualan` (`id`, `id_pembelian`, `id_sender`, `validasi`, `resi`, `ir`, `ir_user`) VALUES
(51, 65, 0, 0, 'B333', 1, 0),
(52, 64, 0, 0, NULL, 1, 0),
(53, 66, 5, 1, 'A123', 1, 1),
(54, 67, 5, 0, NULL, 1, 1),
(55, 69, 2, 1, 'A12345', 1, 0),
(56, 68, 0, 0, NULL, 1, 0),
(57, 61, 0, 0, NULL, 1, 0),
(59, 70, 0, 0, NULL, 1, 0),
(63, 71, 5, 1, 'CX1234TRADD', 1, 1),
(64, 72, 0, 1, NULL, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pesan`
--

CREATE TABLE `pesan` (
  `id` int(11) NOT NULL,
  `id_pengirim` int(11) NOT NULL,
  `id_penerima` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `pengirim` varchar(255) NOT NULL,
  `pesan` varchar(255) NOT NULL,
  `waktu` varchar(255) NOT NULL,
  `ir` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pesan`
--

INSERT INTO `pesan` (`id`, `id_pengirim`, `id_penerima`, `nama`, `pengirim`, `pesan`, `waktu`, `ir`) VALUES
(6, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'de', '2016-10-26 22:19:06', 1),
(7, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'bisa beli gak?', '2016-10-26 22:19:06', 1),
(8, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'saya usahakan kak', '2016-10-26 22:28:32', 1),
(9, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'tes disini', '2016-10-27 08:12:33', 1),
(10, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'pagi', '2016-10-27 08:12:33', 1),
(11, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'disini', '2016-10-27 08:15:33', 1),
(18, 5, 1, 'Andi', 'Tiqa', 'i', '2016-10-27 11:48:12', 0),
(19, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'kaka :(', '2016-10-27 14:03:00', 1),
(20, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'Kok gitu sih', '2016-10-27 15:22:54', 1),
(21, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'Hai syang', '2016-10-27 15:25:51', 1),
(54, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'ini loh', '2016-10-27 16:26:14', 1),
(55, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'apa itu', '2016-10-27 17:38:14', 1),
(56, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'masak gak tau sih', '2016-10-27 17:44:07', 1),
(57, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'siapa coba', '2016-10-27 17:51:26', 1),
(58, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'gak tau', '2016-10-27 18:03:20', 1),
(59, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'de', '2016-10-27 18:04:13', 1),
(60, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'titut', '2016-10-27 18:05:00', 1),
(61, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'de', '2016-10-27 18:06:12', 1),
(64, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'hai juga', '2016-10-27 18:07:34', 1),
(65, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'gini loh', '2016-10-27 18:08:14', 1),
(66, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'lah kok', '2016-10-27 18:09:38', 1),
(67, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'apa sayang', '2016-10-27 18:10:36', 1),
(68, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'gak ada sih', '2016-10-27 18:10:42', 1),
(69, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'yes mau', '2016-10-27 18:10:46', 1),
(70, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'apa', '2016-10-27 18:17:54', 1),
(71, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'disini log', '2016-10-27 18:20:01', 1),
(72, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'sih', '2016-10-27 18:21:15', 1),
(73, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'de', '2016-10-27 18:27:18', 1),
(74, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'de', '2016-10-27 18:29:55', 1),
(75, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'de', '2016-10-27 18:30:32', 1),
(76, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'de', '2016-10-27 18:31:36', 1),
(77, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'de', '2016-10-27 18:33:56', 1),
(78, 5, 1, 'Andi', 'Tiqa', 'lah makan', '2016-10-28 13:18:45', 0),
(79, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'gege', '2016-10-28 13:18:55', 1),
(80, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'just the way you arre', '2016-10-28 13:24:21', 1),
(81, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'dede', '2016-10-28 13:26:58', 1),
(82, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'hai danil', '2016-10-28 13:27:05', 1),
(83, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'dita', '2016-10-28 13:29:45', 1),
(84, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'hai danil', '2016-10-28 13:29:48', 1),
(85, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'danil sayang motherfar', '2016-10-28 13:29:53', 1),
(86, 5, 1, 'Andi', 'Tiqa', 'hai nadi', '2016-10-28 13:35:46', 0),
(87, 5, 1, 'Andi', 'Tiqa', 'dimana', '2016-10-28 13:35:54', 0),
(88, 5, 1, 'Andi', 'Tiqa', 'hai juga', '2016-10-28 13:35:56', 0),
(89, 2, 5, 'Tiqa', 'Ade', 'disini', '2016-10-28 13:45:42', 1),
(90, 2, 5, 'Tiqa', 'Ade', 'apa sayang', '2016-10-28 13:47:44', 1),
(91, 5, 2, 'Ade', 'Tiqa', 'ih kamu sayang sayang', '2016-10-28 13:48:25', 1),
(92, 5, 2, 'Ade', 'Tiqa', 'dimana hatimu', '2016-10-28 13:53:27', 1),
(93, 5, 2, 'Ade', 'Tiqa', 'tidak dimana mana', '2016-10-28 13:53:32', 1),
(94, 5, 2, 'Ade', 'Tiqa', 'hai sayng', '2016-10-28 13:53:34', 1),
(95, 2, 5, 'Tiqa', 'Ade', 'aku mau coba kamu ya', '2016-10-28 14:06:31', 1),
(96, 2, 5, 'Tiqa', 'Ade', 'sad', '2016-10-28 14:11:38', 1),
(97, 2, 5, 'Tiqa', 'Ade', 'de', '2016-10-28 14:14:24', 1),
(98, 2, 5, 'Tiqa', 'Ade', 'adam', '2016-10-28 14:14:52', 1),
(99, 4, 5, 'Tiqa', 'Hilman Ramadhan', 'aku mau', '2016-10-28 14:27:10', 1),
(100, 5, 2, 'Ade', 'Tiqa', 'terima kasih', '2016-10-28 14:31:58', 1),
(101, 5, 1, 'Andi', 'Tiqa', 'Saya ing', '2016-10-28 14:32:58', 0),
(102, 2, 5, 'Tiqa', 'Ade', 'disanan', '2016-10-28 14:33:10', 1),
(103, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'dede', '2016-10-28 14:34:38', 1),
(104, 2, 5, 'Tiqa', 'Ade', 'hai', '2016-10-28 14:34:45', 1),
(105, 2, 5, 'Tiqa', 'Ade', 'haha', '2016-10-28 14:37:53', 1),
(106, 2, 5, 'Tiqa', 'Ade', 'fa', '2016-10-28 14:38:13', 1),
(107, 2, 5, 'Tiqa', 'Ade', 'de', '2016-10-28 14:40:22', 1),
(108, 2, 5, 'Tiqa', 'Ade', 'aku', '2016-10-28 14:40:24', 1),
(109, 2, 5, 'Tiqa', 'Ade', 'pem', '2016-10-28 14:40:27', 1),
(110, 2, 5, 'Tiqa', 'Ade', 'hapus', '2016-10-28 14:40:30', 1),
(111, 2, 5, 'Tiqa', 'Ade', 'soalnya', '2016-10-28 14:40:33', 1),
(112, 2, 5, 'Tiqa', 'Ade', ' saya', '2016-10-28 14:40:34', 1),
(113, 2, 5, 'Tiqa', 'Ade', 'ini', '2016-10-28 14:40:35', 1),
(114, 2, 5, 'Tiqa', 'Ade', 'sepam', '2016-10-28 14:40:38', 1),
(115, 2, 5, 'Tiqa', 'Ade', 's', '2016-10-28 14:40:42', 1),
(116, 5, 1, 'Andi', 'Tiqa', 'anid', '2016-10-28 14:45:41', 0),
(117, 2, 5, 'Tiqa', 'Ade', 'uwara ', '2016-10-28 14:45:50', 1),
(118, 2, 5, 'Tiqa', 'Ade', 'dia', '2016-10-28 15:46:32', 1),
(119, 2, 5, 'Tiqa', 'Ade', 'hai', '2016-10-28 15:49:46', 1),
(120, 2, 5, 'Tiqa', 'Ade', 'tet', '2016-10-28 15:49:57', 1),
(121, 2, 5, 'Tiqa', 'Ade', 'tet', '2016-10-28 15:50:15', 1),
(122, 2, 5, 'Tiqa', 'Ade', 'de', '2016-10-28 15:50:54', 1),
(123, 6, 5, 'Tiqa', 'Reno Terbang', 'kembali', '2016-10-28 15:53:36', 1),
(124, 6, 2, 'Ade', 'Reno Terbang', 'detik', '2016-10-28 15:54:21', 1),
(125, 6, 2, 'Ade', 'Reno Terbang', 'no way', '2016-10-28 15:55:40', 1),
(126, 6, 2, 'Ade', 'Reno Terbang', 'hai sayang', '2016-10-28 15:55:50', 1),
(127, 2, 5, 'Tiqa', 'Ade', 'apa saynag', '2016-10-28 15:56:01', 1),
(128, 2, 5, 'Tiqa', 'Ade', 'apa sayang', '2016-10-28 15:56:06', 1),
(129, 6, 2, 'Ade', 'Reno Terbang', 'nah', '2016-10-28 15:56:24', 1),
(130, 2, 5, 'Tiqa', 'Ade', 'cik cik', '2016-10-28 15:56:46', 1),
(131, 6, 5, 'Tiqa', 'Reno Terbang', 'cepat pulang', '2016-10-28 16:06:48', 1),
(132, 6, 5, 'Tiqa', 'Reno Terbang', 'ternary', '2016-10-28 16:07:30', 1),
(133, 5, 6, 'Reno Terbang', 'Tiqa', ' sayang', '2016-10-28 16:07:41', 1),
(134, 6, 5, 'Tiqa', 'Reno Terbang', 'dek kakak rindu', '2016-10-28 16:07:48', 1),
(135, 6, 5, 'Tiqa', 'Reno Terbang', 'lumayan', '2016-10-28 16:07:50', 1),
(136, 5, 2, 'Ade', 'Tiqa', 'hei', '2016-10-28 22:10:20', 1),
(137, 2, 5, 'Tiqa', 'Ade', 'Apa', '2016-10-28 22:10:38', 1),
(138, 2, 5, 'Tiqa', 'Ade', 'Dimana', '2016-10-28 22:10:56', 1),
(139, 5, 2, 'Ade', 'Tiqa', 'disini', '2016-10-28 22:12:08', 1),
(140, 2, 5, 'Tiqa', 'Ade', 'Bohong', '2016-10-28 22:12:22', 1),
(141, 2, 5, 'Tiqa', 'Ade', 'Coba', '2016-10-28 22:12:51', 1),
(142, 5, 2, 'Ade', 'Tiqa', 'apa sih dek', '2016-10-28 22:12:59', 1),
(143, 2, 5, 'Tiqa', 'Ade', 'Kok gitu sih', '2016-10-28 22:26:57', 1),
(144, 2, 5, 'Tiqa', 'Ade', 'Hehe canda', '2016-10-28 22:27:04', 1),
(145, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'apa sih', '2016-10-28 22:27:11', 1),
(146, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'dimana', '2016-10-28 22:27:21', 1),
(147, 5, 4, 'Hilman Ramadhan', 'Tiqa', 'dadada', '2016-10-28 22:32:09', 1),
(148, 2, 5, 'Tiqa', 'Ade', 'Apa sih', '2016-10-28 22:32:26', 1),
(149, 5, 2, 'Ade', 'Tiqa', 'apa sayang', '2016-10-28 22:32:40', 1),
(150, 2, 5, 'Tiqa', 'Ade', 'Gak ada', '2016-10-28 22:32:47', 1),
(151, 5, 2, 'Ade', 'Tiqa', 'ada kok', '2016-10-28 22:33:26', 1),
(152, 2, 5, 'Tiqa', 'Ade', 'Ada apa', '2016-10-28 22:33:32', 1),
(153, 2, 5, 'Tiqa', 'Ade', 'Hayo hil', '2016-10-28 22:33:55', 1),
(154, 2, 5, 'Tiqa', 'Ade', 'pagi kakak', '2016-10-29 12:50:13', 1),
(155, 5, 2, 'Ade', 'Tiqa', 'Pagi juga kakak', '2016-10-29 12:50:25', 1),
(156, 2, 5, 'Tiqa', 'Ade', 'hm', '2016-10-29 12:54:21', 1),
(157, 2, 5, 'Tiqa', 'Ade', 'dedek', '2016-10-29 12:54:25', 1),
(158, 5, 2, 'Ade', 'Tiqa', 'Kamu nakal', '2016-10-29 12:54:41', 1),
(159, 5, 2, 'Ade', 'Tiqa', 'de', '2016-11-02 23:01:59', 1),
(160, 5, 2, 'Ade', 'Tiqa', 'hei', '2016-11-04 21:34:46', 1),
(161, 5, 2, 'Ade', 'Tiqa', 'error', '2016-12-02 11:18:55', 0),
(162, 5, 6, 'Reno Terbang', 'Tiqa', 'cihui', '2016-12-02 14:34:09', 0),
(163, 5, 6, 'Reno Terbang', 'Tiqa', 'ahah', '2016-12-02 14:44:45', 0),
(164, 5, 2, 'Ade', 'Tiqa', 'Good Job', '2016-12-10 03:07:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `teman`
--

CREATE TABLE `teman` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_teman` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teman`
--

INSERT INTO `teman` (`id`, `id_user`, `id_teman`) VALUES
(36, 2, 8),
(37, 1, 8),
(38, 5, 8),
(39, 5, 11),
(40, 5, 10),
(41, 1, 10),
(42, 1, 11);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nohp` varchar(30) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `kota` int(11) DEFAULT NULL,
  `namarek` varchar(255) DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `teman` text NOT NULL,
  `cache` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `email`, `nohp`, `alamat`, `kota`, `namarek`, `bank`, `password`, `teman`, `cache`) VALUES
(0, 'SIP', 'sip@gmail.com', NULL, NULL, 152, NULL, NULL, 'sha1$c490b12d$1$f52ffe262d66c8d76115f425198bac7e3ac91a41', '', NULL),
(1, 'Andi', 'andi@gmail.com', '', '', 21, '', '', 'sha1$91f3b227$1$de6a662aa3691af05500b0fbe574b2e8072295f0', '', '3CXLCsZok6QgKXjfggALdR6kGAgEKHBt5gsGuhTHaXYwMgKnk81c3KWr3PY7dF'),
(2, 'Ade', 'ade@gmail.com', '08130', 'Jambi', 152, 'Ade', 'BRI', 'sha1$322d0367$1$d9421f06589d8688cfbff950e798a9393dd5607a', '', NULL),
(4, 'Hilman Ramadhan', 'hilman@gmail.com', NULL, NULL, 152, '', '', 'sha1$09a52e78$1$17e051f245f4fe68fd1582e96f472afc58b2a0e2', '', 'xJSNhO8orFrj1nHHwEWKIurIPY6XqtZvqK7pBpQ4HLRkpN0X19qejNUAms2FHv'),
(5, 'Tiqa', 'tiqa@gmail.com', '081368776588', 'Jl. Teuku Umar, No.044, Rt.021, Rw.005, Kec. Telanai Pura, Jambi ', 156, 'Tiqa Quintilia', 'BRI', 'sha1$077fb5e2$1$240b568d7dbece1d50242ebdec3d77adc7ae9cd4', '', 'QTRFok88AyliHCCyZ83m8o5fTRVXKQJruob18pPbSHwCagKKzUoI35OCYsycPQ'),
(6, 'Reno Terbang', 'reno@gmail.com', NULL, NULL, 152, '', '', 'sha1$bd3e6c9a$1$8e42eb945cd5a2fbc8df9d140696a5d092734b1b', '', NULL),
(7, 'Endy Rez', 'endy@gmail.com', NULL, NULL, 152, NULL, NULL, 'sha1$a6eddcdf$1$ae161c726701d011b14fe1967790e1f5e6d204dc', '', NULL),
(8, 'Aisyah Purnama', 'aisyah@gmail.com', NULL, NULL, 152, NULL, NULL, 'sha1$7a3e1fbc$1$92cd7f08b944d1621c455c2c3c120bc4d616068e', ' 2, 1, 5,', NULL),
(9, 'Nofita', 'nofita@gmail.com', NULL, NULL, 152, NULL, NULL, 'sha1$5c38f535$1$6af04d8aa80dd256bd1a8d9912e5922a0834f27b', '', NULL),
(10, 'Danil', 'danil@gmail.com', '', '', 36, '', '', 'sha1$c95bfda9$1$7883fcba3064de7ec4a5c565f5978b2913ef6a7e', ' 5, 1,', 'HHVAxaEeyd9QwwCr9sbEdADHCxYaoqkKijb8Ph2x3q7CHXb27SrB5lWhToTt4p'),
(11, 'Antro Didi', 'antro@gmail.com', NULL, NULL, NULL, NULL, NULL, 'sha1$1816a2d2$1$ad1a7dc2706737513d5f696649f230482ec59046', ' 5, 1,', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `barang_masuk`
--
ALTER TABLE `barang_masuk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pembelian`
--
ALTER TABLE `pembelian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penjualan`
--
ALTER TABLE `penjualan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pesan`
--
ALTER TABLE `pesan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teman`
--
ALTER TABLE `teman`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nama` (`nama`),
  ADD UNIQUE KEY `cache` (`cache`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
--
-- AUTO_INCREMENT for table `barang_masuk`
--
ALTER TABLE `barang_masuk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `pembelian`
--
ALTER TABLE `pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;
--
-- AUTO_INCREMENT for table `penjualan`
--
ALTER TABLE `penjualan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
--
-- AUTO_INCREMENT for table `pesan`
--
ALTER TABLE `pesan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;
--
-- AUTO_INCREMENT for table `teman`
--
ALTER TABLE `teman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
