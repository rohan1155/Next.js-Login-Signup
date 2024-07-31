"use client";
import Cookies from "js-cookie";
import React from "react";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={() => {
          console.log("logged out");
          Cookies.remove("token");
        }}
      >
        logout
      </button>
    </div>
  );
}
