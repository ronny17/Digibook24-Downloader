const prompt = require('prompt-sync')({sigint: true});
const fetch = require('node-fetch');
const aesjs = require('aes-js');
const PDFDocument = require('pdf-lib').PDFDocument;
const fs = require('fs');
const sanitize = require("sanitize-filename");
const puppeteer = require('puppeteer');
// const md5 = require('md5');

let key = new Uint8Array([30, 0, 184, 152, 115, 19, 157, 33, 4, 237, 80, 26, 139, 248, 104, 155]);

async function downloadAndDecryptFile(url) { 
    
    return new Promise(async (resolve, reject) => {
        let file = await fetch(url, {method: "GET"}).then(res => res.buffer());

        //console.log(file);

        try {
            let start = file.indexOf("start")+6;
            let startEnd = file.indexOf("path", start)-1;

            let startPosition = file.slice(start, startEnd).reverse().reduce((a,c,i) => a+c*Math.pow(256,i));

            let firstPart = file.slice(256, startPosition);
            let secondPart = new Uint8Array(file.slice(startPosition));

            var aesCbc = new aesjs.ModeOfOperation.cbc(key, firstPart.slice(0, 16));
            var decryptedFirstPart = aesCbc.decrypt(firstPart.slice(16));

            // this mess is to fix what i belive to be a bug in the aes js module
            if (decryptedFirstPart.slice(decryptedFirstPart.length-16).every(e=>e==16)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-16);
            }

            if (decryptedFirstPart.slice(decryptedFirstPart.length-15).every(e=>e==15)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-15);
            }

            if (decryptedFirstPart.slice(decryptedFirstPart.length-14).every(e=>e==14)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-14);
            }

            if (decryptedFirstPart.slice(decryptedFirstPart.length-13).every(e=>e==13)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-13);
            }

            if (decryptedFirstPart.slice(decryptedFirstPart.length-12).every(e=>e==12)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-12);
            }

            if (decryptedFirstPart.slice(decryptedFirstPart.length-11).every(e=>e==11)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-11);
            }

            if (decryptedFirstPart.slice(decryptedFirstPart.length-10).every(e=>e==10)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-10);
            }

            if (decryptedFirstPart.slice(decryptedFirstPart.length-9).every(e=>e==9)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-9);
            }

            if (decryptedFirstPart.slice(decryptedFirstPart.length-8).every(e=>e==8)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-8);
            }

            if (decryptedFirstPart.slice(decryptedFirstPart.length-7).every(e=>e==7)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-7);
            }

            if (decryptedFirstPart.slice(decryptedFirstPart.length-6).every(e=>e==6)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-6);
            }

            if (decryptedFirstPart.slice(decryptedFirstPart.length-5).every(e=>e==5)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-5);
            }

            if (decryptedFirstPart.slice(decryptedFirstPart.length-4).every(e=>e==4)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-4);
            }

            if (decryptedFirstPart.slice(decryptedFirstPart.length-3).every(e=>e==3)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-3);
            }

            if (decryptedFirstPart.slice(decryptedFirstPart.length-2).every(e=>e==2)) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-2);
            }

            if (decryptedFirstPart[decryptedFirstPart.length-1] == 1) {
                decryptedFirstPart = decryptedFirstPart.slice(0, decryptedFirstPart.length-1);
            }

            let result = new Uint8Array(decryptedFirstPart.length + secondPart.length);
            result.set(decryptedFirstPart);
            result.set(secondPart, decryptedFirstPart.length);
            resolve(result);
        } catch (e) {
            reject({e, file})
        }
        
    });
    

}

function searchJSON (json, where, is) {
    for(var itm in json){
        var item = json[itm];
        for(var key in item){
            if(key == where && item[key] == is){
                return item["value"];
            }
        }
    } 
}

(async () => {
    var sessionID = "";
    do{
        var resp = prompt('USE CHROMIUM LOGIN (y/n) ? : ');
    }while(resp != "y" && resp != "n");
    if(resp == 'y'){
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://web.digibook24.it/users/sign_in');
        prompt("WHEN LOGIN IS COMPLETE AND PAGE LOADED, PRESS ENTER");
        const cookies = await page.cookies();
        sessionID = searchJSON(cookies, "name", "_bsw_session_v1_production");
        await browser.close();
    }else{
        var dataFile = "";
        try {
          dataFile = fs.readFileSync('sessionID.txt', 'utf8');
        } catch (err) {
            //
        }
        if(dataFile != null && !dataFile.includes("Paste here cookie session value"))
            sessionID = dataFile;
        else{
            do{
                sessionID = prompt('Input "_bsw_session_v1_production" cookie:');
            }while(sessionID.startsWith("_bsw_session_v1_production"));
        }
        sessionID = sessionID.trim();
        try
        {
            sessionID = decodeURIComponent(sessionID);
            sessionID = encodeURIComponent(sessionID);
        }catch(err)
        {
            //
        }
    }
    var user = null;
    try{
        user = await fetch("https://web.digibook24.com/api/v6/user", {headers: {cookie:"_bsw_session_v1_production="+sessionID}});
    }catch(e){
        console.log("Errore durante la creazione della sessione");
        return;
    }
    if (user.status != 200) {
        console.log("Impossibile connettersi");
        return;
    }

    user = await user.json();

    let headers = {"auth_token": user.auth_token};

    let books = await fetch(`https://web.digibook24.com/api/v6/books?page_thumb_size=medium&per_page=25000`, {headers}).then(res => res.json());

    if (books.length == 0) {
        console.log('Non ci sono libri nella tua libreria online!');
    } else {
        console.log("Lista libri attivi:");
        books.forEach((b) => {
            console.log(`ID : ${b.id} -> ${b.title}`);
        });
        
    }
    let bookId = prompt(`Inserisci l\'id del libro : ${(books.length == 0 ? " manually" : "")}`);

    let book = await fetch(`https://web.digibook24.com/api/v6/books/by_book_id/${bookId}`, {headers});

    if (book.status != 200) {
        console.log("ID libro non valido");
        return;
    }

    book = await book.json();

    let info = [];
    let page = 1;
    while (true) {
        //console.log(page);
        let tempInfo = await fetch(`https://web.digibook24.com/api/v5/books/${book.id}/${book.current_edition.revision}/resources?per_page=500&page=${page}`, {headers}).then(res => res.json());
        info = info.concat(tempInfo);
        if (tempInfo.length < 500) break;
        page++;
    }
    
    console.log("Sto scaricando le pagine");

    const outputPdf = await PDFDocument.create()

    for (i = 0; i<info.length; i++) {
        for (j = 0; j<info[i].assets.length; j++) {
            try{    
                console.log(`Download in corso. ${(i/info.length*100).toFixed(2)}%`);
                //console.log(`Download in corso . `);
                if (info[i].assets[j].use != "page_pdf") continue;
                //let pageData = await downloadAndDecryptFile(info[i].assets[j].url).catch((e) => {console.log("Errore durante il download", e, i, j, info[i].assets[j].url)});
                let pageData = await downloadAndDecryptFile(info[i].assets[j].url).catch((e) => {console.log("Errore durante il download")});
                const page = await PDFDocument.load(pageData);
                const [firstDonorPage] = await outputPdf.copyPages(page, [0]);
                outputPdf.addPage(firstDonorPage);
            }catch(err){
                console.log("Errore durante il download. Controllare cookie sessione e aggiornarlo se scaduto");
            }
        }
    }

    //fs.writeFile(prompt("Input file name:") + ".pdf", await outputPdf.save(), (e)=>{});

    fs.writeFile(sanitize(book.id + " - " + book.title + ".pdf"), await outputPdf.save(), (e)=>{});

    console.log("Salvataggio . . .");

})();
