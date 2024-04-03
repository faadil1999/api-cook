import { Request, Response } from 'express'
import { AddChefUseCase, GetChefsUseCase } from '../../use-cases'
import { GetChefUseCase } from '../../use-cases/get-chef'
import { DeleteChefUseCase } from '../../use-cases/delete-chef'
import { UpdateChefUseCase } from '../../use-cases/update-chef'

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
      type: "Recipe"
    },
  },
  required: ["first_name", "last_name", "recipes"]
}

export class ChefController {
  constructor(
    private readonly getChefsUseCase: GetChefsUseCase,
    private readonly addChefUseCase: AddChefUseCase,
    private readonly getChefUseCase: GetChefUseCase,
    private readonly deleteChefUseCase: DeleteChefUseCase,
    private readonly updateChefUseCase: UpdateChefUseCase
  ) {}

  async getChefs(req: Request, res: Response) {
    const chefs = await this.getChefsUseCase.execute()
    res.status(200).json(chefs)
  }

  async addChef(req: Request, res: Response) {
    try {
      const Chef = await this.addChefUseCase.execute(req.body)
      res.status(201).json(Chef)
    } catch (error: any) {
      console.log(error)
      // renvoyer la stacktrace à l'utilisateur n'est pas une bonne pratique
      res.status(500).json([
        {
          code: 'INTERNAL_SERVER_ERROR'
        }
      ])
    }
  }
}

// function convertErrorsToHttpResponse(error: unknown) {
//   // https://www.baeldung.com/rest-api-error-handling-best-practices
//   if (error instanceof TagNotFoundError) {
//     return notFound({ message: error.message, code: 'tag-not-found', data: { id: error.id } })
//   }
//   return internal()
// }