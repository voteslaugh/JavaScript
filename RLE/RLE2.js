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
            nextsymb=inText.charAt(i+1);  //НЕ ЗАБЫВАТЬ ЧИТАТЬ КАЖДУЮ КОМАНДУ!!! НЕ ЗАБЫВАТЬ, ЧТО НАДО БРАТЬ ИЗ ФАЙЛА!!!(для себя)
            numbersymb=nextsymb.charCodeAt();  //декодированное число, идущее после решетки           
            outcode+=inText.charAt(i+2).repeat(numbersymb); //берем символ, который находится в 2 знаках от решетки, и повторяем его столько раз, чему равен декодированный numbersymb
            i=i+3; //после этого, перенести i на 3 знака вперед, проверять следующие знаки в строке
        }
        else{
            outcode+=symb; //если решетка не встречается, то продолжаем перебор
            i++;
        }
}
//console.log(outcode)
fs.writeFileSync("decode.txt", String(outcode));
}
)
//String.charCodeAt