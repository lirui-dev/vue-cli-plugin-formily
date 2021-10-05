const inquirer = require('inquirer');

module.exports = pkg => {
  const prompts = [
    {
      type: 'checkbox',
      message: 'choice UI Component:',
      name: 'installUIComponent',
      choices: [
        new inquirer.Separator(' = Desktop = '),
        {
          name: 'Element',
        },
        // new inquirer.Separator(' = Mobile = '),
        // {
        //   name: 'Vant',
        // },
      ]
    }
  ]

  return prompts
}