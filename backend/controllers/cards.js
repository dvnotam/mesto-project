const CardSchema = require('../models/cards');
const { ErrorHandler, errType } = require('../error/ErrorHandler');

module.exports.getCard = async (req, res, next) => {
  try {
    const cards = await CardSchema.find({});
    return res.json({ cards });
  } catch (err) {
    return next(new ErrorHandler(errType.card, 400));
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  try {
    const card = await CardSchema.create({ name, link, owner: ownerId });
    return res.json({ card });
  } catch (err) {
    switch (err.name) {
      case 'ValidationError':
        return next(new ErrorHandler(errType.card, 400));
      default:
        return next(new ErrorHandler(errType.card, 500));
    }
  }
};

module.exports.deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const card = await CardSchema.findById(cardId).populate('owner');
    if (!card) {
      return next(new ErrorHandler(errType.card, 404));
    }

    if (card.owner._id.toString() !== userId) {
      return next(new ErrorHandler(errType.card, 403));
    }

    const cardDelete = await CardSchema.findByIdAndRemove(cardId)
    return res.json({ cardDelete });
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        return next(new ErrorHandler(errType.card, 400));
      case 'Error':
        return next(new ErrorHandler(errType.card, 404));
      default:
        return next(new ErrorHandler(errType.card, 500));
    }
  }
};

module.exports.getLike = async (req, res, next) => {
  const { cardId } = req.params;

  try {
    const likes = await CardSchema.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .orFail(new Error('Error'));
    return res.json({ likes });
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        return next(new ErrorHandler(errType.card, 400));
      case 'Error':
        return next(new ErrorHandler(errType.card, 404));
      default:
        return next(new ErrorHandler(errType.card, 500));
    }
  }
};

module.exports.deleteLike = async (req, res, next) => {
  const { cardId } = req.params;

  try {
    const likes = await CardSchema.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .orFail(new Error('Error'));
    return res.json({ likes });
  } catch (err) {
    switch (err.name) {
      case 'CastError':
        return next(new ErrorHandler(errType.card, 400));
      case 'Error':
        return next(new ErrorHandler(errType.card, 404));
      default:
        return next(new ErrorHandler(errType.card, 500));
    }
  }
};
