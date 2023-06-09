/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  SporkStaker,
  SporkStakerInterface,
} from "../../contracts/SporkStaker";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_sporkToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_stakedSporkToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "INVALID_AMOUNT",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstaked",
    type: "event",
  },
  {
    inputs: [],
    name: "sporkToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakedSporkToken",
    outputs: [
      {
        internalType: "contract IERC20MintableBurnable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c060405234801561001057600080fd5b506040516109833803806109838339818101604052810190610032919061010c565b60016000819055508173ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff1681525050505061014c565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100d9826100ae565b9050919050565b6100e9816100ce565b81146100f457600080fd5b50565b600081519050610106816100e0565b92915050565b60008060408385031215610123576101226100a9565b5b6000610131858286016100f7565b9250506020610142858286016100f7565b9150509250929050565b60805160a0516107f761018c6000396000818160c70152818161012d01526103b90152600081816101ba015281816102b2015261031801526107f76000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806312d4b0a5146100515780632e17de781461006f5780634744a1781461008b578063a694fc3a146100a9575b600080fd5b6100596100c5565b6040516100669190610575565b60405180910390f35b610089600480360381019061008491906105cb565b6100e9565b005b6100936102b0565b6040516100a09190610619565b60405180910390f35b6100c360048036038101906100be91906105cb565b6102d4565b005b7f000000000000000000000000000000000000000000000000000000000000000081565b6100f161049d565b6000810361012b576040517ffae8279100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166379cc679033836040518363ffffffff1660e01b8152600401610186929190610664565b600060405180830381600087803b1580156101a057600080fd5b505af11580156101b4573d6000803e3d6000fd5b505050507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b8152600401610213929190610664565b6020604051808303816000875af1158015610232573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061025691906106c5565b503373ffffffffffffffffffffffffffffffffffffffff167f0f5bb82176feb1b5e747e28471aa92156a04d9f3ab9f45f28e2d704232b93f758260405161029d91906106f2565b60405180910390a26102ad6104ec565b50565b7f000000000000000000000000000000000000000000000000000000000000000081565b6102dc61049d565b60008103610316576040517ffae8279100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b81526004016103739392919061070d565b6020604051808303816000875af1158015610392573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103b691906106c5565b507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166340c10f1933836040518363ffffffff1660e01b8152600401610412929190610664565b600060405180830381600087803b15801561042c57600080fd5b505af1158015610440573d6000803e3d6000fd5b505050503373ffffffffffffffffffffffffffffffffffffffff167f9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d8260405161048a91906106f2565b60405180910390a261049a6104ec565b50565b6002600054036104e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104d9906107a1565b60405180910390fd5b6002600081905550565b6001600081905550565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061053b610536610531846104f6565b610516565b6104f6565b9050919050565b600061054d82610520565b9050919050565b600061055f82610542565b9050919050565b61056f81610554565b82525050565b600060208201905061058a6000830184610566565b92915050565b600080fd5b6000819050919050565b6105a881610595565b81146105b357600080fd5b50565b6000813590506105c58161059f565b92915050565b6000602082840312156105e1576105e0610590565b5b60006105ef848285016105b6565b91505092915050565b600061060382610542565b9050919050565b610613816105f8565b82525050565b600060208201905061062e600083018461060a565b92915050565b600061063f826104f6565b9050919050565b61064f81610634565b82525050565b61065e81610595565b82525050565b60006040820190506106796000830185610646565b6106866020830184610655565b9392505050565b60008115159050919050565b6106a28161068d565b81146106ad57600080fd5b50565b6000815190506106bf81610699565b92915050565b6000602082840312156106db576106da610590565b5b60006106e9848285016106b0565b91505092915050565b60006020820190506107076000830184610655565b92915050565b60006060820190506107226000830186610646565b61072f6020830185610646565b61073c6040830184610655565b949350505050565b600082825260208201905092915050565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b600061078b601f83610744565b915061079682610755565b602082019050919050565b600060208201905081810360008301526107ba8161077e565b905091905056fea26469706673582212209a8b240c6d2f22614698140fab3ab8a985517ccdcd3dcf7343f074cf8b8a307d64736f6c63430008130033";

type SporkStakerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SporkStakerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SporkStaker__factory extends ContractFactory {
  constructor(...args: SporkStakerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _sporkToken: PromiseOrValue<string>,
    _stakedSporkToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SporkStaker> {
    return super.deploy(
      _sporkToken,
      _stakedSporkToken,
      overrides || {}
    ) as Promise<SporkStaker>;
  }
  override getDeployTransaction(
    _sporkToken: PromiseOrValue<string>,
    _stakedSporkToken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _sporkToken,
      _stakedSporkToken,
      overrides || {}
    );
  }
  override attach(address: string): SporkStaker {
    return super.attach(address) as SporkStaker;
  }
  override connect(signer: Signer): SporkStaker__factory {
    return super.connect(signer) as SporkStaker__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SporkStakerInterface {
    return new utils.Interface(_abi) as SporkStakerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SporkStaker {
    return new Contract(address, _abi, signerOrProvider) as SporkStaker;
  }
}
