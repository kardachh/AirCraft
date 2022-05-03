import {openDatabase} from 'react-native-sqlite-storage';
import {setFavoritesFlights} from '../../redux/store';
import {useAppDispatch} from '../../redux/hooks';
import {useCallback} from 'react';

const errorCB = (error: unknown, sql?: string) => {
  console.log('SQL Error: ' + JSON.stringify(error), sql);
};

const successCB = (sql: string) => {
  console.log(`SQL executed fine: ${sql}`);
};

const openCB = () => {
  console.log('Database OPENED');
};

const db = openDatabase(
  {
    name: 'MainDB',
    location: 'Documents',
  },
  openCB,
  err => errorCB(err),
);

export const useDB = () => {
  const dispatch = useAppDispatch();

  const createFavoritesTable = useCallback(async () => {
    const sql = 'create table if not exists Favorites (flight_id integer);';
    await db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        () => successCB(sql),
        err => errorCB(err, sql),
      );
    });
  }, []);

  const dropTable = async () => {
    const sql = 'DROP TABLE IF EXISTS Favorites;';
    await db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        () => successCB(sql),
        err => errorCB(err, sql),
      );
    });
  };

  const addToFavorites = async (flight_id: number) => {
    const sql = `insert into Favorites values (${flight_id})`;
    await db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        () => successCB(sql),
        err => errorCB(err, sql),
      );
      getFavorites().then();
    });
  };

  const deleteFromFavorites = async (flight_id: number) => {
    const sql = `delete from Favorites where flight_id = ${flight_id}`;
    await db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        () => successCB(sql),
        err => errorCB(err, sql),
      );
      getFavorites().then();
    });
  };

  /**
   * Получение id отслеживаемых рейсов
   */
  const getFavorites = useCallback(async () => {
    const sql: string = 'select * from Favorites;';
    const response: any = [];
    await db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (transaction, {rows}) => {
          for (let i = 0; i < rows.length; i++) {
            response.push(rows.item(i).flight_id);
          }
          dispatch(setFavoritesFlights(response));
        },
        err => errorCB(err, sql),
      );
    });
  }, [dispatch]);

  // const selectTables = async () => {
  //   const sql =
  //     "SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%'";
  //   await db.transaction(tx => {
  //     tx.executeSql(
  //       sql,
  //       [],
  //       (transaction, resultSet) => console.log(resultSet.rows.item(0)),
  //       err => errorCB(err, sql),
  //     );
  //   });
  // };

  return {
    createFavoritesTable,
    dropTable,
    addToFavorites,
    deleteFromFavorites,
    getFavorites,
  };
};
