const fs = require('fs');

fs.readFile('translations.tsv', (err, data) => {
    if (err) {
        console.log('err ===>', err)
        return
    }
    const bigString = data.toString()

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

    const newObj = {}
    const headers = rows[0].split('\t')
    Object.entries(obj).forEach(([key, value]) => {
        console.log('headers[key] ===>', headers[key])
        newObj[headers[key]] = value
    })

    Object.entries(newObj).forEach(([key, value]) => {
        fs.writeFile(`${key}.json`, JSON.stringify(value), (err) => {
            if (err) throw err;
            console.log('SUCCESS WRITING JSON')
            return
        })
    })

    console.log('newObj ===>', newObj)
})