import Product from "@/backend/models/product";
import { responseString } from "@/utils/responseString";
import { NextRequest } from "next/server";

type TReqOption = { params: {id: number} }

export async function GET(request: NextRequest, { params }: TReqOption) {
  const { id } = params;
  let res = {};

  let currProduct = await Product.findByPk(id);
  if (!currProduct) {
    res = { message: responseString.GLOBAL.NOT_FOUND };
    return Response.json(res, { status: 404 });
  }

  return Response.json({
    ...currProduct.dataValues,
  }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: TReqOption) {
  const { id } = params;
  let req: any = {};
  try { req = await request.json(); } catch (e) {}
  let res = {};

  const { ProductName, ProductPrice, Description } = req;

  let currProduct = await Product.findByPk(id);
  if (!currProduct) {
    res = { message: responseString.GLOBAL.NOT_FOUND };
    return Response.json(res, { status: 404 });
  }

  let oldDataValues = {...currProduct.dataValues};
  let changingAttributes = [];
  
  if (ProductName !== undefined) {
    currProduct.ProductName = ProductName;
    changingAttributes.push('ProductName');
  }
  if (ProductPrice !== undefined) {
    currProduct.ProductPrice = ProductPrice;
    changingAttributes.push('ProductPrice');
  }
  if (Description !== undefined) {
    currProduct.Description = Description;
    changingAttributes.push('Description');
  }

  if (changingAttributes.length <= 0) {
    res = { message: responseString.VALIDATION.NOTHING_CHANGE_ON_UPDATE };
    return Response.json(res, { status: 400 });
  }

  return await currProduct.save({ fields: [...changingAttributes] })
  .then(async () => {
    await currProduct?.reload();
    res = {
      message: responseString.GLOBAL.SUCCESS,
      newValues: {
        ...currProduct?.dataValues,
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

  let currProduct = await Product.findByPk(id);
  if (!currProduct) {
    res = { message: responseString.GLOBAL.NOT_FOUND };
    return Response.json(res, { status: 404 });
  }

  return await currProduct.destroy()
  .then(() => {
    res = { message: responseString.GLOBAL.SUCCESS, }
    return Response.json(res, { status: 200 });
  })
  .catch((error: any) => {
    res = { error: { message: responseString.GLOBAL.DELETE_FAILED }, details: error };
    return Response.json(res, { status: 400 });
  })
}