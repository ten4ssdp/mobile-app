function formatDate() {
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

export default formatDate;
