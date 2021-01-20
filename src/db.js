import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('post.db');

export class DB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS post (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, booked INT)',
          [],
          resolve,
          (_, error) => reject(error),
        );
      });
    });
  }

  static getPost() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM post',
          [],
          (_, res) => resolve(res.rows._array),
          (_, error) => reject(error),
        );
      });
    });
  }

  static createPost({ text, date, booked, img }) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO post (text, date, booked, img) VALUES (?, ?, ?, ?)`,
          [text, date, 0, img],
          (_, res) => resolve(res.insertId),
          (_, error) => reject(error),
        );
      });
    });
  }

  static updatePost(post) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE post SET booked = ? WHERE id = ?',
          [post.booked ? 0 : 1, post.id],
          resolve,
          (_, error) => reject(error),
        );
      });
    });
  }

  static deletePost(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM post WHERE id = ?',
          [id],
          resolve,
          (_, error) => reject(error),
        );
      });
    });
  }
}