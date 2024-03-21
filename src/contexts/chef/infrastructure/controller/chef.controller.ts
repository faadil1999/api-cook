import { Request, Response } from 'express'
import { AddChefUseCase, GetChefsUseCase } from '../../use-cases'

export class ChefController {
  constructor(
    private readonly getChefsUseCase: GetChefsUseCase,
    private readonly addChefUseCase: AddChefUseCase
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
