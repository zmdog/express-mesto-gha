const Card = require('../models/card')
const {ApiError} = require("../validaty/ApiError");
const error = new ApiError()

// Удалить карточку
module.exports.deleteCardById = (req, res) => {
  Card.findOneAndDelete({_id: req.params.cardId})
    .then(card => res.send({ data: card }))
    .catch((err) => error.instanceOf(res, err, "Запрашиваемая карточка не найдена"));
}
// Создать карточку
module.exports.createCard = (req, res) => {
  const owner = req.user._id
  const { name, link, likes, createdAt } = req.body;

  Card.create({ name, link, owner, likes, createdAt })
    .then(card => res.send({ data: card }))
    .catch((err) => error.instanceOf(res, err, "Невозможно создать карточку - переданы некорректные данные в методы создания карточки"));
};
// Получить список карточек
module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch((err) => error.instanceOf(res, err, "Произошло что-то непредвиденное"));
}
// Лайки карточки
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,{$addToSet: {likes: req.user._id}}, {new: true})
    .then(card => res.send({ data: card }))
    .catch((err) => error.instanceOf(res, err, "Невозможно поставить лайк - Запрашиваемая карточка не найдена"));
}
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,{$pull: {likes: req.user._id}}, {new: true})
    .then(card => res.send({ data: card }))
    .catch((err) => error.instanceOf(res, err, "Невозможно снять лайк - запрашиваемая карточка не найдена"));
}