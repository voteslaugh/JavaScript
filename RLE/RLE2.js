const { strictEqual } = require('assert');
let fs = require('fs');
let i=0;
let outcode="";
fs.readFile("outcode.txt", "utf-8", function(err, data){ //читает данные в файле ауткод, обращенные в формат utf-8
    if (err) throw err; //"выкидывает" при ошибке
    inText=data.toString(); //переводит данные в файле в переменную
    while (i<inText.length){
    if ((inText.charAt(i)=='#')) {
		if (inText.charAt(i+2)=='#'){
			outcode+=('#').repeat(inText.charCodeAt(i+1))
			//console.log(outcode + "1");
			//console.log(i + "1");
			i=i+6;
		}
		else  {
			outcode+=(inText.charAt(i+2)).repeat(inText.charCodeAt(i+1)+4)
			//console.log(outcode + "2");
			//console.log(i + "2");
			i=i+3
		}
	}
	else {
        outcode+=inText.charAt(i);
		//console.log(outcode + "3");
		//console.log(i + "3");
        i++;
	}
	}
	fs.writeFileSync("decode.txt", String(outcode));
}
)
//String.charCodeAt
