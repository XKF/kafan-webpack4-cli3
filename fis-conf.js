const conf = require('./h5.conf').fis

fis.match('**', {
  release: false
})


fis.match('/dist/(**)', {
  release: '$1',
  useCompile: false
})

fis.match('/dist/(**).js.map', {
   release: false
})


// 测试
fis.media('test')
  .match('**', {
    deploy: conf.testing.map(v => {
      return fis.plugin('http-push', {
        receiver: v.receiver,
        to: v.path,
      })
    })
  })

// 灰度
fis.media('gray')
  .match('**', {
    deploy: conf.gray.map(v => {
        return fis.plugin('http-push', {
          receiver: v.receiver,
          to: v.path,
        })
    })
  })

// 正服
fis.media('jenkins')
  .match('**', {
    deploy: conf.jenkins.map(v => {
      return fis.plugin('http-push', {
        receiver: v.receiver,
        to: v.path
      })
    })
});

    