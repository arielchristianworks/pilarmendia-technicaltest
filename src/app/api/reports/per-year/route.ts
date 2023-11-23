import sqlz from "@/backend/config/db";
import { responseString } from "@/utils/responseString";
import { NextRequest } from "next/server";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const year = Number(searchParams.get('year') ?? 2023)
  let res = {};

  return await sqlz?.query(`SELECT YEAR(SalesDate) as "year", MONTH(SalesDate) as "month", SUM(SalesAmount) as "sales" FROM sales WHERE YEAR(SalesDate) = ${year} GROUP BY YEAR(SalesDate), MONTH(SalesDate) ORDER BY MONTH(SalesDate);`)
  .then(([resp]) => {
    let result: { labels: string[], values: number[] };

    let tempMonth: string[] = []
    let tempValues: number[] = []
    resp.map((item: any) => {
      tempMonth.push(months[Number(item.month) - 1])
      tempValues.push(Number(item.sales))
    })
    result = { labels: tempMonth, values: tempValues }
    return Response.json(result, { status: 200 });
  })
  .catch((err: any) => {
    return Response.json({ message: responseString.SERVER.SERVER_ERROR }, { status: 500 })
  });
}