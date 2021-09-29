let fs = require('fs');
let arg = process.argv;
let inputData; 
let i, sum, entr = 0;
let alph = new Array()

inputData = fs.readFileSync('input.txt').toString();  //test1/test2/test3 на выбор


for (i = 0 ; i<inputData.length; i++)   //инициализация алфавита
	alph[inputData.charAt(i)] = 0

for (i = 0 ; i<inputData.length; i++){      //записываем число повторов, объектов
	alph[inputData.charAt(i)]++;
}
sum=i;
console.log(alph);

if (sum>1){
	for (i in alph)
		entr-=(alph[i]/inputData.length)*(Math.log(alph[i]/inputData.length))     //энтропия
	entr/=Math.log(sum)
}
console.log(entr)