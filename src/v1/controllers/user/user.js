import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";
const prisma = new PrismaClient();

const userController = {
  async userDetails(req, res, next) {
    try {
      let user;
      user = await prisma.user.findFirst({
        where: {
          id: req.user.id,
        }
      });
      res.json(customResponse(200, user));
    } catch (err) {
      res.json(customResponse(400, err));
      console.log(err, "err");
    }
  },

};
export default userController;
