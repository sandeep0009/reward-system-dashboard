import { useEffect, useState } from "react";
import { getLeaderboard } from "../features/users/userApi";
import { User } from "lucide-react";

const LeaderBoard = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const users = await getLeaderboard();
      setTopUsers(users);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">🏆 Leaderboard</h1>
        {topUsers.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-medium text-gray-600">{index + 1}.</span>
              <User size={24} className="text-gray-700" />
              <span className="font-semibold text-gray-800">{user.name.toUpperCase()}</span>
            </div>
            <span className="text-sm font-medium text-black">{user.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
