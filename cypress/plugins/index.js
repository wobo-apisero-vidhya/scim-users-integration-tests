/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
 

const mysql = require("mysql");
function queryTestDb(query) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'docker',
    password : 'docker',
    database : 'docker'
  });
  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        // console.log(results)
        return resolve(results);
      }
    });
  });
}
 
module.exports = (on) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.args.push('--auto-open-devtools-for-tabs');
      return launchOptions;
    }
  });
  on("task", {
    queryDb: query => {
      return queryTestDb(query);
    }
  });
};
