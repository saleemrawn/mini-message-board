const { argv } = require("node:process");
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
author VARCHAR (255),
message VARCHAR (500)
);

INSERT INTO messages (author, message) VALUES
('John', 'Hello, what a great day!'),
('Aisha', 'Has anyone seen the weather lately?'),
('Anthony', 'What trains are there to London?');
`;

async function main() {
  const databaseUrl = argv[2];
  const client = new Client({ connectionString: databaseUrl });

  try {
    console.log("seeding...");
    await client.connect();
    await client.query(SQL);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
    console.log("done");
  }
}

main();
