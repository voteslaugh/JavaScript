let arg = process.argv;
let fs = require('fs');
let string = arg[2].toString();
let substring = arg[3].toString();
alph = [];
alphabet = [];
//инициализация алфавита строки
for (let i = 0; i < substring.length; i++){
    alph[substring.charAt(i)] = 0;
    alphabet[i] = substring.charAt(i);
}
del = new Array(substring.length + 1)
for (let i = 0; i <= substring.length; i++){
    del[i] = [];
}
//Инициализация таблицы переходов
for (let i in alph){
    del[0][i] = 0;
}
//Формирование таблицы
for (let i = 0; i < substring.length; i++){
    let prev = del[i][substring.charAt(i)]
    del[i][substring.charAt(i)] = i+1
    for(let j in alph){
        del[i+1][j] = del[prev][j]
    }
}
console.log('\nТаблица переходов:');
for (let i = 0; i <= substring.length; i++) {
    let out = '';
    for (let j in alph){
        out += del[i][j] + ' ';
    }
    console.log(i, out);
}
let state = 0;
result = [];
for (let i = 0; i < string.length; i++){
    if (alphabet.indexOf(string.charAt(i)) !== -1){
        state = del[state][string.charAt(i)];
        if (state === substring.length){
            result.push(i - substring.length + 1);
        }
    }
    else state = 0;
}

console.log('\nВхождения подстроки ' + substring + ': ', result);