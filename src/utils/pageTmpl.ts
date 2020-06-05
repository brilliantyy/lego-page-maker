const tmpl = `
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>{{pageData.pageConfig.title}}</title>
    <link rel="stylesheet" href="http://localhost:3000/stylesheets/common.css">
    <link rel="stylesheet" href="http://localhost:3000/stylesheets/swiper.min.css">
    <link rel="stylesheet" href="http://localhost:3000/javascripts/bundle.css">
    <script src="http://localhost:3000/javascripts/flexible.min.js"></script>
  </head>
  <body>
    <div id="lego-app"></div>
    <script>
      // page data
      window.__PAGE_DATA__ = {{pageData}}
      // 渲染模板
    </script>
    <script src="http://localhost:3000/javascripts/vue.min.js"></script>
    <script src="http://localhost:3000/javascripts/swiper.min.js"></script>
    <script src="http://localhost:3000/javascripts/lego-engine.js"></script>
  </body>
</html>
`

export default tmpl
