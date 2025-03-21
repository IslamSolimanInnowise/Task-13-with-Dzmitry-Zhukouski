const formatCvDate = (date: string | null | undefined) => {
  if (!date) return 'Till now';
  return new Date(date)
    .toLocaleDateString('en-GB', {
      month: '2-digit',
      year: 'numeric',
    })
    .replace('/', '.');
};

export default formatCvDate;
