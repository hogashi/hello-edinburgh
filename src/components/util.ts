// util

const zfill = (n: number, c: number = 2) => {
  return `${'0'.repeat(c)}${n}`.slice(-c);
};

export const formatDate = (datetime: Date) => {
  const year = zfill(datetime.getFullYear(), 4);
  const month = zfill(datetime.getMonth() + 1);
  const date = zfill(datetime.getDate());
  const hour = zfill(datetime.getHours());
  const minute = zfill(datetime.getMinutes());
  const second = zfill(datetime.getSeconds());
  return `${year}/${month}/${date}-${hour}:${minute}:${second}`;
};
