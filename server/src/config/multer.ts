import multer from "multer";
import path from "path";
import crypto from "crypto";

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: (request, file, callback) => {
      const hash = crypto.randomBytes(6).toString("hex");

      const fileName = `${hash}-${file.originalname}`;

      //o 1o parametro(é o erro) é null pk nas duas primeiras linhas é impossivel dar erro
      callback(null, fileName);
    },
  }),
};
