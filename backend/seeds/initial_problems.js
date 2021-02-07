// exports.seed = function (knex) {
//   return knex.raw(`
//     INSERT INTO problem VALUES (
//       DEFAULT, 
//       'Arrange these in order from least price to greatest price: Ruler-$0.55, Pen-$0.89, Notebook-$0.95, Sharpener-$0.69', 
//       null, 
//       'C', 
//       '
//         {
//           "A": "Ruler, Sharpener, Notebook, Pen", 
//           "B": "Ruler, Pen, Sharpener, Notebook",
//           "C": "Ruler, Sharpener, Pen, Notebook",
//           "D": "Sharpener, Ruler, Pen, Notebook"
//         }
//       '
//     ),
//     (
//       DEFAULT, 
//       'Max has $20 and buys a book for $5.75, How much money left?',
//       'Take away the $5.75: $20 − $5 = $15. Then take away the 75 cents: $15 - 75 cents = $14.25',
//       'A',
//       '
//         {
//           "A": "$14,25",
//           "B": "$14.75",
//           "C": "$20.75",
//           "D", "$15.25"
//         }
//       '
//     ),
    
//     VALUES (
//       DEFAULT, 
//       '672 students need to get on buses and each bus hold 42 students. How many buses does the school needs?',
//       '672 is close to 680 and 42 is close to 40, 680 ÷ 40 = 17 so the school needs about 17 buses',
//       'D',
//       '
//         {
//           "A": "About 7",
//           "B": "About 10",
//           "C": "About 12",
//           "D": "About 17"
//         }
//       '
//     ),

//     VALUES (
//       DEFAULT,
//       'Jill rounded 725 to the nearest ten. What result did she get?' 
//       'The last digit is 5 or more, so we round the 2 up to a 3. And so, 725 rounded to the nearest ten is 730',
//       'B',
//       '
//         {
//           "A": "720",
//           "B": "730",
//           "C": "725",
//           "D": "700"
//         }
//       '
//     ),

//     VALUES (
//       DEFAULT,
//       'If Lizzy started with 12,000 marbles, and then gave away 1,000 marbles every day for 4 days, 
//       how many marbles did she end up with?',
//       '
//         Here is how many marbles Lizzy had:
//         Started with 12,000
//         After 1 Day: 11,000
//         After 2 Days: 10,000
//         After 3 Days: 9,000
//         After 4 Days: 8,000
//       ',
//       'B',
//       '
//         {
//           "A": "7,000",
//           "B": "8,000",
//           "C": "9,000",
//           "D": "11,600"
//         }
//       '
//     ),

//     VALUES (
//       DEFAULT,
//       '
//         If you started with 11,000 marbles, you gave 1,000 to one friend, 
//         and then gave 1,000 more to another friend, how many marbles would you have left?
//       ',
//       '
//         Starting at 11,000, giving 1,000 to a friend leaves you with 10,000 and giving another 1,000 to another friend 
//         leaves you with 9,000
//       ',
//       'A',
//       '
//         {
//           "A": "9,000",
//           "B": "10,800",
//           "C": "13,000",
//           "D": "10,980"
//         }
//       '
//     ),

//     VALUES (
//       DEFAULT,
//       '
//         Drew is painting classrooms, and needs 6 liters of paint per room. 
//         If he has 48 liters of paint, how many rooms can he paint?
//       ',
//       'At 6 liters of paint per room, that makes: 48 liters / 6 liters = 8 rooms',
//       'D',
//       '
//         {
//           "A": "5",
//           "B": "9",
//           "C": "10",
//           "D": "8"
//         }
//       '
//     ),

//     VALUES (
//       DEFAULT,
//       'How many weeks is 49 days?',
//       'A week has 7 days, so: 49 / 7 = 7 weeks',
//       'C',
//       '
//         {
//           "A": "4",
//           "B": "5",
//           "C": "7",
//           "D": "9"
//         }
//       '
//     ),

//     VALUES (
//       DEFAULT,
//       '
//         The next day after his birthday Jas said: 
//         "The day after tomorrow will be Thursday." 
//         On what day of the week did Jas have his birthday?
//       ',
//       '
//         When Jas said "The day after tomorrow will be Thursday." it must have been Tuesday.
//         This was the next day after his birthday, so his birthday was on Monday.
//       ',
//       'A',
//       '
//         {
//           "A": "On Monday",
//           "B": "On Wednesday",
//           "C": "On Thursday",
//           "D": "On Sunday"
//         }
//       '
//     ),

//     VALUES (
//       DEFAULT,
//       'How many seconds is 12 minutes and 45 seconds?',
//       '
//         1 minute = 60 seconds, so 12 minutes = 12 × 60 seconds = 720 seconds.     
//         So, 12 minutes and 45 seconds = 720 seconds + 45 seconds = 765 seconds.
//       ',
//       'D',
//       '
//         {
//           "A": "1,245",
//           "B": "825",
//           "C": "775",
//           "D": "765"
//         }
//       '
//     )
//   `)
// };
