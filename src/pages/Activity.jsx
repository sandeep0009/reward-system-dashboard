import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getActivitiesByUser } from "../features/activities/activityApi";


const ActivityFeed = () => {
  const user = useSelector((state) => state.user.userInfo);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (user?.id) {
      const userActivities = getActivitiesByUser(user.id);

      console.log(userActivities)
      setActivities(userActivities);
    }
  }, [user]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Activity Feed</h2>
      {activities.length > 0 ? (
        activities?.map((activity, index) => (
          <div
            key={index}
            className="bg-white shadow rounded p-4 mb-2 flex justify-between items-center"
          >
            <span className="capitalize">{activity.type.replace("_", " ")}</span>
            <span className="text-green-600 font-bold">+{activity.points} pts</span>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No activities yet.</p>
      )}
    </div>
  );
};

export default ActivityFeed;
