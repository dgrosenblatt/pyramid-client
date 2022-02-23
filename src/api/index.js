import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
export const getToken = () => {
  return localStorage.getItem("token");
};

export const getTeams = () => {
  return axios.get(`${baseUrl}/teams`);
};

export const getStandings = () => {
  return axios.get(`${baseUrl}/standings`, {
    headers: { Authorization: getToken() },
  });
};

export const lockTeam = (id) => {
  return axios.patch(`${baseUrl}/admin/teams/${id}/lock`, null, {
    headers: { Authorization: getToken() },
  });
};

export const scheduleTeamLock = ({ teamId, locked_at }) => {
  return axios.patch(
    `${baseUrl}/admin/teams/${teamId}/schedule_lock`,
    { locked_at },
    { headers: { Authorization: getToken() } }
  );
};

export const unlockTeam = (id) => {
  return axios.patch(`${baseUrl}/admin/teams/${id}/unlock`, null, {
    headers: { Authorization: getToken() },
  });
};

export const addWin = (id) => {
  return axios.patch(`${baseUrl}/admin/teams/${id}/win`, null, {
    headers: { Authorization: getToken() },
  });
};

export const addLoss = (id) => {
  return axios.patch(`${baseUrl}/admin/teams/${id}/lose`, null, {
    headers: { Authorization: getToken() },
  });
};

export const addTie = (id) => {
  return axios.patch(`${baseUrl}/admin/teams/${id}/tie`, null, {
    headers: { Authorization: getToken() },
  });
};

export const getUser = () => {
  return axios.get(`${baseUrl}/current_user`, {
    headers: { Authorization: getToken() },
  });
};

export const getUserRanking = () => {
  return axios.get(`${baseUrl}/current_user/ranking`, {
    headers: { Authorization: getToken() },
  });
};

export const createHolding = ({ quantity, teamId }) => {
  return axios.post(
    `${baseUrl}/holdings`,
    { quantity, team_id: teamId },
    { headers: { Authorization: getToken() } }
  );
};

export const deleteHolding = ({ quantity, holdingId }) => {
  return axios.delete(`${baseUrl}/holdings/${holdingId}?quantity=${quantity}`, {
    headers: { Authorization: getToken() },
  });
};

export const createUser = ({ email, password, name }) => {
  return axios.post(
    `${baseUrl}/signup`,
    JSON.stringify({ user: { email, password, name } }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const createSession = ({ email, password }) => {
  return axios.post(
    `${baseUrl}/login`,
    JSON.stringify({ user: { email, password } }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const resetPassword = ({ email }) => {
  return axios.post(
    `${baseUrl}/password`,
    JSON.stringify({ user: { email } }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const updatePassword = ({ token = null, password }) => {
  return axios.patch(
    `${baseUrl}/password`,
    JSON.stringify({ user: { reset_password_token: token, password } }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
