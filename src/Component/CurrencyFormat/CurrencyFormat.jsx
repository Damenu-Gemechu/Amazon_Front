/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import numeral from "numeral"
// const CurrencyFormat = (amount) => {
//   const formattedAmount=numeral(amount).format("$0,0.00")
//   return (
//     <div>{formattedAmount}</div>
//   )
// }

// export default CurrencyFormat


import numeral from "numeral";
const CurrencyFormat = ({ amount }) => {
  // Check if the amount is a valid number
  const isValidAmount = !isNaN(amount);

  // Format the amount only if it's a valid number
  const formattedAmount = isValidAmount ? numeral(amount).format("$0,0.00") : "invalid amount";

  return <div>{formattedAmount}</div>;
};

export default CurrencyFormat;
