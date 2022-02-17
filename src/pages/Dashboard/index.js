import Standings from "../../components/Standings";
import Profile from "../../components/Profile";
import TeamsTable from "../../components/TeamsTable";

const Dashboard = ({ onSignUpOpen, user, teams, fetchTeams }) => {
  const currentOrGuestUser = user ?? {
    balance: 1000000,
    holdings: [],
    total_value: 1000000,
    guest: true,
    email: "you@example.com",
  };
  return (
    <>
      <Standings currentUser={user} />
      <Profile onSignUpOpen={onSignUpOpen} user={currentOrGuestUser} />
      <TeamsTable teams={teams} fetchTeams={fetchTeams} />
    </>
  );
};

export default Dashboard;
