<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

html,body,#app{
  height: 100%;
}

#app {
  font-family: '微软雅黑', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #fff;
  color: #333;
  transform: translate3d(0,0,0);
}

body {
  max-width: 768PX;
  margin:0 auto !important;
}

@media (orientation : landscape) and (max-height:400px){ 
  html{
    font-size:30PX!important
  }/*横屏时字体红色*/
} 

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}


ul {
  list-style: none;
}
a { text-decoration: none;color:#000; }

.clearfix::after {
  content:'';
  display:block;
  clear:both;
}

.fl { float:left }
.fr { float:right }

// 省略
@for $i from 2 through 5
{
  .t-hidden-#{$i} {
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:#{$i}; 
  }
}

</style>
