import { Request, Response } from "express";
import { ProcessPaymentUseCase } from "src/use-cases/process-payment-use-case";
import { container } from "tsyringe";

export class ProcessPaymentController {
  async handle(request: Request, response: Response) {
    const { id, email, description, amount } = request.body;

    const getFullUrl = (request: Request) =>{
      const url = request.protocol + '://' + request.get('host');
      return url;
    }

    const url = getFullUrl(request)

    const processPaymentUseCase = container.resolve(ProcessPaymentUseCase);
    const result =  await processPaymentUseCase.execute({ id, email, description, amount, url });

    response.status(200).json({result});
  }
}