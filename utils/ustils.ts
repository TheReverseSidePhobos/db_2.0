export const convertDateFunc = (date: any) => {
  let newDate = Date.parse(date);
  let d = new Date(newDate);
  let yaer = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  let stringCorrectDate = `${day} : ${month} : ${yaer}`;
  return stringCorrectDate;
};

export const compare = (a1: any, a2: any) => {
  return a1.length == a2.length && a1.every((v: any, i: any) => v === a2[i]);
};
