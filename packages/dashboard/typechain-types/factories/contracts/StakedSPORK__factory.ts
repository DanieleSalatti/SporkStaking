/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  StakedSPORK,
  StakedSPORKInterface,
} from "../../contracts/StakedSPORK";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "TRANSFER_NOT_ALLOWED",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    name: "addMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600c81526020017f5374616b65642053504f524b00000000000000000000000000000000000000008152506040518060400160405280600681526020017f7353504f524b000000000000000000000000000000000000000000000000000081525081600390816200008f91906200049e565b508060049081620000a191906200049e565b505050620000b96000801b33620000bf60201b60201c565b62000585565b620000d18282620001b160201b60201c565b620001ad5760016005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550620001526200021c60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b60006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600033905090565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620002a657607f821691505b602082108103620002bc57620002bb6200025e565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620003267fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620002e7565b620003328683620002e7565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006200037f6200037962000373846200034a565b62000354565b6200034a565b9050919050565b6000819050919050565b6200039b836200035e565b620003b3620003aa8262000386565b848454620002f4565b825550505050565b600090565b620003ca620003bb565b620003d781848462000390565b505050565b5b81811015620003ff57620003f3600082620003c0565b600181019050620003dd565b5050565b601f8211156200044e576200041881620002c2565b6200042384620002d7565b8101602085101562000433578190505b6200044b6200044285620002d7565b830182620003dc565b50505b505050565b600082821c905092915050565b6000620004736000198460080262000453565b1980831691505092915050565b60006200048e838362000460565b9150826002028217905092915050565b620004a98262000224565b67ffffffffffffffff811115620004c557620004c46200022f565b5b620004d182546200028d565b620004de82828562000403565b600060209050601f83116001811462000516576000841562000501578287015190505b6200050d858262000480565b8655506200057d565b601f1984166200052686620002c2565b60005b82811015620005505784890151825560018201915060208501945060208101905062000529565b868310156200057057848901516200056c601f89168262000460565b8355505b6001600288020188555050505b505050505050565b6125d780620005956000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c806342966c68116100c3578063a217fddf1161007c578063a217fddf146103c2578063a457c2d7146103e0578063a9059cbb14610410578063d539139314610440578063d547741f1461045e578063dd62ed3e1461047a5761014d565b806342966c68146102f057806370a082311461030c57806379cc67901461033c57806391d148541461035857806395d89b4114610388578063983b2d56146103a65761014d565b8063248a9ca311610115578063248a9ca31461021e5780632f2ff15d1461024e578063313ce5671461026a57806336568abe1461028857806339509351146102a457806340c10f19146102d45761014d565b806301ffc9a71461015257806306fdde0314610182578063095ea7b3146101a057806318160ddd146101d057806323b872dd146101ee575b600080fd5b61016c6004803603810190610167919061189d565b6104aa565b60405161017991906118e5565b60405180910390f35b61018a610524565b6040516101979190611990565b60405180910390f35b6101ba60048036038101906101b59190611a46565b6105b6565b6040516101c791906118e5565b60405180910390f35b6101d86105d9565b6040516101e59190611a95565b60405180910390f35b61020860048036038101906102039190611ab0565b6105e3565b60405161021591906118e5565b60405180910390f35b61023860048036038101906102339190611b39565b610612565b6040516102459190611b75565b60405180910390f35b61026860048036038101906102639190611b90565b610632565b005b610272610653565b60405161027f9190611bec565b60405180910390f35b6102a2600480360381019061029d9190611b90565b61065c565b005b6102be60048036038101906102b99190611a46565b6106df565b6040516102cb91906118e5565b60405180910390f35b6102ee60048036038101906102e99190611a46565b610716565b005b61030a60048036038101906103059190611c07565b61074f565b005b61032660048036038101906103219190611c34565b610763565b6040516103339190611a95565b60405180910390f35b61035660048036038101906103519190611a46565b6107ab565b005b610372600480360381019061036d9190611b90565b6107cb565b60405161037f91906118e5565b60405180910390f35b610390610836565b60405161039d9190611990565b60405180910390f35b6103c060048036038101906103bb9190611c34565b6108c8565b005b6103ca610903565b6040516103d79190611b75565b60405180910390f35b6103fa60048036038101906103f59190611a46565b61090a565b60405161040791906118e5565b60405180910390f35b61042a60048036038101906104259190611a46565b610981565b60405161043791906118e5565b60405180910390f35b6104486109a4565b6040516104559190611b75565b60405180910390f35b61047860048036038101906104739190611b90565b6109c8565b005b610494600480360381019061048f9190611c61565b6109e9565b6040516104a19190611a95565b60405180910390f35b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061051d575061051c82610a70565b5b9050919050565b60606003805461053390611cd0565b80601f016020809104026020016040519081016040528092919081815260200182805461055f90611cd0565b80156105ac5780601f10610581576101008083540402835291602001916105ac565b820191906000526020600020905b81548152906001019060200180831161058f57829003601f168201915b5050505050905090565b6000806105c1610ada565b90506105ce818585610ae2565b600191505092915050565b6000600254905090565b6000806105ee610ada565b90506105fb858285610cab565b610606858585610d37565b60019150509392505050565b600060056000838152602001908152602001600020600101549050919050565b61063b82610612565b61064481610fad565b61064e8383610fc1565b505050565b60006012905090565b610664610ada565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146106d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106c890611d73565b60405180910390fd5b6106db82826110a2565b5050565b6000806106ea610ada565b905061070b8185856106fc85896109e9565b6107069190611dc2565b610ae2565b600191505092915050565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a661074081610fad565b61074a8383611184565b505050565b61076061075a610ada565b826112da565b50565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6107bd826107b7610ada565b83610cab565b6107c782826112da565b5050565b60006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60606004805461084590611cd0565b80601f016020809104026020016040519081016040528092919081815260200182805461087190611cd0565b80156108be5780601f10610893576101008083540402835291602001916108be565b820191906000526020600020905b8154815290600101906020018083116108a157829003601f168201915b5050505050905090565b6000801b6108d581610fad565b6108ff7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a683610fc1565b5050565b6000801b81565b600080610915610ada565b9050600061092382866109e9565b905083811015610968576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161095f90611e68565b60405180910390fd5b6109758286868403610ae2565b60019250505092915050565b60008061098c610ada565b9050610999818585610d37565b600191505092915050565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b6109d182610612565b6109da81610fad565b6109e483836110a2565b505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610b51576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b4890611efa565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610bc0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bb790611f8c565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610c9e9190611a95565b60405180910390a3505050565b6000610cb784846109e9565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610d315781811015610d23576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d1a90611ff8565b60405180910390fd5b610d308484848403610ae2565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610da6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d9d9061208a565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e0c9061211c565b60405180910390fd5b610e208383836114a7565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610ea6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e9d906121ae565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610f949190611a95565b60405180910390a3610fa784848461154d565b50505050565b610fbe81610fb9610ada565b611552565b50565b610fcb82826107cb565b61109e5760016005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550611043610ada565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b6110ac82826107cb565b156111805760006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550611125610ada565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036111f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111ea9061221a565b60405180910390fd5b6111ff600083836114a7565b80600260008282546112119190611dc2565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516112c29190611a95565b60405180910390a36112d66000838361154d565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611349576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611340906122ac565b60405180910390fd5b611355826000836114a7565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156113db576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113d29061233e565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260008282540392505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161148e9190611a95565b60405180910390a36114a28360008461154d565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156115115750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b15611548576040517f45521f3a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505050565b505050565b61155c82826107cb565b6115d357611569816115d7565b6115778360001c6020611604565b604051602001611588929190612432565b6040516020818303038152906040526040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115ca9190611990565b60405180910390fd5b5050565b60606115fd8273ffffffffffffffffffffffffffffffffffffffff16601460ff16611604565b9050919050565b606060006002836002611617919061246c565b6116219190611dc2565b67ffffffffffffffff81111561163a576116396124ae565b5b6040519080825280601f01601f19166020018201604052801561166c5781602001600182028036833780820191505090505b5090507f3000000000000000000000000000000000000000000000000000000000000000816000815181106116a4576116a36124dd565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f780000000000000000000000000000000000000000000000000000000000000081600181518110611708576117076124dd565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060006001846002611748919061246c565b6117529190611dc2565b90505b60018111156117f2577f3031323334353637383961626364656600000000000000000000000000000000600f861660108110611794576117936124dd565b5b1a60f81b8282815181106117ab576117aa6124dd565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c9450806117eb9061250c565b9050611755565b5060008414611836576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161182d90612581565b60405180910390fd5b8091505092915050565b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61187a81611845565b811461188557600080fd5b50565b60008135905061189781611871565b92915050565b6000602082840312156118b3576118b2611840565b5b60006118c184828501611888565b91505092915050565b60008115159050919050565b6118df816118ca565b82525050565b60006020820190506118fa60008301846118d6565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561193a57808201518184015260208101905061191f565b60008484015250505050565b6000601f19601f8301169050919050565b600061196282611900565b61196c818561190b565b935061197c81856020860161191c565b61198581611946565b840191505092915050565b600060208201905081810360008301526119aa8184611957565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006119dd826119b2565b9050919050565b6119ed816119d2565b81146119f857600080fd5b50565b600081359050611a0a816119e4565b92915050565b6000819050919050565b611a2381611a10565b8114611a2e57600080fd5b50565b600081359050611a4081611a1a565b92915050565b60008060408385031215611a5d57611a5c611840565b5b6000611a6b858286016119fb565b9250506020611a7c85828601611a31565b9150509250929050565b611a8f81611a10565b82525050565b6000602082019050611aaa6000830184611a86565b92915050565b600080600060608486031215611ac957611ac8611840565b5b6000611ad7868287016119fb565b9350506020611ae8868287016119fb565b9250506040611af986828701611a31565b9150509250925092565b6000819050919050565b611b1681611b03565b8114611b2157600080fd5b50565b600081359050611b3381611b0d565b92915050565b600060208284031215611b4f57611b4e611840565b5b6000611b5d84828501611b24565b91505092915050565b611b6f81611b03565b82525050565b6000602082019050611b8a6000830184611b66565b92915050565b60008060408385031215611ba757611ba6611840565b5b6000611bb585828601611b24565b9250506020611bc6858286016119fb565b9150509250929050565b600060ff82169050919050565b611be681611bd0565b82525050565b6000602082019050611c016000830184611bdd565b92915050565b600060208284031215611c1d57611c1c611840565b5b6000611c2b84828501611a31565b91505092915050565b600060208284031215611c4a57611c49611840565b5b6000611c58848285016119fb565b91505092915050565b60008060408385031215611c7857611c77611840565b5b6000611c86858286016119fb565b9250506020611c97858286016119fb565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611ce857607f821691505b602082108103611cfb57611cfa611ca1565b5b50919050565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b6000611d5d602f8361190b565b9150611d6882611d01565b604082019050919050565b60006020820190508181036000830152611d8c81611d50565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611dcd82611a10565b9150611dd883611a10565b9250828201905080821115611df057611def611d93565b5b92915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b6000611e5260258361190b565b9150611e5d82611df6565b604082019050919050565b60006020820190508181036000830152611e8181611e45565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000611ee460248361190b565b9150611eef82611e88565b604082019050919050565b60006020820190508181036000830152611f1381611ed7565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b6000611f7660228361190b565b9150611f8182611f1a565b604082019050919050565b60006020820190508181036000830152611fa581611f69565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b6000611fe2601d8361190b565b9150611fed82611fac565b602082019050919050565b6000602082019050818103600083015261201181611fd5565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b600061207460258361190b565b915061207f82612018565b604082019050919050565b600060208201905081810360008301526120a381612067565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b600061210660238361190b565b9150612111826120aa565b604082019050919050565b60006020820190508181036000830152612135816120f9565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b600061219860268361190b565b91506121a38261213c565b604082019050919050565b600060208201905081810360008301526121c78161218b565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000612204601f8361190b565b915061220f826121ce565b602082019050919050565b60006020820190508181036000830152612233816121f7565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b600061229660218361190b565b91506122a18261223a565b604082019050919050565b600060208201905081810360008301526122c581612289565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b600061232860228361190b565b9150612333826122cc565b604082019050919050565b600060208201905081810360008301526123578161231b565b9050919050565b600081905092915050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b600061239f60178361235e565b91506123aa82612369565b601782019050919050565b60006123c082611900565b6123ca818561235e565b93506123da81856020860161191c565b80840191505092915050565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b600061241c60118361235e565b9150612427826123e6565b601182019050919050565b600061243d82612392565b915061244982856123b5565b91506124548261240f565b915061246082846123b5565b91508190509392505050565b600061247782611a10565b915061248283611a10565b925082820261249081611a10565b915082820484148315176124a7576124a6611d93565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600061251782611a10565b91506000820361252a57612529611d93565b5b600182039050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b600061256b60208361190b565b915061257682612535565b602082019050919050565b6000602082019050818103600083015261259a8161255e565b905091905056fea2646970667358221220b6154ba3549320f16533af0f225ef6f2177710fc780aafe87020cd0fb27658e064736f6c63430008130033";

type StakedSPORKConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakedSPORKConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StakedSPORK__factory extends ContractFactory {
  constructor(...args: StakedSPORKConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StakedSPORK> {
    return super.deploy(overrides || {}) as Promise<StakedSPORK>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): StakedSPORK {
    return super.attach(address) as StakedSPORK;
  }
  override connect(signer: Signer): StakedSPORK__factory {
    return super.connect(signer) as StakedSPORK__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakedSPORKInterface {
    return new utils.Interface(_abi) as StakedSPORKInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakedSPORK {
    return new Contract(address, _abi, signerOrProvider) as StakedSPORK;
  }
}
