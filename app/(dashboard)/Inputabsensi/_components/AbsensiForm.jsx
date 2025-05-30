'use client';

import { useState } from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";

const students = [
  { id: 1, name: 'Akio Anak Baik Sekali' },
  { id: 2, name: 'Akio Anak Baik Sekali' },
  { id: 3, name: 'Akio Anak Baik Sekali' },
  { id: 4, name: 'Akio Anak Baik Sekali' },
  { id: 5, name: 'Akio Anak Baik Sekali' },
];

export default function AttendanceForm() {
  const [attendance, setAttendance] = useState({});
  const [lastEdit, setLastEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(true);

  // State untuk Hari, Mulai, dan Selesai
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  const handleAttendanceChange = (id, status) => {
    if (!isEditing) return;

    setAttendance((prev) => ({
      ...prev,
      [id]: { status, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) },
    }));
    setLastEdit(new Date().toLocaleString());
  };

  const handleSave = () => {
    setIsEditing(false);
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleGenerate = () => {
    const now = new Date();

    // Set Hari (format: Senin, 17-02-2025)
    const dayName = now.toLocaleDateString('id-ID', { weekday: 'long' });
    const date = now.toLocaleDateString('id-ID');
    setDay(`${dayName}, ${date}`);

    // Set Waktu Mulai (format: 07.30 am)
    const start = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    setStartTime(start);

    // Set Waktu Selesai (+30 menit dari waktu mulai)
    const end = new Date(now.getTime() + 30 * 60000); // +30 menit
    const endFormatted = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    setEndTime(endFormatted);

    setIsEditable(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-5 border rounded-2xl shadow-md bg-white">
      <style>
        {`
          input[type="radio"]:disabled {
            accent-color: black;
            cursor: not-allowed;
          }
        `}
      </style>

      {/* Bagian Info */}
      <div className="mb-4 ml-5 gap-4">
        <div className="flex">
          <strong className="w-28">Kelas</strong> <span>: X-A</span>
        </div>
        <div className="flex">
          <strong className="w-28">Hari</strong>
          {isEditable ? (
            <input
              type="text"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="border px-2 py-1 rounded-md"
            />
          ) : (
            <span>: {day}</span>
          )}
        </div>
        <div className="flex">
          <strong className="w-28">Mulai</strong>
          {isEditable ? (
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border px-2 py-1 rounded-md"
            />
          ) : (
            <span>: {startTime}</span>
          )}
        </div>
        <div className="flex">
          <strong className="w-28">Selesai</strong>
          {isEditable ? (
            <input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border px-2 py-1 rounded-md"
            />
          ) : (
            <span>: {endTime}</span>
          )}
        </div>
      </div>

      {/* Tombol Generate */}
      <div className="py-4 text-center ml-5 -mt-5">
        <button
          className="px-4 py-2 bg-blue-700 text-white rounded-md flex items-center justify-center"
          onClick={handleGenerate}
        >
          <FaExternalLinkAlt className="mr-2" />
          Generate Absensi
        </button>
      </div>

      {/* Tabel Absensi */}
      <table className="w-full border-t border-gray-300">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-2">No</th>
            <th className="py-2">Nama</th>
            <th className="py-2">Hadir</th>
            <th className="py-2">Tidak Hadir</th>
            <th className="py-2">Terlambat</th>
            <th className="py-2">Waktu</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} className="border-b border-gray-300 text-center">
              <td className="py-2">{index + 1}.</td>
              <td className="py-6 pl-3">{student.name}</td>
              {['Hadir', 'Tidak Hadir', 'Terlambat'].map((status) => (
                <td key={status} className="py-2 px-10">
                  <input
                    type="radio"
                    name={`attendance-${student.id}`}
                    checked={attendance[student.id]?.status === status}
                    onChange={() => handleAttendanceChange(student.id, status)}
                    disabled={!isEditing}
                  />
                </td>
              ))}
              <td className="py-2">{attendance[student.id]?.time || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tombol Action */}
      <div className="mt-4 flex space-x-2">
        {isEditing ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
      </div>

      {lastEdit && <p className="mt-2 text-gray-600">Last Edit: {lastEdit}</p>}
    </div>
  );
}
