import { executeQuery } from "@/lib/db";

export default async function dfsTabs () {


    try {
        const query = `
            SELECT Tab1DTS, Tab2DTS, Tab3DTS, Tab4DTS, Tab5DTS, Tab6DTS, Tab7DTS , Tab8DTS
            FROM PubDocumenttype
            WHERE codedts = @codedtsValue
        `;



        const result = executeQuery(query, {codedtsValue})

        const filteredTabs = Object.entries(result[0] || {}).reduce((acc, [key, value]) => {
            if (value !== null) acc[key] = value;
            return acc;
        }, {});

        res.status(200).json(filteredTabs)
    
    }
    catch {
        console.error('Faild to fetch data',error);
        res.status(500).json({message: 'Internal server error', error})
        
    }
}