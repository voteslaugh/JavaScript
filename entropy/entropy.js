let fs = require('fs');//объект для работы с файловой системой
let arg = process.argv;//объект для работы с аргументами командной строки
let n = 0;  //переменная-счетчик
let entr = 0;
let alph = new Array();//объект типа как-бы "массив"
let freq = new Array(); //переменная частоты
inputData = fs.readFileSync('test1.txt');//байтовый буфер //можно заменить на test2.txt/test3.txt
inputData = inputData.toString();//преобразовывает байтовый буфер в строку
for (i=0 ; i<inputData.length; i++){ //"прогоняем" i через строку
	alph[inputData.charAt(i)] = 0;
}
//отсчитываем число повторений букв
for (i=0 ; i<inputData.length; i++){
	alph[inputData.charAt(i)]++;
}
console.log(alph);        //"массив" символов
for (i in alph){
	freq[i]=alph[i]/inputData.length;     //высчет частоты
	n++;
}
for (i in alph){
    if(freq[i]==1){      //отдельный случай для одного символа, т.к. Java Script не настолько умный, чтобы знать свойства логарифмов
        entr=0;
    }
    else{
	entr-=freq[i]*(Math.log(freq[i])/Math.log(n)); //энтропия
}

}



console.log(entr);