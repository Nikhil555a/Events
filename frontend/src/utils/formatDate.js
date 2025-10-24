export const formatEventDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${formattedDate} AT ${hours}:${minutes} ${ampm}`;
};


