import React from "react"
import { graphql } from "gatsby"
import { Button, Layout, Menu, Breadcrumb, Icon, Card } from "antd"
import { Link } from "gatsby"
import pathList from "../path"

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

class Index extends React.Component {
  state = {
    collapsed: false,
  }

  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  render() {
    console.log(this.props.data)
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type)
          }}
          theme="light"
        >
          <Link to="/blog"></Link>
          <div className="logo" />
          <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
            {this.props.data.allDirectory.edges.map(edge => (
              <SubMenu
                key={edge.id}
                title={
                  <span>
                    <span>{edge.node.relativePath}</span>
                  </span>
                }
              >
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
            ))}

            {pathList.map(item => (
              <SubMenu
                key={item.name}
                title={
                  <span>
                    <span>{item.name}</span>
                  </span>
                }
              >
                {item.children.map(child => (
                  <Menu.Item key={child.name}>
                    <span>
                      <Link to={child.path}>{child.name}</Link>
                    </span>
                  </Menu.Item>
                ))}
              </SubMenu>
            ))}
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <Card
                title={
                  this.props.data.allMarkdownRemark.edges[1].node.frontmatter
                    .title
                }
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.props.data.allMarkdownRemark.edges[1].node
                      .html,
                  }}
                ></div>
              </Card>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Index

export const query = graphql`
  query {
    allDirectory(
      filter: { relativePath: { regex: "/^((?!/).)*$/", ne: "" } }
      sort: { order: DESC, fields: id }
    ) {
      edges {
        node {
          relativePath
          id
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter {
            tags
            title
          }
        }
      }
    }
    site {
      siteMetadata {
        description
        author
        title
      }
    }
  }
`
