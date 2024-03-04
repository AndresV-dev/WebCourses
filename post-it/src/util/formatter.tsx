export default function formatDate(date: Date, withTime: boolean) {
    let dateFormated = [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-');

      withTime? dateFormated += ' ' + // Validate If need to add the time on the variable
      [
       padTo2Digits(date.getHours()),
       padTo2Digits(date.getMinutes()),
       padTo2Digits(date.getSeconds()),
     ].join(':')
     :
     "";

     return (
        dateFormated
    );
  }

  // Add 0 if the date is only one digit
function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}