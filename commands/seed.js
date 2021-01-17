var fs = require('fs');
var ejs = require('ejs');
var root = __dirname + '/../';


module.exports.create = (name) => {
    if (!name) return console.red('Name model is not defined');
    name = name.pascal();
    let models = fs.readdirSync('./db/models');

    // make sure this model exists
    let modelInd = models.indexOf(name + '.js');
    if (modelInd === -1)
         console.warn('You have yet to create a model: ' + name);

    console.cyan('Creating a Seed file for: ' + name);
    let file = ejs.render(fs.readFileSync(root + 'templates/seed.ejs', 'utf-8'), {name});

    fs.writeFileSync(`db/seeders/${name}-${Date.now()}.js`, file);
    console.green(`Seed for ${name} was successfully created!`);
};

module.exports.run = (name) => {
    return console.error('SOON');
    let wait = 1;
    if (!name) return console.red('Name seed is not defined');
    if (name !== 'all') return console.red('Soon run once seed');

    let names = fs.readdirSync('./db/seeders');

    for (let index in names) {
        if (names.hasOwnProperty(index)) {
            if (!names[index].match(/\.js$/)) break;
            let seedfn = require(process.cwd() + '/db/seeders/' + names[index]);
            if (seedfn && seedfn.up && typeof seedfn.up === 'function') {
                wait += 1;
                console.log('Seed start up: ' + names[index] + '...');
                let run_inf = seedfn.up();
                if (run_inf && run_inf.then)
                    run_inf.then(el => {
                        console.log('Seed success up: ' + names[index]);
                        wait -= 1;
                    }).catch((err)=>{
                        console.error('Seed error: '+ names[index],err);
                        wait -= 1;
                    });
                else {
                    console.log('Seed error dont return promise file:' + names[index]);
                    wait -= 1;
                }
            }
        }
    }

    setInterval(()=>{
        console.green(`Seeders up was successfully!`);
        if(wait === 0) return process.exit(0);
    },500);
    setTimeout(()=>{
        console.error('Timeout seed');
        return process.exit(0);
    },1000*60*3); // 2 min time out
    wait -= 1;

};

module.exports.undo = (name) => {
    let wait = 1;
    if (!name) return console.red('You must specify the model for this migration');
    if (name !== 'all') return console.red('Soon run once seed');
    let names = fs.readdirSync('./db/seeders');

    for (let index in names) {
        if (names.hasOwnProperty(index)) {
            if (!names[index].match(/\.js$/)) break;
            let seedfn = require(process.cwd() + '/db/seeders/' + names[index]);
            if (seedfn && seedfn.down && typeof seedfn.down === 'function') {
                wait += 1;
                console.log('Seed start down' + names[index] + '...');
                let run_inf = seedfn.down();
                if (run_inf && run_inf.then)
                    run_inf.then(el => {
                        console.log('Seed success down: ' + names[index]);
                        wait -= 1;
                    }).catch((err)=>{
                        console.red('Seed error: '+ names[index],err);
                        wait -= 1;
                    });
                else {
                    console.red('Seed error dont return promise file:' + names[index]);
                    wait -= 1;
                }
            }
        }
    }


    setInterval(()=>{
        console.green(`Seeders undo was successfully created!`);
        if(wait === 0) return process.exit(0);
    },500);
    setTimeout(()=>{
        console.error('Timeout seed');
        return process.exit(0);
    },1000*60*3); // 2 min time out
    wait -= 1;
};
