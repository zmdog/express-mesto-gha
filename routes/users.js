const routerUser = require('express').Router();
const {
  createUser, getUserById, getUsers, patchUser, patchUserAvatar,
} = require('../controllers/users');

routerUser.get('/users', getUsers);
routerUser.post('/users', createUser);
routerUser.get('/users/:userId', getUserById);
routerUser.patch('/users/me', patchUser);
routerUser.patch('/users/me/avatar', patchUserAvatar);

module.exports = routerUser;
