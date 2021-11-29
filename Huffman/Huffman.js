let arg = process.argv;
let tree = [];
let alphabet = [];
let symbCodes = {};

//Функция создания узла дерева
function Node(letter, frequency, used, parent, code){
    this.letter = letter;
    this.frequency = frequency;
    this.used = used;
    this.parent = parent;
    this.code = code;
}
//Считывание строки с консоли
let string = arg[2].toString();

console.log('Строка: ', string);

//Создание алфавита символов строки
for (let i = 0 ; i < string.length; i++){
    alphabet[string.charAt(i)] = 0;
}

//Сопоставление символов алфавита с их частотой
for (let i = 0 ; i < string.length; i++){
    alphabet[string.charAt(i)]++;
}

//Обработка случая, когда в строке встречается только один символ
let count = 0;
for (let i in alphabet){
    count++;
}
if (count === 1){
    for (let i in alphabet){
        alphabet[i] = '0';
        symbCodes['0'] = i;
        console.log('Коды символов:\n-', i, '0');
    }
}
else {
    for (let i in alphabet){
        let n = new Node(i, alphabet[i], 0, null, '');
        tree.push(n);
    }

//Построение дерева
    while (tree.some(elem => elem.used === false)){
        let minIndex1, minIndex2;
        freq = Infinity;
        for (let i in tree){
            if ((!tree[i].used) && (tree[i].frequency <= freq)){
                minIndex1 = i;
                freq = tree[i].frequency;
            }
        }
        tree[minIndex1].used = 1;

        freq = Infinity;
        for (let i in tree){
            if ((!tree[i].used) && (tree[i].frequency <= freq)){
                minIndex2 = i;
                freq = tree[i].frequency;
            }
        }

        //Выход из цикла в случае, когда построение дерева дошло до корня
        if (freq === Infinity){
            break
        }

        tree[minIndex2].used = 1;

        //Задание родительского элемента для найденных узлов
        tree[minIndex1].parent = tree.length;
        tree[minIndex2].parent = tree.length;

        //Задание кода ветки от родительского эл-та к узлу
        tree[minIndex1].code += '0';
        tree[minIndex2].code += '1';

        //Создание родительского элемента
        let n = new Node(
            tree[minIndex1].letter + tree[minIndex2].letter,
            tree[minIndex1].frequency + tree[minIndex2].frequency,
            0,
            null,
            '');
        tree.push(n);
    }

    console.log('• Коды символов:')
    for (let i in alphabet){
        let codeOfSymb = '';
        let j = 0;

        while (i !== tree[j].letter){
            j += 1;
        }

        do {
            codeOfSymb = tree[j].code + codeOfSymb;
            j = tree[j].parent;
        } while ((tree[j].parent != null))

        symbCodes[codeOfSymb] = i;
        alphabet[i] = codeOfSymb;
        console.log('-', i, codeOfSymb);
    }
}

//Кодирование входной строки
let codedString = string;
for (let i in alphabet){
    codedString = codedString.replace(RegExp(i, 'g'), alphabet[i]);
}
console.log('Закодированная строка: ', codedString);

//Декодирование закодированной строки
let decodedData = '';
let symbol = ''
for (let i in codedString){
    symbol += codedString[i];
    if (symbCodes[symbol] !== undefined){
        decodedData += symbCodes[symbol];
        symbol = '';
    }
}
console.log('Раскодированная строка: ', decodedData)