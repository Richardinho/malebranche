const getUsage = require('command-line-usage')

const sections = [
  {
    header: 'Malebranche',
    content: 'Converts absolute coords in an SVG clipPath element into relative ones that are compatible with clipPathUnits="objectBoundingBox"'
  },
  {
    header: 'Options',
    optionList: [
      {
        name : 'name' ,
        alias : 'n',
        description : 'name of output file',
        typeLabel: '[underline]{file-name}'
      },
      {
        name: 'decPlaces',
        alias: 'd',
        description: 'number of decimal places in coordinates',
        type: Number,
      },
      {
        name : 'src' ,
        description : 'path to input file, relative to current folder',
        defaultOption : true,
        typeLabel: '[underline]{file}'
      },
      {
        name: 'help',
        description: 'Print this usage guide.'
      }
    ]
  },
  {
    content: 'Project home: [underline]{https://github.com/Richardinho/malebranche}'
  }
]
module.exports = getUsage(sections)

