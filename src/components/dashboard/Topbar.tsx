"use client";

import { useEffect, useState } from "react";

type TopbarProps = {
  title: string;
};

export default function Topbar({ title }: TopbarProps) {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const formatDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    formatDate();
  }, []);

  return (
    <header className="topbar">
      <h1>{title}</h1>
      <p>{currentDate}</p>
    </header>
  );
}
