// import { Button } from "@filecoin-pay/ui/components/button";
import { Button } from "@filecoin-foundation/ui-filecoin/Button";
import { EmptyStateCard } from "@filecoin-foundation/ui-filecoin/EmptyStateCard";
import type { Operator, Token } from "@filecoin-pay/types";
import { WalletIcon } from "@phosphor-icons/react";
import { ArrowDownCircle, Shield } from "lucide-react";
import { useMemo, useState } from "react";
import useSynapse from "@/hooks/useSynapse";
import { ApproveOperatorDialog } from "../ApproveOperatorDialog";
import DepositAndApproveDialog from "../DepositAndApproveDialog";
import { DepositDialog } from "../DepositDialog";

const AccountNotFound = () => {
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [depositAndApproveDialogOpen, setDepositAndApproveDialogOpen] = useState(false);

  const { constants } = useSynapse();

  const knownOperators: Operator[] = useMemo(
    () =>
      constants.knownOperators.map((op) => ({
        __typename: "Operator" as const,
        id: op.address,
        address: op.address,
        operatorApprovals: [],
        operatorTokens: [],
        rails: [],
        totalApprovals: 0n,
        totalRails: 0n,
        totalTokens: 0n,
      })),
    [constants.knownOperators],
  );

  const knownTokens: Token[] = useMemo(
    () =>
      constants.knownTokens.map((t) => ({
        __typename: "Token" as const,
        id: t.address,
        symbol: t.symbol,
        name: t.name,
        decimals: BigInt(t.decimals),
        lockupCurrent: 0n,
        lockupLastSettledUntilEpoch: 0n,
        lockupRate: 0n,
        operatorCommission: 0n,
        totalDeposits: 0n,
        totalOneTimePayment: 0n,
        totalSettledAmount: 0n,
        totalUsers: 0n,
        totalWithdrawals: 0n,
        userFunds: 0n,
        userTokens: [],
        volume: 0n,
      })),
    [constants.knownTokens],
  );

  return (
    <EmptyStateCard
      titleTag='h2'
      icon={WalletIcon}
      title='Welcome to Filecoin Pay'
      description="Your account hasn't been indexed yet. Get started by depositing funds or approving an service."
    >
      <div className='flex flex-col gap-4 mt-6'>
        <div className='flex flex-col sm:flex-row gap-3'>
          <Button onClick={() => setDepositDialogOpen(true)} variant='ghost' className='gap-2 py-2'>
            <span className='flex items-center gap-2'>
              <ArrowDownCircle className='h-5 w-5' />
              Deposit Funds
            </span>
          </Button>
          <Button onClick={() => setApproveDialogOpen(true)} variant='ghost' className='gap-2 py-2'>
            <span className='flex items-center gap-2'>
              <Shield className='h-5 w-5' />
              Approve Service
            </span>
          </Button>
          <Button onClick={() => setDepositAndApproveDialogOpen(true)} className='gap-2 py-2' variant='primary'>
            <span className='flex items-center gap-2'>
              <ArrowDownCircle className='h-5 w-5' />
              Deposit and Approve Service
            </span>
          </Button>
        </div>
        <p className='text-xs text-muted-foreground text-center'>
          Start by depositing funds or approving a service to get started
        </p>
      </div>

      {/* Deposit Dialog */}
      <DepositDialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen} />

      {/* Deposit and Approve Dialog */}
      <DepositAndApproveDialog open={depositAndApproveDialogOpen} onOpenChange={setDepositAndApproveDialogOpen} />

      {/* Approve Operator Dialog */}
      <ApproveOperatorDialog
        operators={knownOperators}
        tokens={knownTokens}
        open={approveDialogOpen}
        onOpenChange={setApproveDialogOpen}
      />
    </EmptyStateCard>
  );
};

export default AccountNotFound;
