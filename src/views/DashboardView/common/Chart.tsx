"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 50) + 40,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 50) + 40,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 50) + 40,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 50) + 40,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 50) + 40,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 50) + 40,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 50) + 40,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 50) + 40,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 50) + 40,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 50) + 40,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 50) + 40,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 50) + 40,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: any) => `$${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
