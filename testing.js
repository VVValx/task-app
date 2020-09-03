// const calc = (fn, sn, callback) => {
//   setTimeout(() => {
//     if (isNaN(fn) || isNaN(sn)) return callback("Please enter numbers only");
//     const sum = fn + sn;
//     callback(sum);
//   }, 4000);
// };

// calc(10, 8, (error, data) => {
//   if (error) return console.log(error);
//   console.log(data);
// });

// const calc = (fn, sn) => {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       if (isNaN(fn) || isNaN(sn)) rej("Please enter numbers only");

//       res(fn + sn);
//     }, 2000);
//   });
// };

// (async function () {
//   try {
//     const result = await calc(33, 5);
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// })();

const sum = (f, s) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (isNaN(f) || isNaN(s)) rej("Please enter a number");

      res(f + s);
    }, 2000);
  });
};

// (async function calc() {
//   try {
//     const sum1 = await sum(3, 5);
//     console.log(sum1);
//     const sum2 = await sum(sum1, 6);
//     console.log(sum2);
//   } catch (error) {
//     console.error(error);
//   }
// })();
