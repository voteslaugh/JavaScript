const { strictEqual } = require('assert');
let fs = require('fs');
let i=0, n=1;
let outcode="";
let ost=0;
fs.readFile("input.txt", "utf-8", function(err, data){ //читает данные в файле инпут, обращенные в формат utf-8
    if (err) throw err; //"выкидывает" при ошибке
    inText=data.toString(); //переводит данные в файле в переменную
    //console.log(inText);
    while (i < inText.length){  //прогоняет i через весь текст
        symb=inText.charAt(i); //переменная, в которую записывает прогоняемый знак
        while(symb == inText.charAt(i+n)){         //пока соседние знаки равны, n увеличивается
            n++;     
        }
        if (inText.charAt(i)=='#'){
            if (n>255){
                m=Math.floor(n/255);
                outcode+=('#'+ String.fromCharCode(255)+symb).repeat(m)
                outcode+=('#'+ String.fromCharCode(n-(255*m))+symb);
            }
            if (n<=255){
                outcode+='#'+ String.fromCharCode(n)+symb
            }
            i=i+n;
            n=1;
            }
        else{
            if(n>=4) {                                      //если n превзошёл 4, то его надо сжать
                if(n>259){
                    m=Math.floor(n/259);//округление до меньшего
                    ost=n-259*m;                                 
                    outcode+=("#" + String.fromCharCode(255) + symb).repeat(m)
                    if (ost>0)
                        outcode+="#" + String.fromCharCode(ost) + symb;       
                }
                if (n<259)
                    outcode+="#" + String.fromCharCode(n-4) + symb;  
            }
            else 
                outcode+=symb.repeat(n);
            i=i+n;
            n=1;
        }
    }     
   // console.log (outcode); 
fs.writeFileSync("outcode.txt", String(outcode));           //записывает всё в файл ауткод
}) 