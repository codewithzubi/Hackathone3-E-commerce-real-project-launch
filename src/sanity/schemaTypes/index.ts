import { type SchemaTypeDefinition } from 'sanity'
import product from './products'
import categories from './categories'
import order from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,categories,order],
}
