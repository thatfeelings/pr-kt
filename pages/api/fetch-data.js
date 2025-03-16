import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
  // if (req.method !== 'POST') {
  //   return res.status(405).json({ message: 'Method Not Allowed' });
  // }

  // const { mode, user } = req.body; // Dynamically passed parameters

  try {
    // Execute the stored procedure with the provided dynamic parameters
    const spQuery = 
    
    `
    EXEC dbo.pubdocumenthandling 103,NULL,132,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL
    `;
    // `
    //   EXEC dbo.InvRptGoodCardex
    //   @StockNo = 12,
    //   @CompanyNo = 1,
    //   @Year = 1403,
    //   @FDate = '14031201',
    //   @LDate = '14031230',
    //   @AG = 1,
    //   @AR = 1,
    //   @AM = 1,
    //   @AD = 1,
    //   @SSNExcSerial = 0,
    //   @BatchNo = '',
    //   @IsDraft = 1,
    //   @GoodCode1 = '',
    //   @GoodCode2 = 'zzzzzzzzzzzzzzzzzzzzzz',
    //   @GGM = -1,
    //   @unit = 0
    // `
    // 'select * from pubusers '
    
      const result = await executeQuery(spQuery);

    // Return the output of the stored procedure
    res.status(200).json(result);
  } catch (error) {
    console.error('Error executing stored procedure:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
}





// import { executeQuery } from '@/lib/db';

// export default async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   const page = parseInt(req.query.page) || 1; // Current page (default: 1)
//   const pageSize = parseInt(req.query.pageSize) || 50; // Rows per page (default: 50)
//   const offset = (page - 1) * pageSize;

//   try {
//     // Use SQL OFFSET and FETCH for pagination
//     const query = `
//       SELECT *
//       FROM pubdocumentflow
//       ORDER BY DFS
//       OFFSET ${offset} ROWS
//       FETCH NEXT ${pageSize} ROWS ONLY
//     `;
//     const data = await executeQuery(query);

//     // Total count of rows for frontend pagination control
//     const totalQuery = `SELECT COUNT(*) AS total FROM pubdocumentflow`;
//     const totalResult = await executeQuery(totalQuery);

//     res.status(200).json({
//       data,
//       total: totalResult[0]?.total || 0, // Total number of rows in the table
//       page,
//       pageSize,
//     });
//   } catch (error) {
//     console.error('Error in API:', error);
//     res.status(500).json({ message: 'Internal server error', error });
//   }
// }
