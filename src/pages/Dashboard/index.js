import Standings from "../../components/Standings"
import Profile from "../../components/Profile"
import TeamsTable from '../../components/TeamsTable'

const Dashboard = ({ onSignUpOpen, user, teams, fetchTeams }) => (
  <>
    <Standings />
    <Profile onSignUpOpen={onSignUpOpen} user={user}/>
    <TeamsTable teams={teams} fetchTeams={fetchTeams} />
  </>
)

export default Dashboard
