import { executeQuery } from "@/lib/db";

export default async function pubDocHandling(req, res) {
  try {
    // Extract codedtsValue dynamically from the request (e.g., query params or body)
    const { codedts } = req.query; // Adjust to req.body if using POST requests

    if (!codedts) {
      return res.status(400).json({ error: "Missing codedtsValue in request" });
    }

    // Define the parameterized query
    const query = `
      SELECT *
      FROM PubDocumenttype
      WHERE codedts = @codedtsValue
    `;

    // Execute the query safely with the parameter value
    const result = await executeQuery(query, [
      { name: "codedtsValue", type: "Int", value: codedts },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ error: "No matching row found" });
    }

    // Return the output, filtering out NULL values dynamically
    const row = result[0];
    const filteredRow = Object.fromEntries(
      Object.entries(row).filter(([key, value]) => value !== null)
    );

    res.status(200).json(filteredRow);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}
