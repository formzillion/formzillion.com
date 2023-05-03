export const categories = [
  {
    label: "All Categories",
    value: "all_categories",
  },
  {
    label: "Customer Service",
    value: "customer_service",
  },
  {
    label: "HR & People Ops",
    value: "hr_and_people_ops",
  },
  {
    label: "Marketing & Content",
    value: "marketing_and_content",
  },
  {
    label: "Marketing & Growth",
    value: "marketing_and_growth",
  },
  {
    label: "Productivity",
    value: "productivity",
  },
  {
    label: "Feedback",
    value: "feedback",
  },
];

export const templates = [
  {
    id: 1,
    name: "Contact Us Form",
    category: "customer_service",
    views: "100",
    createdAt: "2023-01-01",
    author: "hello", 
    formFields: [
      {
        name: "name",
        type: "text",
      },
      {
        name: "email",
        type: "email",
      },
      {
        name: "phone",
        type: "text",
      },
      {
        name: "message",
        type: "textField",
      },
    ],
  },
  {
    id: 2,
    name: "Complaint Form",
    category: "customer_service",
    views: "100",
    createdAt: "2023-01-01",
    author: "hello", 
    formFields: [
      {
        name: "name",
        type: "text",
      },
      {
        name: "email",
        type: "email",
      },
      {
        name: "phone",
        type: "text",
      },
      {
        name: "complaint",
        type: "textField",
      },
    ],
  },
  {
    id: 3,
    name: "Registration Form",
    category: "customer_service",
    views: "100",
    createdAt: "2023-02-01",
    author: "swatiswa", 
    formFields: [
      {
        name: "name",
        type: "text",
      },
      {
        name: "email",
        type: "email",
      },
      {
        name: "phone",
        type: "text",
      },
      {
        name: "address",
        type: "text",
      },
      {
        name: "city",
        type: "text",
      },
      {
        name: "country",
        type: "text",
      },
    ],
  },
  {
    id: 4,
    name: "Basic Request Quotation Form",
    category: "customer_service",
    views: "100",
    createdAt: "2023-03-01",
    author: "11empty",
    formFields: [
      {
        name: "name",
        type: "text",
      },
      {
        name: "email",
        type: "email",
      },
      {
        name: "phone",
        type: "text",
      },
      {
        name: "budget",
        type: "select",
        options: [
          "<5000",
          "5000-10000",
          "10000-15000",
          "15000-20000",
          "20000-25000",
        ],
      },
      {
        displayText: "How can we Help You",
        name: "requestFor",
        type: "textField",
      },
    ],
  },
  {
    id: 5,
    name: "Invoice Enquiry",
    category: "customer_service",
    views: "100",
    createdAt: "2022-10-01",
    author: "swatiswa",
    formFields: [
      {
        name: "name",
        type: "text",
      },
      {
        name: "companyName",
        type: "text",
      },
      {
        name: "email",
        type: "email",
      },
      {
        name: "phone",
        type: "text",
      },
      {
        name: "address",
        type: "text",
      },
      {
        name: "city",
        type: "text",
      },
      {
        name: "country",
        type: "text",
      },
      {
        name: "orderDate",
        type: "date",
      },
      {
        name: "orderDetails",
        type: "text",
      },
    ],
  },
  {
    id: 6,
    name: "Depatment Contact Form",
    category: "customer_service",
    views: "100",
    createdAt: "2023-02-01",
    author: "swatiswa",
    formFields: [
      {
        name: "name",
        type: "text",
      },
      {
        name: "email",
        type: "email",
      },
      {
        name: "phone",
        type: "text",
      },
      {
        name: "department",
        type: "select",
        options: [
          "Front Desk",
          "Customer Care",
          "Shipping & Receiving",
          "Billing & Accounting",
          "Administration",
          "Housekeeping",
          "Security",
        ],
      },
      {
        name: "message",
        type: "textField",
      },
    ],
  },
  {
    id: 7,
    name: "Basic B2B Marketing Form",
    category: "marketing_and_content",
    views: "100",
    createdAt: "2023-03-01",
    author: "11empty",
    formFields: [
      {
        name: "name",
        type: "text",
      },
      {
        name: "email",
        type: "email",
      },
      {
        name: "phone",
        type: "text",
      },
      {
        name: "company",
        type: "text",
      },
      {
        displayText: "How are Your Company's compatitors",
        name: "compatitors",
        type: "text",
      },
      {
        displayText: "what type of help do you need?",
        name: "helpType",
        type: "select",
        options: [
          "Just plan",
          "Paln and execution",
          "Execution",
          "I'm not sure",
        ],
      },
      {
        displayText: "Do you have budget in your mind?",
        name: "budget",
        type: "text",
      },
      {
        displayText: "How can we Help You",
        name: "requestFor",
        type: "textField",
      },
    ],
  },
  {
    id: 8,
    name: "Basic RSVP Form",
    category: "customer_service",
    views: "100",
    createdAt: "2023-01-01",
    author: "11empty",
    formFields: [
      {
        name: "name",
        type: "text",
      },
      {
        displayText: "Will You Attend",
        name: "attend",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        displayText: "And with how many guest",
        name: "guest",
        type: "select",
        options: ["1", "2", "3", "4", "5"],
      },
    ],
  },
  {
    id: 9,
    name: "Basic Feedback Form",
    category: "feedback",
    views: "100",
    createdAt: "2023-01-01",
    author: "11empty",
    formFields: [
      {
        name: "name",
        type: "text",
      },
      {
        name: "email",
        type: "email",
      },
      {
        name: "phone",
        type: "text",
      },
      {
        name: "feedbackType",
        type: "select",
        options: ["comments", "suggestions", "questions"],
      },
      {
        name: "description",
        type: "textField",
        display: "Describe your Feedback",
      },
    ],
  },
];
