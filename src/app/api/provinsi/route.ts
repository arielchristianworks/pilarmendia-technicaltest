import axios from "axios";

export async function GET() {
  let result = await axios.get("https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json")
  .then(res => {
    return res.data
  });
  return Response.json(result);
}