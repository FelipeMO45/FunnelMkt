import React from "react";
import { IconType } from "react-icons";

interface CardProps {
  icon: IconType;
  title: string;
  value: string;
  percentage: string;
  trend: "up" | "down";
}

const Card: React.FC<CardProps> = ({ icon: Icon, title, value, percentage, trend }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg flex items-center space-x-4 w-full md:w-1/4">
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-full">
        <Icon className="text-white text-3xl" />
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h2 className="text-2xl font-bold text-yellow-400">{value}</h2>
        <p className={`text-sm ${trend === "up" ? "text-green-400" : "text-red-400"}`}>
          {trend === "up" ? "▲" : "▼"} {percentage}% this month
        </p>
      </div>
    </div>
  );
};

export default Card;
