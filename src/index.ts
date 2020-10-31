import { queryType, mutationType, objectType, makeSchema } from '@nexus/schema';
import { ApolloServer } from 'apollo-server';

// Products
const Product = objectType({
  name: 'Product',
  definition(t) {
    t.id('id');
    t.string('name');
  },
});

// Reviews (one-to-many)

// Categories (many-to-many)

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
  types: [Query, Product],
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
