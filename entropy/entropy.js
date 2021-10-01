let fs = require('fs');
let arg = process.argv;
let i, n = 0;	//прогоняемый символ + счетчик
let entr = 0//переменная с энтропией
let alph = new Array()//переменная-"массив" для символов строки

let inputData = fs.readFileSync('test3.txt').toString();//переменная с данными файла, перенесенными в строку

for (i = 0 ; i<inputData.length; i++){		//инициализация алфавита
	alph[inputData.charAt(i)] = 0
}

for (i = 0 ; i<inputData.length; i++){ //подсчёт всех букв, кол-ва их повторов
	alph[inputData.charAt(i)]++;
}
console.log(alph);

for (i in alph){				//частота
	alph[i]/=inputData.length;
	n++;
}

if (n>1){
	for (i in alph)
		entr-=(alph[i])*(Math.log(alph[i])/Math.log(n));	//энтропия
}
console.log(entr)