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
const Category = objectType({
  name: 'Category',
  definition(t) {
    t.id('id');
    t.string('name');
    t.list.field('products', {
      type: 'Product',
      resolve: parent => {
        return prisma.product.findMany({
          where: {
            categories: {
              some: {
                id: parent.id,
              },
            },
          },
        });
      },
    });
    t.list.field('categories', {
      type: 'Category',
      resolve: parent => {
        return prisma.category.findMany({
          where: {
            products: {
              every: {
                id: parent.id,
              },
            },
          },
        });
      },
    });
  },
});

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
    t.field('createCategory', {
      type: 'Category',
      args: {
        name: stringArg(),
      },
      resolve: (_, { name }) => {
        return prisma.category.create({
          data: {
            name,
          },
        });
      },
    });
    t.field('categorizeProduct', {
      type: 'Product',
      args: {
        productId: stringArg(),
        categoryId: stringArg(),
      },
      resolve: (_, { productId, categoryId }) => {
        return prisma.product.update({
          where: {
            id: productId,
          },
          data: {
            categories: {
              connect: {
                id: categoryId,
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
  types: [Query, Mutation, Product, Review, Category],
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
