export const dateTransformer = (date: string) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const isToday = (date: string) =>
  new Date().toDateString() === new Date(date).toDateString();
