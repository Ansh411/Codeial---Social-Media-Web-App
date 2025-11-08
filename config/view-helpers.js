const env = require('./environment');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    app.locals.assetPath = function(filePath){
        if(env.name == 'development'){
            return '/' + filePath;
        }

        const manifestPath = path.join(__dirname, '../public/assets/rev-manifest.json');
        const manifest = JSON.parse(fs.readFileSync(manifestPath));

        if(!manifest[filePath]){
        console.warn(`⚠️ Asset not found in rev-manifest.json: ${filePath}`);
        return '/' + filePath; // fallback
    }
        return '/' + manifest[filePath];
    }
}