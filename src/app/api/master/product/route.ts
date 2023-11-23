import Product from "@/backend/models/product"
import { responseString } from "@/utils/responseString"
import { NextRequest } from "next/server"
import { Op } from "sequelize"


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search')
  const limit = Number(searchParams.get('limit') ?? 100)
  let res = {};


  let whereAttributes: object = {};
  let products: any[] = [];

  if (!!search) {
    whereAttributes = {
      ...whereAttributes,
      ProductName: {
        [Op.like]: `%${search}%`
      }
    }
  }

  return await Product.findAll({
    attributes: ['ProductID', 'ProductName', 'createdAt'],
    where: {...whereAttributes},
    limit,
  })
  .then((res = []) => {
    res?.map((datum) => products.push({
      ...datum?.dataValues,
    }));

    return Response.json(products, { status: 200 });
  })
  .catch(err => {
    return Response.json({ message: responseString.SERVER.SERVER_ERROR }, { status: 500 })
  });
}

export async function POST(request: NextRequest) {
  let req: any = {};
  try { req = await request.json(); } catch (e) {}
  let res = {};

  const { ProductName, ProductPrice, Description } = req;

  let newProduct = Product.build({
    ProductName, ProductPrice, Description
  });
  
  return await newProduct.save()
  .then(async (resp) => {
    await newProduct.reload();
    res = {
      message: responseString.GLOBAL.SUCCESS,
      created: {
        ...newProduct.dataValues,
      },
    }
    return Response.json(res, { status: 200 });
  })
  .catch(error => {
    res = { error: { message: responseString.GLOBAL.ADD_FAILED }, details: error };
    // throw new Error(res)
    return Response.json(res, { status: 400 });
  })
}