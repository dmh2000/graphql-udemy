function print(v) {
  console.log(JSON.stringify(v, undefined, 2));
}

// constants
const MUTATION_CREATE = 'CREATED';
const MUTATION_DELETE = 'DELETED';
const MUTATION_UPDATE = 'UPDATED';

const Mutation = {
  // ======================
  // USERS
  // ======================
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email });
    if (emailTaken) {
      throw new Error('Email Taken');
    }

    return prisma.mutation.createUser({ data: args.data }, info);
  },

  async deleteUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ id: args.id });
    if (!emailTaken) {
      throw new Error('No User With That ID');
    }

    print(args);
    return prisma.mutation.deleteUser(
      {
        where: args,
      },
      info
    );
  },

  updateUser(parent, args, { prisma }, info) {
    return prisma.mutation.updateUser(
      {
        data: args.data,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  // ======================
  // POSTS
  // ======================
  createPost(parent, args, { prisma }, info) {
    const cdata = {
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: args.data.author,
          },
        },
      },
    };
    return prisma.mutation.createPost(cdata, info);
  },
  deletePost(parent, args, { prisma }, info) {
    return prisma.mutation.deletePost(
      {
        where: args,
      },
      info
    );
  },
  updatePost(parent, args, { prisma }, info) {
    return prisma.mutation.updatePost(
      {
        data: args.data,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  // ======================
  // COMMENTS
  // ======================
  createComment(parent, args, { prisma }, info) {
    const cdata = {
      data: {
        text: args.data.text,
        post: {
          connect: {
            id: args.data.post,
          },
        },
        user: {
          connect: {
            id: args.data.author,
          },
        },
      },
    };
    return prisma.mutation.createComment(cdata, info);
  },
  deleteComment(parent, args, { prisma }, info) {
    return prisma.mutation.deleteComment(
      {
        where: args,
      },
      info
    );
  },
  updateComment(parent, args, { prisma }, info) {
    return prisma.mutation.updateComment(
      {
        data: args.data,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

export default Mutation;
