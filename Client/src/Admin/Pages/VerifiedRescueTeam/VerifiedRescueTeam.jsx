import React, { useEffect, useState } from "react";
import axios from "axios";

const RescueVerify = () => {
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  const fetchTeams = async () => {
    try {
      const p = await axios.get("http://localhost:5000/admin/rescueteams/status/0");
      const a = await axios.get("http://localhost:5000/admin/rescueteams/status/1");
      const r = await axios.get("http://localhost:5000/admin/rescueteams/status/2");

      setPending(p.data.data);
      setAccepted(a.data.data);
      setRejected(r.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const acceptTeam = async (id) => {
    await axios.put(`http://localhost:5000/admin/rescueteams/accept/${id}`);
    fetchTeams();
  };

  const rejectTeam = async (id) => {
    await axios.put(`http://localhost:5000/admin/rescueteams/reject/${id}`);
    fetchTeams();
  };

  const renderTable = (title, data, showActions = false) => (
    <div>
      <h2>{title}</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>District</th>
            {showActions && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((team) => (
            <tr key={team._id}>
              <td>{team.rescueTeamName}</td>
              <td>{team.rescueTeamEmail}</td>
              <td>{team.rescueTeamAddress}</td>
              <td>{team.districtId?.districtName}</td>
              {showActions && (
                <td>
                  <button onClick={() => acceptTeam(team._id)}>Accept</button>
                  <button onClick={() => rejectTeam(team._id)}>Reject</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {renderTable("Pending Rescue Teams", pending, true)}
      {renderTable("Accepted Rescue Teams", accepted)}
      {renderTable("Rejected Rescue Teams", rejected)}
    </div>
  );
};

export default RescueVerify;