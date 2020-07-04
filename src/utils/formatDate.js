export function formatDateForkeyObj(d) {
  console.log('[new Date(d)]', new Date(d));
  return new Date(d)
    .toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
    .split('/')
    .reverse()
    .join('-');
}

const formatDate = (date) =>
  new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

export const formatDateForMickey = (date) => {
  return new Date(date)
    .toLocaleDateString('en-EN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    .replace(/\//g, '-');
};

export function getFirstDay(d) {
  d = new Date(d);
  var day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

export function getPreviousMonday() {
  var date = new Date();
  var day = date.getDay();
  var prevMonday;
  if (date.getDay() === 0) {
    prevMonday = new Date().setDate(date.getDate() - 6);
  } else {
    prevMonday = new Date().setDate(date.getDate() - day - 6);
  }

  return prevMonday;
}

const setZero = (minuts) => (minuts < 10 ? '0' : '');

export function returnHours({ start, end }) {
  const startHour = new Date(start);

  const endHour = new Date(end);

  return `${startHour.getUTCHours()}h${setZero(
    startHour.getUTCMinutes()
  )}${startHour.getUTCMinutes()} - ${endHour.getUTCHours()}h${setZero(
    endHour.getUTCMinutes()
  )}${endHour.getUTCMinutes()}`;
}

export default formatDate;
