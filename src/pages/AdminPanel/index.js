import TeamsTable from '../../components/TeamsTable'

const AdminPanel = ({ teams, fetchTeams }) => {
  return (
    <>
      <TeamsTable teams={teams} fetchTeams={fetchTeams} />
    </>
  )
}

export default AdminPanel
