/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'OI Wiki',
    description: 'Guide for OI',
    author: 'OI Wiki Team',
  },
  plugins: [{
    resolve: `gatsby-transformer-remark`,
    options: {
      "excerpt_separator": `<!-- more -->` // 设置摘要分隔符
    }
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/src/_posts`, // 文件路径
      name: 'posts' // 名称，可以用来过滤
    }
  }],
}