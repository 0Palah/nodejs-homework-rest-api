const path = require("path");
const fs = require("fs").promises;
const User = require("../../models/users");

const avatarsDirPath = path.join(__dirname, "..", "..", "public", "avatars");

async function updateAvatar(req, res) {
  const { _id } = req.user;
  const { path: tempPath, originalname } = req.file;
  const extension = path.extname(originalname);
  const filename = `${_id}${extension}`;

  const targetAvatarPath = path.join(avatarsDirPath, filename);

  await fs.rename(tempPath, targetAvatarPath);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
}

module.exports = updateAvatar;
