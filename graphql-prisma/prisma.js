import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
});

export { prisma as default };

// // query, mutation, subscription, exists
// function print(obj) {
//   console.log(JSON.stringify(obj, undefined, 2));
// }

// function users() {
//   prisma.query
//     .users(null, '{id,name,email,posts {id,title}}')
//     .then(data => {
//       console.log(JSON.stringify(data, undefined, 2));
//     })
//     .catch(errors => {
//       console.log(JSON.stringify(errors, undefined, 2));
//     });
// }

// function posts() {
//   prisma.query
//     .posts(
//       null,
//       '{id,title,body,published,author{name},comments{text,user{name}}}'
//     )
//     .then(data => {
//       console.log(JSON.stringify(data, undefined, 2));
//     })
//     .catch(errors => {
//       console.log(JSON.stringify(errors, undefined, 2));
//     });
// }

// function comments() {
//   prisma.query
//     .comments(null, '{id,text,user{name},post{title}}')
//     .then(data => {
//       console.log(JSON.stringify(data, undefined, 2));
//     })
//     .catch(errors => {
//       console.log(JSON.stringify(errors, undefined, 2));
//     });
// }

// function createPost(title, body, authorId) {
//   prisma.mutation
//     .createPost(
//       {
//         data: {
//           title: title,
//           body: body,
//           published: true,
//           author: {
//             connect: {
//               id: authorId,
//             },
//           },
//         },
//       },
//       '{title,body,published,author{id}}'
//     )
//     .then(post => {
//       console.log(JSON.stringify(post, undefined, 2));
//       return prisma.query.user(
//         {
//           where: {
//             id: post.author.id,
//           },
//         },
//         '{id,name,email}'
//       );
//     })
//     .then(user => {
//       console.log(JSON.stringify(user, undefined, 2));
//     })
//     .catch(error => {
//       console.log(JSON.stringify(error, undefined, 2));
//     });
// }

// function deletePost(id) {
//   prisma.mutation
//     .deletePost(
//       {
//         where: {
//           id: id,
//         },
//       },
//       '{id}'
//     )
//     .then(post => {
//       console.log(JSON.stringify(post, undefined, 2));
//     })
//     .catch(error => {
//       console.log(JSON.stringify(error, undefined, 2));
//     });
// }

// function deleteComment(id) {
//   prisma.mutation.deleteComment(
//     {
//       where: {
//         id: id,
//       },
//     },
//     '{id}'
//   );
// }

// function updatePost(id, published) {
//   prisma.mutation
//     .updatePost({
//       where: {
//         id: id,
//       },
//       data: {
//         published: published,
//       },
//     })
//     .then(post => {
//       console.log(JSON.stringify(post, undefined, 2));
//       prisma.query.posts(null, '{id,title,body,published}').then(posts => {
//         print(posts);
//       });
//     })
//     .catch(error => {
//       console.log(JSON.stringify(error, undefined, 2));
//     });
// }

// // create a post
// // fetch user information
// //
// async function createPostForUser(title, body, authorId) {
//   try {
//     const userExists = await prisma.exists.User({
//       id: authorId,
//     });

//     if (!userExists) {
//       console.log('no such user');
//       return;
//     }

//     const post = await prisma.mutation.createPost(
//       {
//         data: {
//           title: title,
//           body: body,
//           published: true,
//           author: {
//             connect: {
//               id: authorId,
//             },
//           },
//         },
//       },
//       '{title,body,published,author{id}}'
//     );
//     print(post);
//     const user = await prisma.query.user(
//       {
//         where: {
//           id: post.author.id,
//         },
//       },
//       '{id,name,email}'
//     );

//     print(user);
//   } catch (error) {
//     print(error);
//   }
// }

// async function updatePostForUser(id, data) {
//   try {
//     const userExists = await prisma.exists.User({
//       id: authorId,
//     });

//     if (!userExists) {
//       console.log('no such user');
//       return;
//     }

//     const post = await prisma.mutation.updatePost(
//       {
//         where: {
//           id: id,
//         },
//         data: {
//           ...data,
//         },
//       },
//       '{title,body,published,author{id}}'
//     );
//     print(post);
//     const user = await prisma.query.user(
//       {
//         where: {
//           id: post.author.id,
//         },
//       },
//       '{id,name,email}'
//     );
//     print(user);
//   } catch (error) {
//     print(error);
//   }
// }

// createPost(
//   '99 yet another post',
//   '99 yet 12345 this is another of my posts',
//   'cjzk1h17b01yd0779en38hkbp'
// );

//comments();

// deleteComment('cjzk2824602g20779cdjlrs57');
// deletePost('cjzk1w4po02870779cf47cfqs');
// deletePost('cjzk2xdv402ws07791igyk9ot');
// deletePost('cjzk38qrg034a0779leffcve8');
// deletePost('cjzk3acvs035h07791qjqy5yh');
// deletePost('cjzk3derm037k0779nnuh07ce');
// posts();
// updatePost('cjzk3wk1303l20779itizke89', false);

// createPostForUser('100 title', '100 body', 'cjzk1h17b01yd0779en38hkbp');
// updatePostForUser('cjzk3wk1303l20779itizke89', { body: 'new body' });

// createPostForUser('102 title', '102 body', 'cjzk1h17b01yd0779en38hkbp');
