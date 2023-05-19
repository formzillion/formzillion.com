module.exports = {
  root: true,
  extends: ["next/babel", "prettier"],
  rules: {
    "no-restricted-syntax": ["off"],
    "no-return-await": ["off"],
    "no-return-assign": ["off"],
    "no-await-in-loop": ["off"],
    "no-shadow": ["off"],
  },
};
