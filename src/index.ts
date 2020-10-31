import {
  queryType,
  mutationType,
  objectType,
  makeSchema,
  stringArg,
  intArg,
} from '@nexus/schema';
import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Products
const Product = objectType({
  name: 'Product',
  definition(t) {
    t.id('id');
    t.string('name');
    t.string('description');
    t.int('price');
    t.string('sku');
  },
});

// Reviews (one-to-many)

// Categories (many-to-many)

const Mutation = mutationType({
  definition(t) {
    t.field('createProduct', {
      type: 'Product',
      args: {
        name: stringArg(),
        description: stringArg(),
        price: intArg(),
        sku: stringArg(),
      },
      resolve: (_, { name, description, price, sku }) => {
        return prisma.product.create({
          data: {
            name,
            description,
            price,
            sku,
          },
        });
      },
    });
  },
});

const Query = queryType({
  definition(t) {
    t.list.field('products', {
      type: 'Product',
      resolve: () => {
        return [
          {
            id: '1',
            name: 'Camera',
          },
          {
            id: '2',
            name: 'Mobile Phone',
          },
          {
            id: '3',
            name: 'Tablet',
          },
        ];
      },
    });
  },
});

const schema = makeSchema({
  types: [Query, Mutation, Product],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/typings.ts',
  },
});

const server = new ApolloServer({
  schema,
});

server.listen().then(({ port }) => {
  console.log(`Server listening on port ${port} 🚀`);
});
