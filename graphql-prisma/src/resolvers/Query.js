import uuidv1 from 'uuid/v1';
function print(obj) {
  console.log(JSON.stringify(obj, undefined, 2));
}

const Query = {
  post(parent, args, { prisma }, info) {
    console.log('Query: Post', parent);
    return prisma.query.post(null, info);
  },

  posts(parent, args, { prisma }, info) {
    console.log('Query: Posts');
    const op = {};

    if (args.query) {
      op.where = {
        OR: [{ title_contains: args.query }, { body_contains: args.query }],
      };
    }

    print(info);

    return prisma.query.posts(op, info);
  },

  users(parent, args, { prisma }, info) {
    console.log('Query:Users');
    const op = {};

    if (args.query) {
      op.where = {
        OR: [{ name_contains: args.query }, { email_contains: args.query }],
      };
    }

    return prisma.query.users(
      op,
      // null (scalar only), string (hardcode), info object (from client)
      info
    );
  },

  comments(parent, args, { prisma }, info) {
    console.log('Query:comments');
    print(info);
    return prisma.query.comments(null, info);
  },
};

export default Query;
