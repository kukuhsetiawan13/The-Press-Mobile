import { gql } from "@apollo/client"

export const GET_ALL_NEWS = gql `
query ExampleQuery {
    getAllNews {
      id
      imgUrl
      title
      Category {
        name
      }
      User {
        username
      }
    }
  }
`

export const GET_NEWS_BY_ID = gql `
query ExampleQuery($newsId: Int) {
    getNewsById(newsId: $newsId) {
      title
        imgUrl
        Category {
          name
        }
        content
        User {
          username
        }
        PostTags {
          Tag {
            name
          }
        }
    }
  }
`