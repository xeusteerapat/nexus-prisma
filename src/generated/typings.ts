/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenRootTypes {
  Category: { // root type
    id?: string | null; // ID
    name?: string | null; // String
  }
  Mutation: {};
  Product: { // root type
    description?: string | null; // String
    id?: string | null; // ID
    name?: string | null; // String
    price?: number | null; // Int
    sku?: string | null; // String
  }
  Query: {};
  Review: { // root type
    body?: string | null; // String
    id?: string | null; // ID
    title?: string | null; // String
  }
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
}

export interface NexusGenFieldTypes {
  Category: { // field return type
    id: string | null; // ID
    name: string | null; // String
    products: Array<NexusGenRootTypes['Product'] | null> | null; // [Product]
  }
  Mutation: { // field return type
    categorizeProduct: NexusGenRootTypes['Product'] | null; // Product
    createCategory: NexusGenRootTypes['Category'] | null; // Category
    createProduct: NexusGenRootTypes['Product'] | null; // Product
    createReview: NexusGenRootTypes['Review'] | null; // Review
  }
  Product: { // field return type
    categories: Array<NexusGenRootTypes['Category'] | null> | null; // [Category]
    description: string | null; // String
    id: string | null; // ID
    name: string | null; // String
    price: number | null; // Int
    reviews: Array<NexusGenRootTypes['Review'] | null> | null; // [Review]
    sku: string | null; // String
  }
  Query: { // field return type
    categories: Array<NexusGenRootTypes['Category'] | null> | null; // [Category]
    products: Array<NexusGenRootTypes['Product'] | null> | null; // [Product]
  }
  Review: { // field return type
    body: string | null; // String
    id: string | null; // ID
    title: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Category: { // field return type name
    id: 'ID'
    name: 'String'
    products: 'Product'
  }
  Mutation: { // field return type name
    categorizeProduct: 'Product'
    createCategory: 'Category'
    createProduct: 'Product'
    createReview: 'Review'
  }
  Product: { // field return type name
    categories: 'Category'
    description: 'String'
    id: 'ID'
    name: 'String'
    price: 'Int'
    reviews: 'Review'
    sku: 'String'
  }
  Query: { // field return type name
    categories: 'Category'
    products: 'Product'
  }
  Review: { // field return type name
    body: 'String'
    id: 'ID'
    title: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    categorizeProduct: { // args
      categoryId?: string | null; // String
      productId?: string | null; // String
    }
    createCategory: { // args
      name?: string | null; // String
    }
    createProduct: { // args
      description?: string | null; // String
      name?: string | null; // String
      price?: number | null; // Int
      sku?: string | null; // String
    }
    createReview: { // args
      body?: string | null; // String
      productId?: string | null; // String
      title?: string | null; // String
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Category" | "Mutation" | "Product" | "Query" | "Review";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}