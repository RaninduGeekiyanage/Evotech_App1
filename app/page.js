import DashboardPage from "./dashboard/page";

//server component for ssr
export default function Home() {
  return (
    <div>
      <DashboardPage />
    </div>
  );
}
