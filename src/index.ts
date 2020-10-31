import { queryType, makeSchema } from '@nexus/schema';
import { ApolloServer } from 'apollo-server';

const Query = queryType({
  definition(t) {
    t.string('hello', {
      resolve: () => 'hello Nexus',
    });
  },
});

const schema = makeSchema({
  types: [Query],
});

const server = new ApolloServer({
  schema,
});

server.listen().then(({ port }) => {
  console.log(`Server listening on port ${port}`);
});
