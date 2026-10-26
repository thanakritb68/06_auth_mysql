
"use client";

import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // โหลดข้อมูลผู้ใช้ที่ Login อยู่จาก API
  useEffect(() => {
    fetch("/api/me")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Not authenticated");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        window.location.href = "/login";
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ฟังก์ชัน Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // กลับไปหน้า Login
      window.location.href = "/login";
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="auth-box">
      <h1>Dashboard</h1>

      <p>Welcome, {user.fullname}</p>
      <p>Email: {user.email}</p>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
