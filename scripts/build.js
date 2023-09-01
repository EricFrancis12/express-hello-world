

const fs = require('fs');
const path = require('path');



(async function () {
    function main(targetDirName) {
        let result = [];

        if (targetDirName === 'offers') {
            const affiliateNetworksDirPath = path.resolve(__dirname, '../data/affiliatenetworks');
            const affiliateNetworks = fs.readdirSync(affiliateNetworksDirPath);

            affiliateNetworks.forEach(network => {
                // read each offer inside the current network
                const currentAffiliateNetworkDirPath = `${affiliateNetworksDirPath}/${network}/offers`;
                result = [...result, ...read(currentAffiliateNetworkDirPath)]
            });
        } else {
            const dirPath = path.resolve(__dirname, `../data/${targetDirName}`);
            result = [...read(dirPath)];
        }

        return result;
    }

    function read(dirPath) {
        const jsonFiles = [];

        const stats = fs.statSync(dirPath);
        if (stats.isDirectory()) {
            const dirContents = fs.readdirSync(dirPath);

            dirContents.forEach(item => {
                const targetFile = `${dirPath}/${item}/${item}.json`;
                if (fs.existsSync(targetFile)) {
                    const data = require(targetFile);
                    jsonFiles.push(data);
                }
            });
        }

        return jsonFiles;
    }

    function hello(arr) {
        const Result = [];

        arr.forEach(element => {
            const dataSubDir = main(element);
            Result.push(dataSubDir);
        });

        return Result;
    }

    const [affiliateNetworks, campaigns, landingPages, offers, trafficSources] = hello([
        'affiliateNetworks', 'campaigns', 'landingPages', 'offers', 'trafficSources'
    ]);

    const dataJSPath = path.resolve(__dirname, '../data/data.js');
    const newDataJSCode = `
        // ##########################################################################################
        // NOTE: This file was modified during the build step (npm run build)
        // ##########################################################################################

        const affiliateNetworks = ${JSON.stringify(affiliateNetworks, null, 4)};
        const campaigns = ${JSON.stringify(campaigns, null, 4)};
        const landingPages = ${JSON.stringify(landingPages, null, 4)};
        const offers = ${JSON.stringify(offers, null, 4)};
        const trafficSources = ${JSON.stringify(trafficSources, null, 4)};

        module.exports = {
            affiliateNetworks,
            campaigns,
            landingPages,
            offers,
            trafficSources
        };
    `;

    fs.writeFileSync(dataJSPath, newDataJSCode);
})();
