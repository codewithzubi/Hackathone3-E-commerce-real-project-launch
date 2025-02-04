import { type SchemaTypeDefinition } from 'sanity'
import { productSchema } from "./products";
import orderSchema  from "./order";
import categories from "./categories"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema,categories,orderSchema],
}
