import Salesperson from "@/backend/models/salespersons"
import { responseString } from "@/utils/responseString"
import { NextRequest } from "next/server"
import { Op } from "sequelize"


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search')
  const limit = Number(searchParams.get('limit') ?? 100)
  let res = {};


  let whereAttributes: object = {};
  let sales_persons: any[] = [];

  if (!!search) {
    whereAttributes = {
      ...whereAttributes,
      SalesPersonName: {
        [Op.like]: `%${search}%`
      }
    }
  }

  return await Salesperson.findAll({
    attributes: ['SalesPersonID', 'SalesPersonName', 'createdAt'],
    where: {...whereAttributes},
    limit,
  })
  .then((res = []) => {
    res?.map((datum) => sales_persons.push({
      ...datum?.dataValues,
    }));

    return Response.json(sales_persons, { status: 200 });
  })
  .catch(err => {
    return Response.json({ message: responseString.SERVER.SERVER_ERROR }, { status: 500 })
  });
}

export async function POST(request: NextRequest) {
  let req: any = {};
  try { req = await request.json(); } catch (e) {}
  let res = {};

  const { SalesPersonName, Alamat, NomorKontak } = req;

  let newSalesperson = Salesperson.build({
    SalesPersonName, Alamat, NomorKontak
  });
  
  return await newSalesperson.save()
  .then(async (resp) => {
    await newSalesperson.reload();
    res = {
      message: responseString.GLOBAL.SUCCESS,
      created: {
        ...newSalesperson.dataValues,
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