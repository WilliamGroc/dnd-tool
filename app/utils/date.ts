export function toOneWeek(date: Date = new Date()): Date {
  const oneWeekAgo = new Date(date);
  oneWeekAgo.setDate(oneWeekAgo.getDate() + 7);
  return oneWeekAgo;
}