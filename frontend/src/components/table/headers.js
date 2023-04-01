const SPACE = '\u00a0'
const LF = '\u000A'

export const transportHeaders = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'type', label: 'Type', minWidth: 100 },
    {
        id: 'xcoord',
        label: 'Latitude',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'ycoord',
        label: 'Longitude',
        minWidth: 170,
        align: 'right',
    },
];

export const educationHeaders = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'type', label: 'Type', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 170 },
    {
        id: 'xcoord',
        label: 'Latitude',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'ycoord',
        label: 'Longitude',
        minWidth: 170,
        align: 'right',
    },
];


export const sportsHeaders = [
    { id: 'address', label: 'Address', minWidth: 170 },
    { id: 'type', label: 'Type', minWidth: 100 },
    {
        id: 'xcoord',
        label: 'Latitude',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'ycoord',
        label: 'Longitude',
        minWidth: 170,
        align: 'right',
    },
    { id: 'description', label: 'Description', minWidth: 170 },
];