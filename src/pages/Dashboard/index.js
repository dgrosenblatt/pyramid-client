import Standings from "../../components/Standings";
import Profile from "../../components/Profile";
import TeamsTable from "../../components/TeamsTable";
import Welcome from "../../components/Welcome";

const Dashboard = ({
  onSignUpOpen,
  user,
  teams,
  fetchTeams,
  setPrefillBuyTeamId,
  onBuyOpen,
}) => {
  const currentOrGuestUser = user ?? {
    balance: 1000000,
    holdings: [],
    total_value: 1000000,
    guest: true,
    email: "you@example.com",
  };
  return (
    <>
      <Welcome />
      <Standings currentUser={user} />
      <Profile onSignUpOpen={onSignUpOpen} user={currentOrGuestUser} />
      <TeamsTable
        onBuyOpen={onBuyOpen}
        teams={teams}
        fetchTeams={fetchTeams}
        setPrefillBuyTeamId={setPrefillBuyTeamId}
      />
    </>
  );
};

export default Dashboard;
