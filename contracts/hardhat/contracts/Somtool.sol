// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Somtool {
    address public owner;
    uint256 public claimAmount;
    uint256 public cooldownTime;
    mapping(address => uint256) public nextClaimTime;
    event Claimed(address indexed receiver, uint256 amount);
    event Deposited(address indexed sender, uint256 amount);
    event Withdrawn(address indexed receiver, uint256 amount);

    constructor(uint256 _initialClaimAmount, uint256 _cooldownInSeconds) {
        owner = msg.sender;
        claimAmount = _initialClaimAmount;
        cooldownTime = _cooldownInSeconds;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Somtool: Caller is not the owner");
        _;
    }

    function claim() external {
        require(block.timestamp >= nextClaimTime[msg.sender], "Somtool: Cooldown period has not passed yet");
        require(address(this).balance >= claimAmount, "Somtool: Insufficient balance in the Somtool");

        nextClaimTime[msg.sender] = block.timestamp + cooldownTime;

        (bool success, ) = msg.sender.call{value: claimAmount}("");
        require(success, "Somtool: Failed to send STT");

        emit Claimed(msg.sender, claimAmount);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Somtool: No balance to withdraw");

        (bool success, ) = owner.call{value: balance}("");
        require(success, "Somtool: Withdrawal failed");

        emit Withdrawn(owner, balance);
    }

    receive() external payable {
        emit Deposited(msg.sender, msg.value);
    }

    function getRemainingCooldown(address _user) external view returns (uint256) {
        if (block.timestamp >= nextClaimTime[_user]) {
            return 0;
        }
        return nextClaimTime[_user] - block.timestamp;
    }

    function setClaimAmount(uint256 _newAmount) external onlyOwner {
        claimAmount = _newAmount;
    }

    function setCooldownTime(uint256 _newCooldown) external onlyOwner {
        cooldownTime = _newCooldown;
    }
}