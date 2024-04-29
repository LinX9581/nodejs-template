import { Client } from "ssh2";
import Mysql from "mysql2/promise";
import fs from "fs";

let pool; 
let poolReady = false; 

let localPort = 5000;

async function initializeDatabaseConnection() {
  if (pool) return;

  return new Promise((resolve, reject) => {
    const sshClient = new Client();

    sshClient.on("ready", () => {
      console.log("SSH Client Ready");
      sshClient.forwardOut("127.0.0.1", localPort, config.mysql.host, config.mysql.port || 3306, (err, stream) => {
        if (err) {
          console.error("Failed to forward port:", err);
          return;
        }

        pool = Mysql.createPool({
          host: config.mysql.host,
          user: config.mysql.user,
          password: config.mysql.password,
          port: "3306",
          stream,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });
        resolve();
      });
    });

    sshClient.connect({
      host: config.ssh.host,
      port: config.ssh.port,
      username: config.ssh.username,
      privateKey: fs.readFileSync(config.ssh.keyPath),
      //   debug: console.log
    });
  });
}

export async function query(sql, params = []) {
  await initializeDatabaseConnection(); // 確保數據庫連接已經建立
  if (!pool) {
    throw new Error("Database connection is not established.");
  }
  try {
    const [results] = await pool.query(sql, params);
    console.log("Query executed, results:", results);
    return results;
  } catch (err) {
    console.error("Database query error:", err);
    throw err;
  }
}

module.exports = query