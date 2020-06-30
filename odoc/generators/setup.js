const execa = require('execa');
const Listr = require('listr');

new Listr([{
    title: 'ODoc menu generation',
    task: () => {
      return new Listr([{
          title: 'Generating',
          task: () => execa('tsc', ['menu.ts'])
        },
        {
          title: 'please wait...',
          task: () => execa('node', ['menu.js'])
        },
      ])
    },
  },
  {
    title: 'ODoc sidebar generation',
    task: () => {
      return new Listr([{
          title: 'Generating',
          task: () => execa('tsc', ['sidebar.ts'])
        },
        {
          title: 'please wait...',
          task: () => execa('node', ['sidebar.js'])
        },
      ])
    },
  },
  {
    title: 'ODoc search index generation',
    task: () => {
      return new Listr([{
          title: 'Generating',
          task: () => execa('tsc', ['search.ts'])
        },
        {
          title: 'please wait...',
          task: () => execa('node', ['search.js'])
        },
      ])
    },
  }
]).run();