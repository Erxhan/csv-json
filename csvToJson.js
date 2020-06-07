const fs = require('fs');

fs.readFile('translations.tsv', (err, data) => {
    if (err) {
        console.log('err ===>', err)
        return
    }

    // The data from readFile is a big chunk Buffer => We transform it in String
    const bigString = data.toString()

    // We split this big string by the return character and make rows
    const rows = bigString.split('\n')

    // ROW => [Variable, en, fr_BE, nl_BE]
    let obj = {}
    rows.forEach((row, rowIndex) => {
        let rowSplit = row.split('\t')

        rowSplit.forEach((rowCol, index) => {
            if (rowIndex === 0) {
                if (index !== 0) {
                    obj[index] = {}
                }
            } else {
                if (index !== 0) {
                    obj[index] = {...obj[index], [rowSplit[0]]: rowSplit[index]}
                }
            }
        })
    })

    // Make a new object where the keys are renamed properly (1 => 'en', 2 => 'fr_BE', 3 => 'nl_BE', ...)
    const newObj = {}

    // Take only the first row, the headers and put them in an array
    const headers = rows[0].split('\t')

    // Iterate over the object with index based names
    Object.entries(obj).forEach(([key, value]) => {
        newObj[headers[key]] = value
    })

    // Iterate over each object in the new object and write a file based on the key ('en' => 'en.json', 'fr_BE' => 'fr_BE.json', 'nl_BE' => 'nl_BE.json')
    Object.entries(newObj).forEach(([key, value]) => {
        return fs.writeFile(`${key}.json`, JSON.stringify(value, null, 2), (err) => {
            if (err) throw err;
            console.log('SUCCESS WRITING JSON')
        })
    })

    // console.log('newObj ===>', newObj)
    return
})