const main = () => {
    var args = process.argv.splice(2);
    var operation = args.shift();
    console.log(operation);
    console.log(args);
}

export default main;
