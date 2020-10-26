# Tutorial
deploying to github pages 

## Step by steps

``` bash
# Create a branch if doesn't exist like the source code
git checkout gh-pages

#create a file vue.config.js if doesn't exist like the source code with contains
module.exports = {
  runtimeCompiler: true,
  publicPath: '/Vue-MQTT-NodeMCU/'
};

# build the program until showed the folder dist or updated if exist
npm run build

#add and commit folder dist only to branch gh-pages
git add dist && git commit -m "deploy dist subtree commit"

#push the commit to github 
git subtree push --prefix dist origin gh-pages

#set your github setting to activate the github pages and change to gh-pages branch
[reference](https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd)
```


