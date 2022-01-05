import Standings from "../../components/Standings"
import Profile from "../../components/Profile"
import TeamsTable from '../../components/TeamsTable'

const Dashboard = ({ user, teams, fetchTeams }) => (
  <>
    <Standings />
    <Profile user={user}/>
    <TeamsTable teams={teams} fetchTeams={fetchTeams} />
  </>
)

export default Dashboard
