"use client";

import { useState } from "react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoggingOut: boolean;
}

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
  isLoggingOut,
}: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1020,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "1.5rem",
          padding: "2rem",
          maxWidth: "28rem",
          width: "100%",
          margin: "0 1rem",
          fontFamily: "Lato, sans-serif",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "1.875rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            fontFamily: "League Spartan, sans-serif",
            color: "#444",
          }}
        >
          Confirm Logout
        </h2>
        <p
          style={{
            marginBottom: "1.5rem",
            color: "#4e4e4e",
            fontSize: "1rem",
            lineHeight: "1.6",
          }}
        >
          Are you sure you want to logout? You will need to sign in again to access your account.
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoggingOut}
            style={{
              flex: 1,
              padding: "0.75rem 1.5rem",
              borderRadius: "9999px",
              fontWeight: 600,
              transition: "all 0.3s ease",
              backgroundColor: "#f5f5f5",
              color: "#444",
              fontFamily: "Lato, sans-serif",
              cursor: isLoggingOut ? "not-allowed" : "pointer",
              opacity: isLoggingOut ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoggingOut) e.currentTarget.style.backgroundColor = "#e0e0e0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoggingOut}
            style={{
              flex: 1,
              padding: "0.75rem 1.5rem",
              borderRadius: "9999px",
              fontWeight: 600,
              transition: "all 0.3s ease",
              opacity: isLoggingOut ? 0.5 : 1,
              cursor: isLoggingOut ? "not-allowed" : "pointer",
              backgroundColor: "#fe9f30",
              color: "#fff",
              fontFamily: "Lato, sans-serif",
              letterSpacing: "1px",
            }}
            onMouseEnter={(e) => {
              if (!isLoggingOut) {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.color = "#fe9f30";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoggingOut) {
                e.currentTarget.style.backgroundColor = "#fe9f30";
                e.currentTarget.style.color = "#fff";
              }
            }}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
