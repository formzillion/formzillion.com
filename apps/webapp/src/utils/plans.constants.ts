interface IPlanLimit {
  [key: string]: number;
}

export const planMemberLimit: IPlanLimit = {
  free: 0,
  basic: 4,
  standard: 9,
  premium: 19,
  agency: 49,
};

export const planFormLimit: IPlanLimit = {
  free: 1,
  basic: 5,
  standard: Infinity,
  premium: Infinity,
  agency: Infinity,
};

export const planSubmissionLimit: IPlanLimit = {
  free: 50,
  basic: 250,
  standard: 1000,
  premium: 6000,
  agency: 30000,
};

export default {
  planMemberLimit,
  planFormLimit,
  planSubmissionLimit,
};
