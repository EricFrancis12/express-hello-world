

const fs = require('fs');
const path = require('path');



const dirsToMake = [
    '../data',
    '../data/affiliateNetworks',
    '../data/campaigns',
    '../data/landingPages',
    '../data/trafficSources'
];

dirsToMake.forEach(dir => {
    const dirPath = path.resolve(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
});
