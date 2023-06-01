interface IPlanLimit {
  [key: string]: number;
}

interface IPlanItem {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface IPlan {
  standard: IPlanItem;
  agency: IPlanItem;
  basic: IPlanItem;
  premium: IPlanItem;
  free: IPlanItem;
}
interface IPlanConfig {
  development: IPlan;
  production: IPlan;
}

export const plansConfig: IPlanConfig = {
  development: {
    standard: {
      id: "price_1NAYrNIUb3WqJSIsy4ctkISG",
      name: "Standard",
      slug: "standard",
      description: "A plan that works well with freelancers.",
    },
    agency: {
      id: "price_1NAYoMIUb3WqJSIsJxXDAsq5",
      name: "Agency",
      slug: "agency",
      description: "A plan that fit well for agencies.",
    },
    basic: {
      id: "price_1NAW98IUb3WqJSIsWO4IupGN",
      name: "Basic",
      slug: "basic",
      description: "A plan that works well with personal projects.",
    },
    premium: {
      id: "price_1NAW56IUb3WqJSIsydSaHr30",
      name: "Premium",
      slug: "premium",
      description: "A plan that scales with your startups.",
    },
    free: {
      id: "price_1Mf1URIUb3WqJSIsT5l2IHWM",
      name: "Free",
      slug: "free",
      description:
        "Use Formzillion for testing and development with unlimited projects and forms, limited to 50 submissions/mo.",
    },
  },
  production: {
    standard: {
      id: "price_1NAXueIUb3WqJSIsVcD4QO4h",
      name: "Standard",
      slug: "standard",
      description: "A plan that works well with freelancers.",
    },
    agency: {
      id: "price_1NAYwQIUb3WqJSIsHqRBuEDg",
      name: "Agency",
      slug: "agency",
      description: "A plan that fit well for agencies.",
    },
    basic: {
      id: "price_1NAXiuIUb3WqJSIsqcMuxZhq",
      name: "Basic",
      slug: "basic",
      description: "A plan that works well with personal projects.",
    },
    premium: {
      id: "price_1NAXlmIUb3WqJSIsJ4n7nTHh",
      name: "Premium",
      slug: "premium",
      description: "A plan that scales with your startups.",
    },
    free: {
      id: "price_1MeuBiIUb3WqJSIsq3QJwARL",
      name: "Free",
      slug: "free",
      description:
        "Use Formzillion for testing and development with unlimited projects and forms, limited to 50 submissions/mo.",
    },
  },
};

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
  plansConfig,
  planMemberLimit,
  planFormLimit,
  planSubmissionLimit,
};
