import HttpError from "../helpers/HttpError.js";
import User from "../models/userModel.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const waterRateUpdate = ctrlWrapper(async (req, res, next) => {
  const _id = req.user.id;
  const { waterRate } = req.body;

  // Перевірка на макс/мін води
  if (waterRate < 50 || waterRate > 15000) {
    throw HttpError(400, "Invalid water rate");
  }

  try {
    const updatedUser = await User.findOneAndUpdate({ _id }, { waterRate });

    if (updatedUser === null) {
      throw HttpError(404, "Not found");
    }

    // оновити таблицю записів споживання води враховуючи нову норму! (якщо змінилась?)

    res.status(200).json({ waterRate });
  } catch (error) {
    next(error);
  }
});

export default waterRateUpdate;
