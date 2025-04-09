

export const getActivitiesByUser = (userId) => {
    const allActivities = JSON.parse(localStorage.getItem("activities")) || [];
    return allActivities.filter((activity) => activity.userId === userId);
};
  