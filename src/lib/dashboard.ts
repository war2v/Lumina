export function getDashboardType(userRole: string): string {
  const saved = sessionStorage.getItem("dashboardType");
  if (saved) return saved;
  return userRole === "presenter" ? "presenter" : "attendee";
}

export function switchDashboard(type: string) {
  sessionStorage.setItem("dashboardType", type);
}

export function clearDashboardSession() {
  sessionStorage.removeItem("dashboardType");
}
