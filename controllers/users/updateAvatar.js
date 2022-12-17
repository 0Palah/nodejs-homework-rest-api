const path = require("path");
const fs = require("fs").promises;
const User = require("../../models/users");
const Jimp = require("jimp");

const avatarsDirPath = path.join(__dirname, "..", "..", "public", "avatars");

async function updateAvatar(req, res) {
  const { _id } = req.user;
  const { path: tempPath, originalname } = req.file;
  const extension = path.extname(originalname);
  const filename = `${_id}${extension}`;

  await Jimp.read(tempPath)
    .then((image) => {
      image.cover(250, 250).write(tempPath);
    })
    .catch((err) => {
      console.error(err);
    });

  const targetAvatarPath = path.join(avatarsDirPath, filename);

  await fs.rename(tempPath, targetAvatarPath);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
}

module.exports = updateAvatar;
