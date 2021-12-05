function getTable(template)
{
    let table = [];
    for (let i = 0; i < template.length - 1; i++)
        table[template.charAt(i)] = i + 1;

    return table;
}
function find(inputStr, pattern, table)
{
    let result = [];
    let k = 0;
    let i = pattern.length - 1;
    while (i < inputStr.length)
    {
        k = 0;
        for (let j = 0; j < pattern.length; j++)
        {
            if (inputStr.charCodeAt(i - j) == pattern.charCodeAt(pattern.length - 1 - j))
                k++;
            else break;
        }

        if (k == pattern.length)
            result.push(i - pattern.length + 1);

        if (!(table[inputStr.charAt(i)]))
            i += pattern.length;
        else
            i += pattern.length - table[inputStr.charAt(i)];
    }
    return result;
}
let arg = process.argv;
let templ = arg[3];
let inputStr = arg[2];
let table = getTable(templ);
console.log(find(inputStr, templ, table));