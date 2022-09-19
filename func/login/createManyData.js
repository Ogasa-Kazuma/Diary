const AccountManager = require("./IndexTest.js");
const accountManager = new AccountManager();

async function main(){
    for(let i = 200; i < 20000; i++){
        const r1 =  Math.random() * 10 + Math.random();
        const r2 = Math.random() * 10 + Math.random();
        const r3 = Math.random() * 10 + Math.random();
        await accountManager.register(i+r1, i+r2, i+r3);
    }
}

main();
