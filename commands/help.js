module.exports = function help(command) {

  switch(command) {

    case 'setUri':
      console.log(`
${'setUri command'.blue.underline}
${'"mongoose-cli setUri <mongo uri>"'.green}

Example:
${'"mongoose-cli setUri \'mongodb://user:pass@localhost:27017/db_name\'"'.green}

Sets the connection string to enable mongoose-cli to connect to MongoDB. If you need to dynamically determine \
the URI ${'(like depending on the ENV)'.gray}, then you should directly edit the ${'db/connection-config.js'.yellow} file instead.
      `); break;

    case 'seed':
      console.log(`
${'seed command'.blue.underline}

${'"mongoose-cli seed run <modelName> or all"'.green}
${'"mongoose-cli seed undo <modelName> or all"'.green}
${'"mongoose-cli seed create <modelName>"'.green}
      `); break;


    case 'generate':
    case 'g':
    case 'create':
      console.log(`
${'generate command'.blue.underline}
${'"mongoose-cli generate model <modelName>"'.green}
${'"mongoose-cli generate migration <modelName>"'.green}

Aliases:
${'g, create'.cyan}

Create new model:
${'"mongoose-cli generate model user"'.green}

Create new migration:
${'"mongoose-cli generate migration user"'.green}
      `); break;

    case 'shell':
      console.log(`
${'shell command'.blue.underline}

Native MongoDB shell. Use the native mongo query language.
${'db.users.find({})'.green}
      `); break;

    case 'mshell':
      console.log(`
${'mshell command'.blue.underline}

A JavaScript REPL with all the models required. Use the mongoose-cli methods. Remember to handle asynchronicity.
${'User.find({}, console.log)'.green} ${'// logs all the user objects'.grey}
      `); break;

    default: 
      console.log(`\

${'Welcome to node-mongoose-cli!'.yellow}

${'Commands'.blue.underline}
${'help:'.cyan}  Provides details for a command
${'init:'.cyan}  Generates directory structure
${'setUri:'.cyan}  Sets the connection string for connecting to MongoDB
${'seed:'.cyan}  Creates seed or Run, revert seed
${'generate:'.cyan}  Creates a model or migration file
${'shell:'.cyan}  Opens a native MongoDB shell
${'mshell:'.cyan}  Opens a Node.js shell using mongoose-cli methods

For more info try ${'"mongoose-cli help generate"'.green}
      `);
  }
};
