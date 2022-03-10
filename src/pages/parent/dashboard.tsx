import { useUser } from "@kidneed/hooks";
import { openGuard } from "@kidneed/utils";
import ParentDashboardLayout from 'layouts/parent-dashboard-layout';

export default function Dashboard() {
  const user = useUser(1);
  return <ParentDashboardLayout>Dashboard</ParentDashboardLayout>;
}

Dashboard.guard = openGuard;
