function print(v) {
  console.log(JSON.stringify(v, undefined, 2));
}

// constants
const MUTATION_CREATE = 'CREATED';
const MUTATION_DELETE = 'DELETED';
const MUTATION_UPDATE = 'UPDATED';

// ============================================
// USERS
// ============================================
function _createUser(prisma, data, info) {
  const emailTaken = prisma.exists.User({ email: args.data.email });
  return prisma.mutation.createUser(data);
}

function _deleteUser(prisma, data) {
  print(data);
  return prisma.mutation.deleteUser({
    where: data,
  });
}

function _updateUser(prisma, id, data) {
  return null;
}

// ============================================
// POSTS
// ============================================
function _createPost(prisma, data) {
  return null;
}

function _deletePost(prisma, id) {
  return null;
}

function _updatePost(prisma, id, data) {
  return null;
}
// ============================================
// COMMENTS
// ============================================

function _createComment(prisma, data) {
  const cdata = {
    data: {
      text: data.text,
      post: {
        connect: {
          id: data.post,
        },
      },
      user: {
        connect: {
          id: data.author,
        },
      },
    },
  };
  print(cdata);
  const r = prisma.mutation.createComment(cdata);
  print(r);
  return r;
}

function _deleteComment(prisma, id) {
  return null;
}

function _updateComment(prisma, id, data) {
  return null;
}

const Mutation = {
  // USERS
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
    return _updateUser(prisma, args.id, args.data);
  },
  // POSTS
  createPost(parent, args, { prisma }, info) {
    return _createPost(prisma, args.data);
  },
  deletePost(parent, args, { prisma }, info) {
    return _deletePost(prisma, args.id);
  },
  updatePost(parent, args, { prisma }, info) {
    return _updatePost(prisma, args.id, args.data);
  },
  // COMMENTS
  createComment(parent, args, { prisma }, info) {
    return _createComment(prisma, args.data);
  },
  deleteComment(parent, args, { prisma }, info) {
    return _deleteComment(prisma, args.id);
  },
  updateComment(parent, args, { prisma }, info) {
    return _updateComment(prisma, args.id, args.data);
  },
};

export default Mutation;
