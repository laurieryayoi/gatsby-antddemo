const path = require('path')
const {
    createFilePath
} = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({
    node,
    getNode,
    actions
}) => {
    const {
        createNodeField
    } = actions

    console.log(node)
    // 在 GraphQL 数据中创建的节点类型是 MarkdownRemark
    if (node.internal.type === `MarkdownRemark`) {
        // 根据文件名创建 slug
        let slug = createFilePath({
            node,
            getNode,
            basePath: `posts`
        })
        // 通过 createNodefield 在当前字段的 fields 下创建一个数据字段
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

// 创建页面，这个名称是固定的
exports.createPages = async ({
    graphql,
    actions
}) => {
    // 获取到 createPage 方法
    const {
        createPage
    } = actions
    // 查询所有 md 文件数据
    const result = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
                          frontmatter {
                              path
                          }
            }
          }
        }
      }
    `)
    // 逐个创建相应的页面
    result.data.allMarkdownRemark.edges.forEach(({
        node
    }) => {
        let path = node.frontmatter.path || node.fields.slug; // 可以使用自定义路径
        createPage({
            path,
            // 创建页面需要模板组件
            component: path.resolve(`./src/templates/post.js`),
            context: {
                // 传递给模板组件中在查询时, 接收的变量值
                path
            },
        })
    })
}