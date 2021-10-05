let fs = require('fs');
function Node(letter, freq, used, father, code){
    //узел дерева
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.father = father;
    this.code = code;
}
 
//чтение из файла
let inputData = (fs.readFileSync('input.txt')).toString();
let alph = new Array();
 
//создание алфавита и просчет количества включений
for (let i = 0; i < inputData.length; i++){
    if (alph[inputData.charAt(i)])
        alph[inputData.charAt(i)]++;
    else{
        alph[inputData.charAt(i)] = 1;
    }
}
//создание массива со стартовыми узлами
let tree = new Array();
for (let i in alph)
{
    tree.push(new Node(i, alph[i]));
}
 
for (let i = 0; i < tree.length - 1; i++){
    //Ищем узлы с минимальным количеством включений
    let minFr1 = inputData.length;
    let minFr2 = inputData.length;
    let first = -1;
    let second = -1;
    for (let j = 0; j < tree.length; j++){
        if (tree[j].freq < minFr1 && !tree[j].used){
            minFr1 = tree[j].freq;
            first = j;
        }    
    }
 
    for (let j = 0; j < tree.length; j++){
        if (tree[j].freq < minFr2 && j != first && !tree[j].used){
            minFr2 = tree[j].freq;
            second = j;
        }    
    }
 
    if (first == -1 || second == -1){
        break;
    }
    //создаем новый узел
    let newString = tree[first].letter + tree[second].letter;
    let newFreq = tree[first].freq + tree[second].freq;
    tree.push(new Node(newString, newFreq));
    //установка обновленных значений дочерних узлов
    tree[second].used = true;
    tree[first].used = true;
    tree[first].father = tree.length - 1;
    tree[second].father = tree.length - 1;
}
//получения кодовых слов, соответствующих буквам из исходного алфавита
tree[tree.length - 1].code = '0';
tree[tree.length - 1].used = true;
for (let i = tree.length - 2; i >= 0; i--){
    if (tree[tree[i].father].used){
        tree[i].code = tree[tree[i].father].code + '1';
        tree[tree[i].father].used = false;
    }    
    else
        tree[i].code = tree[tree[i].father].code + '0';
 
}
//вывод итогового дерева
console.log(tree);