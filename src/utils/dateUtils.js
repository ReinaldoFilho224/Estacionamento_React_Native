

export const getStartOfDay = (date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay;
  };
  
  export const getStartOfLast7Days = (date) => {
    const startOfLast7Days = new Date(date);
    startOfLast7Days.setDate(startOfLast7Days.getDate() - 6);
    startOfLast7Days.setHours(0, 0, 0, 0);
    return startOfLast7Days;
  };
  
  export const getStartOfSpecificDay = (date) => {
    const startOfSpecificDay = new Date(date);
    startOfSpecificDay.setHours(0, 0, 0, 0);
    return startOfSpecificDay;
  };
  