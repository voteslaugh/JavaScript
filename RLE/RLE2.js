const { strictEqual } = require('assert');
let fs = require('fs');
let i=0;
let outcode="";
fs.readFile("outcode.txt", "utf-8", function(err, data){ //читает данные в файле ауткод, обращенные в формат utf-8
    if (err) throw err; //"выкидывает" при ошибке
    inText=data.toString(); //переводит данные в файле в переменную
    while (i<inText.length){
    if ((inText.charAt(i)=='#')) {
		if (inText.charAt(i+2)=='#')
			outcode+=('#').repeat(inText.charCodeAt(i+1))
		else 
			outcode+=(inText.charAt(i+2)).repeat(inText.charCodeAt(i+1)+4)
		i=i+3
	}
	else {
        outcode+=inText.charAt(i);	
        i++;
	}
	}
fs.writeFileSync("decode.txt", String(outcode));
})
//String.charCodeAt
