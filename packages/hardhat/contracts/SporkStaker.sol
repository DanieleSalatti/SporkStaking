pragma solidity ^0.8.19;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./interfaces/IERC20MintableBurnable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error INVALID_AMOUNT();

contract SporkStaker is ReentrancyGuard {

  IERC20 public immutable sporkToken;
  IERC20MintableBurnable public immutable stakedSporkToken;

  event Staked(address indexed user, uint256 amount);
  event Unstaked(address indexed user, uint256 amount);

  constructor(
    address _sporkToken,
    address _stakedSporkToken
  ) {
    sporkToken = IERC20(_sporkToken);
    stakedSporkToken = IERC20MintableBurnable(_stakedSporkToken);
  }

  function stake(uint256 _amount) public nonReentrant() {
    if (_amount == 0) {
      revert INVALID_AMOUNT();
    }
    sporkToken.transferFrom(msg.sender, address(this), _amount);
    stakedSporkToken.mint(msg.sender, _amount);
    emit Staked(msg.sender, _amount);
  }

  function unstake(uint256 _amount) public nonReentrant() {
    if (_amount == 0) {
      revert INVALID_AMOUNT();
    }
    stakedSporkToken.burnFrom(msg.sender, _amount);
    sporkToken.transfer(msg.sender, _amount);
    emit Unstaked(msg.sender, _amount);
  }
}
