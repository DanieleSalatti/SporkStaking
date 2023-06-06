// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

error TRANSFER_NOT_ALLOWED();

contract StakedSPORK is Initializable, ERC20Upgradeable, ERC20BurnableUpgradeable, AccessControlUpgradeable {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  function initialize() public initializer {
    __ERC20_init("Staked SPORK", "sSPORK");
    __AccessControl_init();
    __ERC20Burnable_init();
    
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
    _mint(to, amount);
  }

  function addMinter(address minter) public onlyRole(DEFAULT_ADMIN_ROLE) {
    _setupRole(MINTER_ROLE, minter);
  }

  function _beforeTokenTransfer(
        address from,
        address to,
        uint256 /*amount*/
    ) internal virtual override {
      if (from != address(0) && to != address(0)) {
        revert TRANSFER_NOT_ALLOWED();
      }
    }
}
