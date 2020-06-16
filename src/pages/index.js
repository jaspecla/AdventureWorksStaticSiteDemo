import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = (props) => {
  const specials = props.data.allWeeklySpecial.edges;

  return (
  <Layout>
    <SEO title="Home" />
    <h1>Weekly Specials</h1>
    <p>Here are this week's special sale items:</p>
    {specials.map((special, i) => {
      const specialData = special.node;
      return (
        <div key={i}>
          <hr />
          <p><b>{specialData.name}</b> ({specialData.productNumber})</p>
          <p><b>Normal Price:</b> ${specialData.listPrice}</p>
          <p><b>Sale Price: </b> <b>${specialData.salePrice}</b></p>
        </div>
      )
    })

    }
  </Layout>
  );
}

export default IndexPage

export const query = graphql`
query WeeklySpecialQuery {
  allWeeklySpecial {
    edges {
      node {
        id
        name
        productNumber
        listPrice
        salePrice
      }
    }
  }
}`;