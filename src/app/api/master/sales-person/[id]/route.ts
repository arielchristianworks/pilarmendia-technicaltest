import Salesperson from "@/backend/models/salespersons";
import { responseString } from "@/utils/responseString";
import { NextRequest } from "next/server";

type TReqOption = { params: {id: number} }

export async function GET(request: NextRequest, { params }: TReqOption) {
  const { id } = params;
  let res = {};

  let currSalesperson = await Salesperson.findByPk(id);
  if (!currSalesperson) {
    res = { message: responseString.GLOBAL.NOT_FOUND };
    return Response.json(res, { status: 404 });
  }

  return Response.json({
    ...currSalesperson.dataValues,
  }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: TReqOption) {
  const { id } = params;
  let req: any = {};
  try { req = await request.json(); } catch (e) {}
  let res = {};

  const { SalesPersonName, Alamat, NomorKontak } = req;

  let currSalesperson = await Salesperson.findByPk(id);
  if (!currSalesperson) {
    res = { message: responseString.GLOBAL.NOT_FOUND };
    return Response.json(res, { status: 404 });
  }

  let oldDataValues = {...currSalesperson.dataValues};
  let changingAttributes = [];
  
  if (SalesPersonName !== undefined) {
    currSalesperson.SalesPersonName = SalesPersonName;
    changingAttributes.push('SalesPersonName');
  }
  if (Alamat !== undefined) {
    currSalesperson.Alamat = Alamat;
    changingAttributes.push('Alamat');
  }
  if (NomorKontak !== undefined) {
    currSalesperson.NomorKontak = NomorKontak;
    changingAttributes.push('NomorKontak');
  }

  if (changingAttributes.length <= 0) {
    res = { message: responseString.VALIDATION.NOTHING_CHANGE_ON_UPDATE };
    return Response.json(res, { status: 400 });
  }

  return await currSalesperson.save({ fields: [...changingAttributes] })
  .then(async () => {
    await currSalesperson?.reload();
    res = {
      message: responseString.GLOBAL.SUCCESS,
      newValues: {
        ...currSalesperson?.dataValues,
      },
      previousValues: {
        ...oldDataValues,
      }
    }
    return Response.json(res, { status: 200 });
  })
  .catch((error: any) => {
    res = { error: { message: responseString.GLOBAL.UPDATE_FAILED }, details: error };
    // throw new Error(res)
    return Response.json(res, { status: 400 });
  })
}

export async function DELETE(request: NextRequest, { params }: TReqOption) {
  const { id } = params;
  let req = {};
  try { req = await request.json(); } catch (e) {}
  let res = {};

  let currSalesperson = await Salesperson.findByPk(id);
  if (!currSalesperson) {
    res = { message: responseString.GLOBAL.NOT_FOUND };
    return Response.json(res, { status: 404 });
  }

  return await currSalesperson.destroy()
  .then(() => {
    res = { message: responseString.GLOBAL.SUCCESS, }
    return Response.json(res, { status: 200 });
  })
  .catch((error: any) => {
    res = { error: { message: responseString.GLOBAL.DELETE_FAILED }, details: error };
    return Response.json(res, { status: 400 });
  })
}