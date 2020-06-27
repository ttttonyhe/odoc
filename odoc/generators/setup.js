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
          title: 'one moment...',
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
          title: 'one moment...',
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
          title: 'one moment...',
          task: () => execa('node', ['search.js'])
        },
      ])
    },
  }
]).run();