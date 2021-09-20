const { strictEqual } = require('assert');
let fs = require('fs');
let i=0, n=1;
let outcode="";
fs.readFile("input.txt", "utf-8", function(err, data){ //читает данные в файле инпут, обращенные в формат utf-8
    if (err) throw err; //"выкидывает" при ошибке
    inText=data.toString(); //переводит данные в файле в переменную
    //console.log(inText);
    while (i < inText.length){  //прогоняет i через весь текст
        symb=inText.charAt(i); //переменная, в которую записывает прогоняемый знак
        while(symb == inText.charAt(i+n)){         //пока соседние знаки равны, n увеличивается
            n++;     
        }
        if(n>=4) {                                      //если n превзошёл 4, то его надо сжать
            if(n>=255){
                m=Math.floor(n/255);      //округление до меньшего                           
                outcode+=("#" + String.fromCharCode(255) + symb).repeat(m)+ "#" + String.fromCharCode(n-m*255) + symb; //тут всё ясно

            }
            else
            outcode+="#" + String.fromCharCode(n) + symb;
        }
        else 
            outcode+=symb.repeat(n);       //записывает символы, число повторения которых меньше 4
        i += n;             //запускает всё по новой
        n = 1;
        }
    //console.log (outcode); 
    fs.writeFileSync("outcode.txt", String(outcode));           //записывает всё в файл ауткод
}
)