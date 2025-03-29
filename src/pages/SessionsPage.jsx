import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import API_BASE_URL from "../config";
import Navbar from "../components/Navbar"; // Import Navbar

const SessionsPage = () => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;

      try {
        let token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/sessions/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSessions(res.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [user]);

  return (
    <>
      <Navbar /> {/* Include Navbar */}
      <div className="container mt-4">
        <h2>Your Typing Test Sessions</h2>
        {sessions.length === 0 ? (
          <p>No sessions found.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>WPM</th>
                <th>Accuracy</th>
                <th>Errors</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session._id}>
                  <td>{new Date(session.createdAt).toLocaleString()}</td>
                  <td>{session.wpm}</td>
                  <td>{session.accuracy}%</td>
                  <td>{session.totalErrors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default SessionsPage;
