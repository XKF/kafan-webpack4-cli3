const glob = require("glob")

try {
    entries = glob('src/pages/**/index.js', {sync: true})
} catch (err) {
    entries = []
    console.log('读取目录出错！')
    throw err
}


let pages = {}


let templateTDK = {
    //匹配页面键入TDK
    // 'service/index':{
    //     title:'客服与帮助',
    //     description:'',
    //     keywords:''
    // },
}

entries.forEach(page=>{
    let name = page.match(/src\/pages\/([\s\S]*)\/index\.js/g).toString().replace(/src\/pages\/([\s\S]*)\/index\.js/g, '$1');
    pages[name] = {
        entry: 'src/pages/'+name+'/index.js',
        filename: name + '.html',
        title:templateTDK.hasOwnProperty(name) ? templateTDK[name].title : '',
        meta:{
          description:templateTDK.hasOwnProperty(name) ? templateTDK[name].description : '',
          keywords:templateTDK.hasOwnProperty(name) ? templateTDK[name].keywords : '',
        },
        template:name == 'index' ? 'src/pages/index/index.html' : 'public/index.html',
        chunks: ['chunk-vendors', 'chunk-common', 'manifest', name]
    }

})

module.exports = pages