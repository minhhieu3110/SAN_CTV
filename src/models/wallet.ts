export type MethodWallet = {method_id: number; title: string; picture: string};
export type acccountBank = {
  id: number;
  bank_name: string;
  bank_account: string;
  bank_number: string;
  bank_content: string;
};

export type Wallet = {
  exchange_code: string;
  value_type: number;
  exchange_type: {
    id: number;
    type: string;
    title: string;
    color: string;
    background: string;
    picture: string;
  };
  detail: string;
  value: number;
  wcoin_before: number;
  wcoin_after: number;
  created_at: number;
};

export type Bank = {
  item_id: number;
  title: string;
  title_short: string;
};

export type LinkRef = {
  customer_referral_link: string;
  employee_referral_link: string;
  qrcode_customer_referral_link: string;
  qrcode_employee_referral_link: string;
};

export type BankUser = {
  item_id: number;
  bank_id: number;
  bank_number: string;
  bank_account: string;
  bank_branch: string;
  is_default: number;
  bank_name: {
    item_id: number;
    picture: string;
    title: string;
    title_short: string;
  };
};
