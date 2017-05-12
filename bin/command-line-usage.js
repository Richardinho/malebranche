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
                name : 'src' ,
                description : 'path to input file, relative to current folder',
                defaultOption : true,
                typeLabel: '[underline]{file}'
            },
            {
                name : 'width',
                alias : 'w',
                description : 'x coordinates will be relative this value. Normally, should be the width value of the viewBox attribute',
                type: Number,
                typeLabel: '[underline]{pixels}'
            },
            {
                name : 'height',
                alias : 'h',
                description : 'y coordinates will be relative this value. Normally, should be the height value of the viewBox attribute',
                type: Number,
                typeLabel: '[underline]{pixels}'
            },
            {
                name: 'xmin',
                description: 'Offset x coordinates by this value. Normally, should be the xmin value of the viewBox attribute',
                type: Number,
                typeLabel: '[underline]{pixels}'
            },
            {
                name : 'ymin',
                description : 'Offset y coordinates by this value. Normally, should be the ymin value of the viewBox attribute',
                type: Number,
                typeLabel: '[underline]{pixels}'
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

