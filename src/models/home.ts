export type OrderNext = {day: string; date: string; date_begin: string; date_end: string; count: number};
export type ListService = {
  id: number;
  amount_final: number;
  amount_employee_revenue: number;
  start_time: number;
  actual_start_time: string;
  actual_end_time: string;
  address_full: string;
  cancel: {
    id: number;
    title: string;
  };
  status: {value: number; title: string; color: string; allow_cancel: string; background: string};
  order: {
    id: number;
    full_name: string;
    extra_services: Extra[];
    start_date: string;
    hour: number;
    phone: string;
    start_time: string;
    end_time: string;
    address: string;
    method: {
      title: string;
    };
    service: {
      item_id: number;
      title: string;
      picture: string;
    };
    note: string;
    district_relation: {
      code: string;
      title: string;
    };
    ward_relation: {
      code: string;
      title: string;
    };
  };
};

export type Extra = {
  icon: string;
  icon_color: string;
};

export type FaqList = {
  item_id: number;
  title: string;
  content: string;
  created_at: number;
};

export type Rating = {
  star: number;
  created_at: number;
  content: string;
  user_id: number;
  user: {
    id: number;
    full_name: string;
    picture: string;
  };
};

export type ListRank = {
  item_id: number;
  title: string;
  picture: string;
  short: short[];
};

export type Sysoptions = {
  hotline: string;
  email: string;
  zalo: string;
};

export type Setting = {
  content: string;
};

export type NumberMessage = {
  total_unseen_count: number;
};

export type message = {
  id: number;
  pending: boolean;
  room_key: string;
  message: string;
  id_send: number;
  timestamp: string;
  is_show: string;
  created_at: number;
  send: {
    id: number;
    full_name: string;
    picture: string;
  };
};

export type Notifi = {
  item_id: number;
  short: string;
  picture: string;
  title: string;
  created_at: number;
  viewed: string;
  content: string;
};

export type arr_detail = {
  point_from: string;
  point_to: string;
  reward: string;
};

export type Page = {
  title: string;
  picture: string;
  content: string;
};

export type ListReward = {
  item_id: number;
  short: string;
  picture: string;
  title: string;
  created_at: number;
  title_small: string;
  type: string;
  bonus: number;
  date_end: number;
  points_earned: number;
  arr_detail: arr_detail[];
};

export type Chat = {
  room_key: string;
  user_id: number;
  employee_id: number;
  last_message: string;
  last_at: number;
  created_at: number;
  last_from: string;
  unseen_count: number;
  employee: {
    id: number;
    full_name: string;
    picture: string;
  };
  user: {
    id: number;
    full_name: string;
    picture: string;
  };
};

export type short = {
  title: string;
};

export type InfoRank = {
  title: string;
  picture: string;
  content: string;
  valid_until: string;
  order_level: number;
  income: number;
  average_rating: number;
  completion_rate: number;
  next_rank: {
    income: number;
    order_level: number;
    average_rating: number;
    completion_rate: number;
    title: string;
    picture: string;
  };
};
