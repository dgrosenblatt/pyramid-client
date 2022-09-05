import { useEffect } from "react";
import Standings from "../../components/Standings";
import Profile from "../../components/Profile";
import RecentGameResults from "../../components/RecentGameResults";
import TeamsTable from "../../components/TeamsTable";
import Welcome from "../../components/Welcome";
import Maybe from "../../components/_shared/Maybe";
import { PAGES } from "../../utils/constants";

const Dashboard = ({
  onSignUpOpen,
  user,
  teams,
  fetchTeams,
  setPrefillBuyTeamId,
  setPrefillSellHoldingId,
  onBuyOpen,
  onSellOpen,
  setActivePage,
  userIsLoading,
  teamsAreLoading,
}) => {
  useEffect(() => {
    setActivePage(PAGES.DASHBOARD);
  }, [setActivePage]);

  const isSignedIn = Boolean(user);
  return (
    <>
      <Welcome
        userIsLoading={userIsLoading}
        isSignedIn={isSignedIn}
        onSignUpOpen={onSignUpOpen}
      />
      <Standings currentUser={user} />
      <RecentGameResults />
      <Maybe value={user}>
        <Profile
          user={user}
          userIsLoading={userIsLoading}
          setPrefillSellHoldingId={setPrefillSellHoldingId}
          onSellOpen={onSellOpen}
        />
      </Maybe>
      <TeamsTable
        onBuyOpen={onBuyOpen}
        teams={teams}
        fetchTeams={fetchTeams}
        teamsAreLoading={teamsAreLoading}
        setPrefillBuyTeamId={setPrefillBuyTeamId}
      />
    </>
  );
};

export default Dashboard;
