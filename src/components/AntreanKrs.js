"use client";

import { useState, useEffect } from "react";

export default function AntreanKrs() {
  const [antreanKrs, setAntreanKRS] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const respon = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5",
          { cache: "no-store" }
        );
        const daftarDosen = await respon.json();
        setAntreanKRS(daftarDosen);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {antreanKrs.map((tugas) => (
            <li key={tugas.id}>
              Tiket #{tugas.id}: {tugas.title} —{" "}
              <strong>
                {tugas.completed ? "✅ Selesai" : "⏳ Sedang Diproses . . . . ."}
              </strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}