// import {openDatabase} from 'react-native-sqlite-storage';

// const db = openDatabase('db');

// export const initDB = () => {
//   console.log('createDatabase');
//   return new Promise((resolve, reject) =>
//     db.transaction(tx => {
//       createTable(
//         tx,
//         'CREATE TABLE IF NOT EXISTS Notifications (id INTEGER PRIMARY KEY, title TEXT, body TEXT,time TEXT,isRead INTEGER)',
//         resolve,
//         reject,
//       );
//     }),
//   );
// };
//
// const createTable = (tx, sql, resolve, reject) => {
//   tx.executeSql(
//     sql,
//     [],
//     (tx, results) => {
//       console.log('create Table results:', results);
//       resolve();
//     },
//     error => {
//       console.log('create tables error', error);
//       reject();
//     },
//   );
// };
//
// export const addNotification = ({title, body, time, isRead}) => {
//   console.log('addNotification');
//   const sql =
//     'INSERT INTO  Notifications (title,body,time,isRead) VALUES (?,?,?,?) ';
//   const values = [title, body, time, isRead];
//   return new Promise((resolve, reject) => {
//     db.transaction(txn => {
//       txn.executeSql(sql, values, resolve, reject);
//     });
//   });
// };
//
// export const getNotifications = () => {
//   const sql = 'SELECT * FROM Notifications ORDER BY time DESC';
//   return new Promise((resolve, reject) => {
//     db.transaction(txn => {
//       txn.executeSql(
//         sql,
//         [],
//         (tx, results) => {
//           let values = [];
//           for (let i = 0; i < results.rows.length; i++) {
//             values.push(results.rows.item(i));
//           }
//           resolve(values);
//         },
//         reject,
//       );
//     });
//   });
// };
//
// export const deleteOldNotifications = () => {
//   let currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() - 30);
//   const sql = `DELETE FROM Notifications WHERE time<'${currentDate.toISOString()}'`;
//   return new Promise((resolve, reject) => {
//     db.transaction(tx =>
//       tx.executeSql(
//         sql,
//         [],
//         (tx, result) => {
//           console.log('success delete old values', result);
//           resolve();
//         },
//         error => {
//           console.log('deleteoldValues error', error);
//           reject();
//         },
//       ),
//     );
//   });
// };
//
// export const clearNotifications = () => {
//   const sql = 'DELETE FROM Notifications';
//   db.transaction(tx => {
//     tx.executeSql(
//       sql,
//       [],
//       (tx, result) => {
//         console.log('success update tables values', result);
//       },
//       error => {
//         console.log('update tables error', error);
//       },
//     );
//   });
// };
//
// export const resetRead = () => {
//   const sql = 'UPDATE Notifications SET isRead = 1 WHERE isRead = 0';
//   db.transaction(tx => {
//     tx.executeSql(
//       sql,
//       [],
//       (tx, result) => {
//         console.log('success update tables values', result);
//       },
//       error => {
//         console.log('update tables error', error);
//       },
//     );
//   });
// };
