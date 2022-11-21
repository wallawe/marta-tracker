import axios from "axios";

export default async function handler(req, res) {
  const response = await axios.get(
    "http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals"
  );

  res.status(200).json(response.data);
}
