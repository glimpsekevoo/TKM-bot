const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0Z0aXpyUkFxTDB3SHlySFVmckxOb2NDN2FiNHFORno5aldCZ3lUb2xrMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic2xObU5zbi96OXhKZUJrWXJFS2ZQTStXUGI1NE5MYXA5T2U0ZTg5cS9pMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnUGR4UjNJSERZVnhmYjdFSk1JZ0tSS3M3bHFLRnhTUmt4TTM3bHh5aW00PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmSUVHcm1rRGFxMHNrd2NLZ014em5Zc3h0K2ZkMmZ6R2FtZUdBRjlKL2hFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdQTWJqdm1FbkpEV3Q5a1FkNmZ5dFZtQU5EL0JlSUNrcStNYmJpcGtMblk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imp5MDdIRjFQUkJLK2NXWlpHeko2L1lITDRTTmU5MDdJeFFRT1VocXlFajg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ05vZ0J0MFAreTlNa3M5NGNyeDlHbHorSDhvUjlJNVdLRGV6QXhsWElVMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidWZLL3pqckZZbkY3TWlKL0RZcGYveUZEMWM3OERCdDV3SjFPcDhXOVVpWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFDZ1d4a2lhR1JCaW54N3R3VTJ2ODBMRzh1NVhRdWRYME5FY2dBbWNDLzRncjduUzUzSTUybjlsVlBWcHYxN1BpWDNzU1FReFQrc0hXMElhMzB1SENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTQsImFkdlNlY3JldEtleSI6IjBmWUp0K09kY09KZHFZc0s1MUZtdGNaaE5NRVY0bG5UYmpWc0lsbFJvYzA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMywiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMzLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkNQLWllSlgyUkxxQjVSS1VfOGFkMWciLCJwaG9uZUlkIjoiYzA0Mzg5ZjAtYWQ1Mi00ZTg3LWEzYTItZTIyMzU5ZjQ0NjQ3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktrWHA4TEV4TmV3YWg5YmsrRjhBWTJoS0taTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWZDliYkhieVJkOGZGUnF3N29jNlA1S1RzZ3M9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVktUVjc1SlEiLCJtZSI6eyJpZCI6IjI1NDc5ODUxNTA1MjoxNkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJ+UHJpbmNlIHJvY2t5IHdyeSAswr/Cvz8/In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQaUpxZGdIRU8rdG5yUUdHQ1VnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ2cnpKc3oyNjVwbjNha1JSak9oMUUwZXBCQTZUcXhJelNBWjdqcXVtclE4PSIsImFjY291bnRTaWduYXR1cmUiOiJ0cTAzOFBMcE9kQlBkWG1rdXlqcmw2M29MbGRGVnR5S0hUQWwyK2V3ODhBWXVIZjZzQ3lTVzYzSFQzWEZWVklhQUxRU1lwMjRzdkE1TDNvSkhoem1Bdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUlhIa05rcG43bjZrRE45SEFpK0VvcWxzTkdBSDVYa3Qyc2pwVEUwV3NGQ2VaMmhGd25Xc0dvcXVsaTU3ZHhCRkRMM25QTnpteUNvWGJmODhWRjlVQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3OTg1MTUwNTI6MTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYjY4eWJNOXV1YVo5MnBFVVl6b2RSTkhxUVFPazZzU00wZ0dlNDZycHEwUCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDE2MjA0NSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBK0gifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "263785028126",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
