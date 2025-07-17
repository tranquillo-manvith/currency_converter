import { NextApiRequest, NextApiResponse } from "next";

export default async function convert(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { from, to, amount } = req.body;
  try {
    const apiData = await fetch(
      `https://v6.exchangerate-api.com/v6/797938b8c660b81ee98d6d0b/latest/${from}`
    );

    const data = await apiData.json();
    console.log("From:", from);
    console.log("To:", to);
    console.log("Amount:", amount);
    console.log("Conversion Rate:", data.conversion_rates[to]);

    const result = data.conversion_rates[to] * parseFloat(amount);
    const StringRes = result.toString();
    return res.status(200).json({ message: "success", result: StringRes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
