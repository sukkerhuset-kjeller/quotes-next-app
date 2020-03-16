var dataCount = process.argv.length == 3 ? Number(process.argv[2]) : 10;
console.log('db.quotes.insertMany([');
for (var i = 0; i < dataCount; i++) {
    console.log(
        `    {
        text: "Quote #${i + 1}",
        date: "1582329600000",
        saidBy: "5e5a7051e2db041719cdcf99",
        tags: [],
        hearts: [],
    }` + (i + 1 < dataCount ? ',' : '')
    );
}
console.log('])');
