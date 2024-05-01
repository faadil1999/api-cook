import { Request, Response } from 'express';
import { AddRecipeUseCase, DeleteRecipeUseCase, GetRecipeUseCase, GetRecipesUseCase, UpdateRecipeUseCase, GetRecipeByNameUseCase, PaginateRecipesUseCase } from '../../use-cases';
import { RecipeNotFoundError } from '../../domains';
import { internal, notFound } from '../../../../infrastructure/http';

const Joi = require('joi');
// Define JOI schemas
const recipeSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  chefId: Joi.string().required()
});

const nameSchema = Joi.object({
  name: Joi.string(),
});

const recipeUpdateSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  chefId: Joi.string()
});

const idSchema = Joi.object({
  id: Joi.string().required()
});

const pageNumberSchema = Joi.object({
  pageNumber: Joi.number().min(1).required()
});

export class RecipeController {
  constructor(
    private readonly getRecipesUseCase: GetRecipesUseCase,
    private readonly addRecipeUseCase: AddRecipeUseCase,
    private readonly getRecipeUseCase: GetRecipeUseCase,
    private readonly deleteRecipeUseCase: DeleteRecipeUseCase,
    private readonly updateRecipeUseCase: UpdateRecipeUseCase,
    private readonly getRecipeByNameUseCase: GetRecipeByNameUseCase,
    private readonly paginateRecipesUseCase : PaginateRecipesUseCase,
  ) { }

  async getRecipes(req: Request, res: Response) {
    const recipes = await this.getRecipesUseCase.execute();
    res.status(200).json(recipes);
  }

  async addRecipe(req: Request, res: Response) {
    const { error } = recipeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const recipe = await this.addRecipeUseCase.execute(req.body);
      res.status(201).json(recipe);
    } catch (error) {
      const httpResponse = this.convertErrorsToHttpResponse(error);
      res.status(httpResponse.status).json(httpResponse.body);
    }
  }

  async getRecipe(req: Request, res: Response) {
    const { error } = idSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const recipe = await this.getRecipeUseCase.execute(req.params.id);
      res.status(200).json(recipe);
    } catch (error) {
      const httpResponse = this.convertErrorsToHttpResponse(error);
      res.status(httpResponse.status).json(httpResponse.body);
    }
  }

  async getByNameRecipe(req: Request, res: Response) {
    const { error } = nameSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const recipe = await this.getRecipeByNameUseCase.execute(req.params.name);
      res.status(200).json(recipe);
    } catch (error) {
      const httpResponse = this.convertErrorsToHttpResponse(error);
      res.status(httpResponse.status).json(httpResponse.body);
    }
  }

  async deleteRecipe(req: Request, res: Response) {
    const { error } = idSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const recipe = await this.deleteRecipeUseCase.execute(req.params.id);
      res.status(200).json(recipe);
    } catch (error) {
      const httpResponse = this.convertErrorsToHttpResponse(error);
      res.status(httpResponse.status).json(httpResponse.body);
    }
  }

  async updateRecipe(req: Request, res: Response) {
    const idValidation = idSchema.validate(req.params);
    console.log(idValidation);
    if (idValidation.error) {
      return res.status(400).json({ error: idValidation.error.details[0].message });
    }

    const bodyValidation = recipeUpdateSchema.validate(req.body);
    if (bodyValidation.error) {
      return res.status(400).json({ error: bodyValidation.error.details[0].message });
    }

    try {
      const recipe = await this.updateRecipeUseCase.execute(req.params.id, req.body);
      res.status(200).json(recipe);
    } catch (error) {
      const httpResponse = this.convertErrorsToHttpResponse(error);
      res.status(httpResponse.status).json(httpResponse.body);
    }
  }

  async paginateRecipes(req: Request, res: Response) {
    const { error } = pageNumberSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const recipes = await this.paginateRecipesUseCase.execute(Number(req.params.pageNumber));
      res.status(200).json(recipes);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  private convertErrorsToHttpResponse(error: unknown) {
    if (error instanceof RecipeNotFoundError) {
      return notFound({ message: error.message, code: 'recipe-not-found', data: { id: error.id } });
    }
    return internal();
  }
}
