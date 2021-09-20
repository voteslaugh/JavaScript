const { strictEqual } = require('assert');
let fs = require('fs');
let i=0;
let outcode="";
fs.readFile("outcode.txt", "utf-8", function(err, data){ //читает данные в файле ауткод, обращенные в формат utf-8
    if (err) throw err; //"выкидывает" при ошибке
    inText=data.toString(); //переводит данные в файле в переменную
    while (i < inText.length){  //прогоняет i через весь текст
        symb=inText.charAt(i); //переменная, в которую записывает прогоняемый знак        
        if (symb=="#"){
            nextsymb=inText.charAt(i+1);  //НЕ ЗАБЫВАТЬ ЧИТАТЬ КАЖДУЮ КОМАНДУ!!!! НЕ ЗАБЫВАТЬ, ЧТО НАДО БРАТЬ ИЗ ФАЙЛА!!!!!!!!!!!!!!!!!!!!
            numbersymb=nextsymb.charCodeAt();             
            outcode+=inText.charAt(i+2).repeat(numbersymb);
            i=i+3;
        }
        else{
            outcode+=symb;
            i++;
        }
}
//console.log(outcode)
fs.writeFileSync("decode.txt", String(outcode));
}
)
//String.charCodeAt