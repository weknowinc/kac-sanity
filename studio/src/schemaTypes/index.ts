import blockContent from './objects/blockContent'
import category from './documents/category'
import post from './documents/post'
import tag from './documents/tag'
import thought from './documents/thought'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [post, category, tag, thought, blockContent]
