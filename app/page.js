// import DashboardPage from "./dashboard/page";

import LoginPage from "./login/page";

//server component for ssr
export default function Home() {
  return (
    <div>
      {/* <DashboardPage /> */}
      <LoginPage />
    </div>
  );
}
