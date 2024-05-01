import { UpdateChefUseCase } from './../../use-cases/update-chef/update-chef.use-case';
import { Request, Response } from 'express'
import { AddChefUseCase, GetChefsUseCase } from '../../use-cases'
import { GetChefUseCase } from '../../use-cases/get-chef'
import { DeleteChefUseCase } from '../../use-cases/delete-chef'
import { internal, notFound } from '../../../../infrastructure/http';
import { ValidationError, validate } from 'jsonschema';

const chefCreateSchema = {
  id: "/Chef",
  type: "object",
  properties: {
    first_name: {
      type: "string"
    },
    last_name: {
      type: "string"
    },
    phone: {
      type: "string"
    },
    country: {
      type: "string"
    },
    recipes: {
      type: "array",
      items: {
        type: "object"
      }
    },
  },
  required: ["first_name", "last_name", "recipes"]
}

const Joi = require('joi');

const chefInputSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: Joi.string(),
  country: Joi.string(),
  recipes: Joi.array().items(Joi.object())
});

const idSchema = Joi.object({
  id: Joi.string().required()
});

export class ChefController {
  constructor(
    private readonly getChefsUseCase: GetChefsUseCase,
    private readonly addChefUseCase: AddChefUseCase,
    private readonly getChefUseCase: GetChefUseCase,
    private readonly deleteChefUseCase: DeleteChefUseCase,
    private readonly updateChefUseCase: UpdateChefUseCase
  ) {}

  async getChefs(req: Request, res: Response) {
    try {
      const chefs = await this.getChefsUseCase.execute();
      return res.status(200).json(chefs);
    } catch(error) {
      console.error(error);
      return res.status(500).json({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }
  

  async addChef(req: Request, res: Response) {
    const { error } = chefInputSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details);
    }
    try {
      const chef = await this.addChefUseCase.execute(req.body)
      return res.status(201).json(chef)
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }

   // Get on chef by id
   async getChef(req: Request, res: Response) {
    const { error } = idSchema.validate(req.params);
    if (error) return res.status(400).json(error.details);
    try {
      const chef = await this.getChefUseCase.execute(req.params.id);
      return res.status(200).json(chef);
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }

  // Delete Chef
  async deleteChef(req: Request, res: Response) {
    const { error } = idSchema.validate(req.params);
    if (error) return res.status(400).json(error.details);
    try {
      const chef = await this.deleteChefUseCase.execute(req.params.id);
      return res.status(200).json(chef);
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }

  // Update Chef
  async updateChef(req: Request, res: Response) {
    const { error } = idSchema.validate(req.params);
    if (error) return res.status(400).json(error.details);
    try {
      const chef = await this.updateChefUseCase.execute(req.params.id, req.body);
      return res.status(200).json(chef);
    } catch (error) {
      console.error("Error", error);
      return res.status(500).json({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }
}
