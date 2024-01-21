const User = require('../models/user');
const { ApiError } = require('../validaty/ApiError');

const error = new ApiError();

// получение пользователя
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if(!user) throw new error.instanceOf(res, {name: 'TypeError'})
      res.send({data: user})
    })
    .catch((err) => error.instanceOf(res, err));
};
// получение пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => error.instanceOf(res, err));
};
// создание пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => error.instanceOf(res, err));
};
// изменение данных пользователя
module.exports.patchUser = (req, res) => {
  const data = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    data,
    {
      runValidators: true,
      new: true
    }
  )
    .then((user) => {
      if(!user) throw new error.instanceOf(res, {name: 'ValidationError'})
      res.send({data: user})
    })
    .catch((err) => error.instanceOf(res, err));
};
// изменение аватара пользователя
module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => error.instanceOf(res, err));
};
