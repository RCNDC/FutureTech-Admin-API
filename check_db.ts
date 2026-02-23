import { db } from "./src/util/config/db";

const fs = require('fs');
async function check() {
    const keys = Object.keys(db).filter(k => !k.startsWith('_'));
    fs.writeFileSync('db_keys.json', JSON.stringify(keys, null, 2));
    process.exit(0);
}

check();
