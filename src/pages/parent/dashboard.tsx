import { useUser } from "@kidneed/hooks";
import { openGuard } from "@kidneed/utils";

export default function Dashboard() {
  const user = useUser(1);
  return <div>Dashboard</div>;
}

Dashboard.guard = openGuard;
