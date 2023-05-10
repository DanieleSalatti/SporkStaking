export default interface Database {
  member: {
    id?: number;
    first_name: string;
    last_name: string;
    wallet: string;
    country: string;
    email: string;
    amount: string;
    created_at?: Date;
    is_active: boolean;
  };
  stake_log: {
    wallet: string;
    total_amount: string;
    created_at?: Date;
  };
  running_totals: {
    wallet: string;
    amount: string;
    percentage_share: number;
    updated_at?: Date;
  };
  contract_running_total: {
    amount: string;
    created_at?: Date;
  };
}
