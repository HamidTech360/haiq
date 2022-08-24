const express = require('express');
const path = require('path');
var fs = require('fs');

const META_OG_TITLE="__META_OG_TITLE__";
const META_OG_DESCRIPTION="__META_OG_DESCRIPTION__";
const META_DESCRIPTION="__META_DESCRIPTION__";
const META_OG_IMAGE="__META_OG_IMAGE__";

const ALL_TAGS_HTML='<meta name="description" content="__META_DESCRIPTION__"/>\
<meta name="og:title" content="__META_OG_TITLE__"/>\
<meta name="og:description" content="__META_OG_DESCRIPTION__"/>\
<meta name="og:image" content="__META_OG_IMAGE__"/>';

function processIndexHtml(htmlData){
    let idx=htmlData.indexOf(META_OG_TITLE);
    console.log("index of "+META_OG_TITLE+": "+idx);
    if (idx==-1){
        //it means index.html don't have the placeholders inserted
        //let's insert the placeholder tags now
        let headTag="<head>";
        idx=htmlData.indexOf(headTag);
        idx+=headTag.length;
        let firstPart=htmlData.substring(0,idx);
        let secondPart=htmlData.substring(idx);
        firstPart+=ALL_TAGS_HTML;
        htmlData=firstPart+secondPart;
        //console.log(htmlData);
    }
    return htmlData;
}

function getHaikuData(haikuId){
    console.log("getHaikuData: "+haikuId);
    return {
        title: "This is dummy haiku title for "+haikuId,
        description: "This is dummy haiku description "+haikuId,
        image: "https://www.gstatic.com/webp/gallery/1.jpg",
    };
}

const app = express();
const PORT = process.env.PORT || 3000;
const indexPath  = path.resolve(__dirname, '..', 'build', 'index.html');
  
app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));

app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log("listening on " + PORT + "...");
});
app.get('/*', (req, res, next) => {
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        console.log("params: ");
        console.log(req.params);
        if (req.params['0'] && req.params['0'].indexOf("haiku/")==0){
            htmlData=processIndexHtml(htmlData);

            let haikuPart=req.params['0'];
            let vals=haikuPart.split('/');
            if (vals.length>1){
                let haikuId=vals[1];
                console.log("haikuId: "+haikuId);
    
                let haikuData=getHaikuData(haikuId);
                let dynamicTitle=haikuData.title;
                let dynamicDescription=haikuData.description;
                let dynamicImage=haikuData.image;
        
                htmlData = htmlData.replace(
                    "<title>React App</title>",
                    `<title>${dynamicTitle}</title>`
                )
                .replace(META_OG_TITLE,dynamicTitle)
                .replace(META_OG_DESCRIPTION,dynamicDescription)
                .replace(META_DESCRIPTION,dynamicDescription)
                .replace(META_OG_IMAGE,dynamicImage)
            }
        }
        return res.send(htmlData);
    });
});