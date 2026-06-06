"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ConfirmModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  onConfirm: (otp: string) => void;
  isConfirming: boolean;
}

export default function ConfirmModal({
  isOpen,
  email,
  onClose,
  onConfirm,
  isConfirming,
}: ConfirmModalProps) {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(otp);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
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
          Confirm Your Email
        </h2>
        <p
          style={{
            marginBottom: "1.5rem",
            color: "#4e4e4e",
            fontSize: "1rem",
            lineHeight: "1.6",
          }}
        >
          Please enter the OTP sent to{" "}
          <strong style={{ color: "#fe9f30" }}>{email}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#4e4e4e",
                fontWeight: 500,
                fontSize: "0.875rem",
              }}
            >
              OTP Code
            </label>
            <div
              style={{
                border: "1px solid #fe9f30",
                borderRadius: "30px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                transition: "0.3s ease",
              }}
            >
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0 20px",
                  borderRadius: "30px",
                  border: "none",
                  outline: "none",
                  fontFamily: "Lato, sans-serif",
                  fontSize: "1rem",
                }}
                placeholder="Enter OTP"
                required
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                fontWeight: 600,
                transition: "all 0.3s ease",
                backgroundColor: "#f5f5f5",
                color: "#444",
                fontFamily: "Lato, sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e0e0e0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isConfirming || !otp}
              style={{
                flex: 1,
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                fontWeight: 600,
                transition: "all 0.3s ease",
                opacity: isConfirming || !otp ? 0.5 : 1,
                cursor: isConfirming || !otp ? "not-allowed" : "pointer",
                backgroundColor: "#fe9f30",
                color: "#fff",
                fontFamily: "Lato, sans-serif",
                letterSpacing: "1px",
              }}
              onMouseEnter={(e) => {
                if (!isConfirming && otp) {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.color = "#fe9f30";
                }
              }}
              onMouseLeave={(e) => {
                if (!isConfirming && otp) {
                  e.currentTarget.style.backgroundColor = "#fe9f30";
                  e.currentTarget.style.color = "#fff";
                }
              }}
            >
              {isConfirming ? "Confirming..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
