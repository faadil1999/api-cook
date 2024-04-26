import { Request, Response } from 'express'
import { AddRecipeUseCase, DeleteRecipeUseCase, GetRecipeUseCase, GetRecipesUseCase, UpdateRecipeUseCase, GetRecipeByNameUseCase } from '../../use-cases'
import { RecipeNotFoundError } from '../../domains'
import { ValidationError, validate } from 'jsonschema'
import { PaginateRecipesUseCase } from '../../use-cases/paginate-recipes/paginate-recipe.use-case'
import { internal, notFound } from '../../../../infrastructure/http'

const recipeSchema = {
  id: "/Recipe",
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    chefId: { type: "string" }
  },
  required: ["name", "chefId", "description"]
};

const idSchema = {
  id: "/Id",
  type: "object",
  properties: {
    id: { type: "string" }
  },
  required: ["id"]
};
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

  // Gett all recipes
  async getRecipes(req: Request, res: Response) {
    const recipes = await this.getRecipesUseCase.execute()
    res.status(200).json(recipes)
  }

  // Add recipe to db
  async addRecipe(req: Request, res: Response) {
    // mettre une validation pour chaque endpoint, bien gérer l'objet d'erreur (ici fait un peu à la va vite
    const result = validate(req.body, recipeSchema);
    if (!result.valid) {
      return res.status(400).json(result.errors.map(error => ({ message: error.message })));
    }

    try {
      const recipe = await this.addRecipeUseCase.execute(req.body);
      return res.status(201).json(recipe);
    } catch (error) {
      const httpResponse = convertErrorsToHttpResponse(error);
      return res.status(httpResponse.status).json(httpResponse.body);
    }
  }

  // Get on recipe by id
  async getRecipe(req: Request, res: Response) {
    const idValidation = validate(req.params, idSchema);
    if (!idValidation.valid) {
      return res.status(400).json(idValidation.errors.map(error => ({ message: error.message })));
    }

    try {
      const recipe = await this.getRecipeUseCase.execute(req.params.id);
      return res.status(200).json(recipe);
    } catch (error) {
      const httpResponse = convertErrorsToHttpResponse(error);
      return res.status(httpResponse.status).json(httpResponse.body);
    }
  }

  // Get on recipe by name
  async getByNameRecipe(req: Request, res: Response) {
    try {
      const recipe = await this.getRecipeByNameUseCase.execute(req.params.name)
      res.status(200).json(recipe)
    } catch (error) {
      // à faire idéalement dans chaque fonction (voir à faire une mise en commmun)
      const httpResponse = convertErrorsToHttpResponse(error)
      res.status(httpResponse.status).json(httpResponse.body)
    }
  }

  // Delete Recipe
  async deleteRecipe(req: Request, res: Response) {
    const idValidation = validate(req.params, idSchema);
    if (!idValidation.valid) {
      return res.status(400).json(idValidation.errors.map(error => ({ message: error.message })));
    }

    try {
      const recipe = await this.deleteRecipeUseCase.execute(req.params.id);
      return res.status(200).json(recipe);
    } catch (error) {
      const httpResponse = convertErrorsToHttpResponse(error);
      return res.status(httpResponse.status).json(httpResponse.body);
    }
  }

  // Update Recipe
  async updateRecipe(req: Request, res: Response) {
    const idValidation = validate(req.params, idSchema);
    if (!idValidation.valid) {
      return res.status(400).json(idValidation.errors.map(error => ({ message: error.message })));
    }

    const bodyValidation = validate(req.body, recipeSchema);
    if (!bodyValidation.valid) {
      return res.status(400).json(bodyValidation.errors.map(error => ({ message: error.message })));
    }

    try {
      const recipe = await this.updateRecipeUseCase.execute(req.params.id, req.body);
      return res.status(200).json(recipe);
    } catch (error) {
      const httpResponse = convertErrorsToHttpResponse(error);
      return res.status(httpResponse.status).json(httpResponse.body);
    }
  }

  async paginateRecipes(req: Request<{ pageNumber: number }>, res: Response) {
    console.log(req.params.pageNumber);
    const errors = [];
    if (req.params.pageNumber < 1) {
      errors.push({
        code: 'INVALID_PAGE_NUMBER'
      })
    }
    if (errors.length) {
      res.status(400).json(errors);
    }
    try {
      const recipes = await this.paginateRecipesUseCase.execute(req.params.pageNumber)
      res.status(200).json(recipes)
    } catch (error) {
      res.status(400).json(error);
    }
  }
}



function convertErrorsToHttpResponse(error: unknown) {
  if (error instanceof RecipeNotFoundError) {
    return notFound({ message: error.message, code: 'recipe-not-found', data: { id: error.id } });
  }
  return internal();
}
