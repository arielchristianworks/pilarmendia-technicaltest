import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  let result = await axios.get(`https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${id}.json`)
  .then(res => {
    return res.data
  });
  return Response.json(result);
}