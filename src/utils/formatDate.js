function formatDateForkeyObj() {
  return new Date()
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

export default formatDate;
