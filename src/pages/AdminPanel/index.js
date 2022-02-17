import AdminTeamsTable from "../../components/AdminTeamsTable";

const AdminPanel = ({ teams, fetchTeams }) => {
  return (
    <>
      <AdminTeamsTable teams={teams} fetchTeams={fetchTeams} />
    </>
  );
};

export default AdminPanel;
