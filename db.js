import postgres from 'postgres';
import 'dotenv/config';

const {PHHOST, PGDATABASE, PHUSER, PHPASSWORD, ENDPOINT_ID} = process.env;
const URL = `postgres://${PHUSER}:${PHPASSWORD}@${PHHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

export const  sql = postgres(URL, {ssl:'require'});