import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        // If no token is found, redirect to login page
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/dashboard", {
          headers: {
            authentication: `Bearer ${token}`, // Send token in the headers
          },
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Render loading, error, or user data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-2">Welcome back, {userData ? userData.message.split(",")[1] : "User"}!</h2>
        <p>Your email is: {userData ? userData.message : "Loading..."}</p>
      </div>
    </div>
  );
};

export default Dashboard;
