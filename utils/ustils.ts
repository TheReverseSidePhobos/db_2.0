export const convertDateFunc = (date: any) => {
  let newDate = Date.parse(date);
  let d = new Date(newDate);
  let yaer = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  let stringCorrectDate = `${day} : ${month} : ${yaer}`;
  return stringCorrectDate;
};
