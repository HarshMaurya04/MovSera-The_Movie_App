export const minutesToHours = (minutes) => {
  const hour = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hour}h ${mins}m`;
};

export const ratingToPercentage = (rating) => {
  return (rating * 10).toFixed(0);
};

export const resolveRatingColor = (rating) => {
  if (rating <= 5) {
    return "#AF0404";
  } else if (rating <= 7 && rating > 5) {
    return "#FF6D28";
  } else if (rating <= 10 && rating > 7) {
    return "#332FD0";
  }
};

export const showsSeason = (season) => {
  if (season === 1) {
    return "Season";
  } else {
    return "Seasons";
  }
}

export const showsEpisode = (episode) => {
  if (episode === 1) {
    return "Episode";
  } else {
    return "Episodes";
  }
}