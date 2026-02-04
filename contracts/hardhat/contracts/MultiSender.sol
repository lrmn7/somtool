// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Kontrak MultiSender memungkinkan pengiriman native token (STT) ke banyak alamat sekaligus.
// Kontrak ini hanya memiliki satu fungsi utama yaitu `multiSendNative`.
// Pemilik kontrak (owner) juga dapat menarik kembali dana yang tertinggal di dalam kontrak.
contract MultiSender is Ownable {
    using Address for address payable;

    // Konstruktor memanggil konstruktor Ownable untuk menetapkan pengirim sebagai pemilik (owner).
    constructor() Ownable(msg.sender) {}

    // Event untuk mencatat pengiriman token ke banyak penerima
    event TokensSent(address indexed sender, address payable[] recipients, uint256[] amounts, uint256 totalSent);

    // Event untuk mencatat penarikan dana oleh pemilik kontrak
    event FundsWithdrawn(address indexed to, uint256 amount);

    // Fungsi utama untuk mengirim native token ke banyak penerima dalam satu transaksi
    // `_recipients` dan `_amounts` harus memiliki panjang yang sama dan tidak kosong
    // `msg.value` harus sama dengan jumlah total yang akan dikirim
    function multiSendNative(
        address payable[] calldata _recipients,
        uint256[] calldata _amounts
    ) external payable {
        require(_recipients.length == _amounts.length, "Lengths mismatch");
        require(_recipients.length > 0, "No recipients provided");

        uint256 totalAmountToBeSent = 0;

        // Validasi setiap penerima dan jumlahnya, serta akumulasi total yang harus dikirim.
        for (uint256 i = 0; i < _recipients.length; i++) {
            require(_recipients[i] != address(0), "Recipient cannot be zero address");
            require(_amounts[i] > 0, "Amount must be positive");
            totalAmountToBeSent += _amounts[i];
        }

        // Pastikan total yang dikirim sesuai dengan `msg.value`.
        require(msg.value == totalAmountToBeSent, "Total amount mismatch");

        // Kirim token ke masing-masing penerima.
        for (uint256 i = 0; i < _recipients.length; i++) {
            _recipients[i].sendValue(_amounts[i]);
        }

        // Emit event agar transaksi bisa dilacak di blockchain explorer.
        emit TokensSent(msg.sender, _recipients, _amounts, totalAmountToBeSent);
    }

    // Fungsi darurat agar owner bisa menarik kembali dana yang tidak sengaja tertinggal di kontrak.
    function withdrawStuckFunds(address payable _to) external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        _to.transfer(balance);

        emit FundsWithdrawn(_to, balance);
    }

    // Fungsi receive() menangkap transaksi STT langsung ke kontrak.
    receive() external payable {}

    // Fungsi fallback() menangkap transaksi fallback yang tidak cocok dengan fungsi manapun.
    fallback() external payable {}
}
