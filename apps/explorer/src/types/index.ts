import type { Abi, Hex } from "viem";
import type { supportedChains } from "@/services/wagmi/config";

export type TransactionType =
  | "deposit"
  | "depositAndApprove"
  | "withdraw"
  | "approveOperator"
  | "increaseApproval"
  | "settleRail"
  | "terminateRail";

export type Network = "calibration" | "mainnet";

export interface TransactionMetadata {
  type: TransactionType;
  amount?: string;
  token?: string;
  operator?: string;
  railId?: string;
  recipient?: string;
  [key: string]: string | undefined;
}

export interface FaucetProvider {
  name: string;
  url: string;
}

export interface KnownOperator {
  address: Hex;
  label: string;
}

export interface KnownToken {
  address: Hex;
  symbol: string;
  name: string;
  decimals: number;
}

export type ChainConstants = {
  chain: (typeof supportedChains)[number];
  label: string;
  contracts: {
    usdfc: Hex;
    payments: {
      address: Hex;
      abi: Abi;
    };
  };
  faucets?: FaucetProvider[];
  knownOperators: KnownOperator[];
  knownTokens: KnownToken[];
};

export type AccountInfo = [bigint, bigint, bigint, bigint];
