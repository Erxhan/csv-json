const fs = require('fs');

fs.readFile('translations.tsv', (err, data) => {
    if (err) {
        console.log('err ===>', err)
        return
    }
    const bigString = data.toString()
    const rows = bigString.split('\t')
    console.log('rows ===>', rows)
    // ROW => [Variable, en, fr_BE, nl_BE]
    const header = rows[0]
    const headerTitles = header.split(',')
    // console.log('headerTitles ===>', headerTitles)
    const exampleRow = rows[1]
    // console.log('exampleRow ===>', exampleRow)
    // ROW => ["Something", "something", "quelque chose", "iets"]
    const split = bigString.split(',')
    // console.log('split ===>', split)
    // console.log('data ===>', data.toString())
})