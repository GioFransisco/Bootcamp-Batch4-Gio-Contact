const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const readline = require('readline')
const validator = require('validator')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//membuat direktori data jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}
//membuat path ./data/contacts.json jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8');
}  

const question = (questions, answers) => {
    return new Promise((resolve, rejects) => {
        rl.question(questions, (answer) => {
            resolve(answer)
        })
    });
}

const main = async() => {
    const name = await question('what is your name : ', 'your name is : ')
    const email = await question('what is your email : ', 'your email is : ')
    if(!validator.isEmail(email)){
        console.log('your email is wrong format');
        rl.close();
        return(false);
    }
    const phone = await question('what is your phone : ', 'your phone is : ')
    if(!validator.isMobilePhone(phone, 'id-ID')){
        console.log('your phone is wrong format (use ID format)');
        rl.close();
        return(false);
    }
    //membuat variable untuk menginputkan name, email, dan phone dalam bentuk object
    const contact = {name, email, phone};
    //membuat variable untuk membaca file dari contacts.json
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    //buat variable contacts yang didalamnya ada fungsi pharsing yang berfungsi untuk mentranslate file dari utf-8 menjadi file json
    const contacts = JSON.parse(file);
    // untuk menambah data
    contacts.push(contact);
    // setelah melakukan push, buat menjadi agar bisa di tuliskan di dalam contacts.json 
    // fungsi stringify = mengubah file dari json menjadi string 
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(`your name is ${name}`)
    console.log(`your email is ${email}`)
    console.log(`your phone is ${phone}`)
    rl.close();
}
main();