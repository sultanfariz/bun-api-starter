import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const serviceAccountEmail = process.env.GSHEET_EMAIL || '';
const serviceAccountPrivateKey = process.env.GSHEET_PRIVATE_KEY || '';
const sheetId = process.env.GSHEET_SHEET_ID || '';

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const serviceAccountAuth = new JWT({
  // env var values here are copied from service account credentials generated by google
  // see "Authentication" section in docs for more info
  email: serviceAccountEmail,
  key: serviceAccountPrivateKey.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);

const getSheet = async (sheetName: string, headerArray: string[]) => {
  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);

  const sheet = doc.sheetsByTitle[sheetName];
  if (sheet) {
    return sheet;
  }

  const newSheet = await doc.addSheet({
    title: sheetName,
    headerValues: headerArray,
  });
  return newSheet;
};

export { doc, getSheet };