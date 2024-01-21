const User = require('../models/user')
const {ApiError} = require("../validaty/ApiError");
const error = new ApiError()

//получение пользователя
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch((err) => error.instanceOf(res, err, `Пользователь о указанному id - ${req.params.userId} не найден`));
}
//получение пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch((err) => error.instanceOf(res, err, "Произошло что-то непредвиденное"));
}
//создание пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => error.instanceOf(res, err, "Невозможно создать пользователя - переданы некорректные данные в методы создания пользователя"));
}
//изменение данных пользователя
module.exports.patchUser = (req, res) => {
  const data = req.body;
  const _id = req.user._id

  User.findByIdAndUpdate(
    _id,
    data)
    .then(user => res.send({ data: user }))
    .catch((err) => error.instanceOf(res, err, "Невозможно изменить пользователя - переданы некорректные данные в методы изменения пользователя"));
}
//изменение аватара пользователя
module.exports.patchUserAvatar = (req, res) => {
  const {avatar} = req.body;
  const _id = req.user._id

  User.findByIdAndUpdate(
    _id,
    {avatar: avatar})
    .then(user => res.send({ data: user }))
    .catch((err) => error.instanceOf(res, err, "Невозможно изменить аватар - переданы некорректные данные в метод изменения аватара"));
}