import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";
import { generateName, generateCode } from "../../helpers/helper";
import { STATUS } from "../../config/constants";

const prisma = new PrismaClient();

const getGadgetById = async (gadgetId, userId) => {
  const gadget = await prisma.gadget.findFirst({ where: { id: gadgetId } });
  if (!gadget) {
    throw new Error("Gadget not found");
  }
  if (gadget.createdBy !== userId) {
    throw new Error("Unauthorized to access this gadget");
  }
  return gadget;
};

const updateGadgetFields = (status, name) => {
  const updateData = {};
  if (status) updateData.status = status;
  if (name) updateData.name = name;
  return updateData;
};

const gadgetController = {
  async createGadget(req, res, next) {
    try {
      const randomName = generateName();
      const gadget = await prisma.gadget.create({
        data: {
          name: randomName,
          createdBy: req.user.id,
        },
      });
      res.json(customResponse(200, gadget));
    } catch (err) {
      console.error(err);
      res.status(500).json(customResponse(500, "Internal server error"));
    }
  },

  async getGadgets(req, res, next) {
    const { status } = req.query;

    try {
      const whereClause = { createdBy: req.user.id };
      if (status) whereClause.status = status;

      const gadgets = await prisma.gadget.findMany({ where: whereClause });

      const enhancedGadgets = gadgets.map((gadget) => ({
        ...gadget,
        missionSuccessProbability: `${gadget.name} - ${
          Math.floor(Math.random() * 100) + 1
        }% success probability`,
      }));

      res.json(customResponse(200, enhancedGadgets));
    } catch (err) {
      console.error(err);
      res.status(500).json(customResponse(500, "Internal server error"));
    }
  },

  async updateGadget(req, res, next) {
    try {
      const gadgetId = req.params.id;
      const gadget = await getGadgetById(gadgetId, req.user.id);

      const { status, name } = req.body;
      if (!status && !name) {
        return res.status(422).json(customResponse(422, "No valid fields to update"));
      }

      const updateData = updateGadgetFields(status, name);

      const updatedGadget = await prisma.gadget.update({
        where: { id: gadgetId },
        data: updateData,
      });

      res.json(customResponse(200, updatedGadget));
    } catch (err) {
      console.error(err);
      const errorMessage = err.message === "Gadget not found" ? "Gadget not found" : "Unauthorized to access this gadget";
      res.status(err.message === "Unauthorized to access this gadget" ? 401 : 404).json(customResponse(err.message === "Unauthorized to access this gadget" ? 401 : 404, errorMessage));
    }
  },

  async removeGadget(req, res, next) {
    try {
      const gadgetId = req.params.id;
      const gadget = await getGadgetById(gadgetId, req.user.id);

      const updatedGadget = await prisma.gadget.update({
        where: { id: gadgetId },
        data: {
          status: STATUS.DECOMISSIONED,
          decommissionedAt: new Date(),
        },
      });

      res.json(customResponse(200, updatedGadget));
    } catch (err) {
      console.error(err.message);
      res.status(err.message === "Unauthorized to access this gadget" ? 401 : 404).json(customResponse(err.message === "Unauthorized to access this gadget" ? 401 : 404, err.message));
    }
  },

  async destroyGadget(req, res, next) {
    try {
      const gadgetId = req.params.id;
      const gadget = await getGadgetById(gadgetId, req.user.id);

      const confirmationCode = generateCode();
      console.log("Self-destruct confirmation code:", confirmationCode);

      const updatedGadget = await prisma.gadget.update({
        where: { id: gadgetId },
        data: { status: STATUS.DESTROYED },
      });

      res.json(customResponse(200, updatedGadget));
    } catch (err) {
      console.error(err);
      const errorMessage = err.message === "Gadget not found" ? "Gadget not found" : "Unauthorized to access this gadget";
      res.status(err.message === "Unauthorized to access this gadget" ? 401 : 404).json(customResponse(err.message === "Unauthorized to access this gadget" ? 401 : 404, errorMessage));
    }
  },
};

export default gadgetController;
