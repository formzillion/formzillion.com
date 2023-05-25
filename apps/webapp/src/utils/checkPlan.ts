export default function checkPlan(plan: string) {
  // List of free plans
  const freePlans = ["free", "trail"];

  // Convert plan to lowercase for case-insensitive comparison
  const formattedPlanName = plan.toLowerCase();

  // Check if the plan is in the list of free plans
  if (freePlans.includes(formattedPlanName)) {
    return false;
  } else {
    return true;
  }
}
