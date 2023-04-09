import * as mercadopago from 'mercadopago';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';
import { AppError } from 'src/errors/app-error';
import { injectable } from 'tsyringe';

interface IRequest {
  id: string
  email: string
  description: string
  amount: string
  url: string
}

@injectable()
export class ProcessPaymentUseCase {
  constructor(

  ){}
  async execute({ id, email, description, amount, url }: IRequest) {   
    mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN_MERCADOPAGO,
      integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
    });

    //Create purchase item object template
    const purchaseOrder: CreatePreferencePayload = {
      items: [
        {
          id: id,
          title: description,
          description : description,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(amount)
        },
      ],
      payer : {
        email
      },
      auto_return : "all",
      back_urls : {
        success : url + "/payments/success",
        pending : url + "/payments/pending",
        failure : url + "/payments/failure",
      }
    }

    //Generate init_point to checkout
    try {
      const preference = await mercadopago.preferences.create(purchaseOrder);
      console.log(preference.body.init_point)
      return preference.body.init_point
    }catch(err){
      throw new AppError(err.message);
    }

  }
}