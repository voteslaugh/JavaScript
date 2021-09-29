let fs = require('fs');//объект для работы с файловой системой
let arg = process.argv;//объект для работы с аргументами командной строки
let entr = 0;
let alph = new Array();//объект типа как-бы "массив"
inputData = fs.readFileSync('test1.txt');//байтовый буфер //можно заменить на test2.txt/test3.txt
inputData = inputData.toString();//преобразовывает байтовый буфер в строку
for (i=0 ; i<inputData.length; i++){ //"прогоняем" i через строку, инициализируем алфавит
	alph[inputData.charAt(i)] = 0;
}

for (i=0 ; i<inputData.length; i++){		//отсчитываем число повторений букв, число ячеек
	alph[inputData.charAt(i)]++;
}


alphmemb = i;


if (alphmemb>1){
	for (i in alph)
		entr-=(alph[i]/inputData.length)*(Math.log(alph[i]/inputData.length))     //энтропия
	entr/=Math.log(alphmemb);
}

console.log(alph);

console.log(entr)