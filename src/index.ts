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
    t.list.field('reviews', {
      type: 'Review',
      resolve: parent => {
        return prisma.review.findMany({
          where: {
            productId: parent.id,
          },
        });
      },
    });
  },
});

// Reviews (one-to-many)
const Review = objectType({
  name: 'Review',
  definition(t) {
    t.id('id');
    t.string('title');
    t.string('body');
  },
});

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
    t.field('createReview', {
      type: 'Review',
      args: {
        title: stringArg(),
        body: stringArg(),
        productId: stringArg(),
      },
      resolve: (_, { title, body, productId }) => {
        return prisma.review.create({
          data: {
            title,
            body,
            product: {
              connect: {
                id: productId,
              },
            },
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
        return prisma.product.findMany();
      },
    });
  },
});

const schema = makeSchema({
  types: [Query, Mutation, Product, Review],
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
