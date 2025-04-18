import { executeQuery } from "../../../lib/db";
import { NextResponse } from "next/server";
import { ToPersianNumber } from "topersiannumber"; // Import Persian digit conversion library

// Utility function to format Persian dates by adding "/"
const formatPersianDate = (dateString) => {
    if (dateString && dateString.length === 8) {
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);
        return `${year}/${month}/${day}`;
    }
    return dateString;
};

// Function to apply formatting to `DocDateDfs`
const formatDocDateDfsField = (data) => {
    if (Array.isArray(data)) {
        return data.map((item) => ({
            ...item,
            DocDateDfs: item.DocDateDfs ? formatPersianDate(item.DocDateDfs) : item.DocDateDfs,
        }));
    } else if (typeof data === "object" && data !== null) {
        return {
            ...data,
            DocDateDfs: data.DocDateDfs ? formatPersianDate(data.DocDateDfs) : data.DocDateDfs,
        };
    }
    return data;
};

// Utility function to format ISO dates and times
const formatToPersianDateTime = (isoDate) => {
    const dateObject = new Date(isoDate);
    const persianDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(dateObject);

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const formattedTime =
        `${ToPersianNumber(hours % 12 || 12)}:${ToPersianNumber(minutes.toString().padStart(2, "0"))}` +
        (hours >= 12 ? "PM" : "AM");

    return `${persianDate} - ${formattedTime}`;
};

// Utility function to detect date-like strings
const isDateString = (value) => {
    return (
        typeof value === "string" &&
        (/\d{4}-\d{2}-\d{2}/.test(value) || (value.includes("T") && value.includes("Z")))
    );
};

// Recursive utility function to convert all data except `Codedts` and `DFS`
const convertToPersianDigits = (data) => {
    if (data instanceof Date) {
        return formatToPersianDateTime(data.toISOString());
    }

    if (typeof data === "string") {
        if (isDateString(data)) {
            return formatToPersianDateTime(data);
        }
        return ToPersianNumber(data);
    }

    if (typeof data === "number") {
        return ToPersianNumber(data.toString());
    }

    if (Array.isArray(data)) {
        const excludedKeys = [
            "DFSSerialDFS",
            "DTSSerialDFS",
            "DocNoDFS",
            "DocStatus",
            "CodeDTS",
            "FromUSNDFS",
            "ToUsnDFS",
            "DFS",
            "FlowStatusDfs",
            "DocNoDFS",
            "ToDescDFS",
            "XXXSerialDFS",
            "USNSerialDFS",
            "ToDescDFS",
            "IsViewedDfs"
        ]; // List of keys to exclude from Persian digit conversion
    
        return data.map((item) => {
            const processedItem = {};
    
            // Iterate over all keys in the item
            Object.keys(item).forEach((key) => {
                processedItem[key] = excludedKeys.includes(key)
                    ? item[key] // Exclude these keys from Persian digit conversion
                    : convertToPersianDigits(item[key]); // Apply Persian formatting to other keys
            });
    
            return processedItem; // Return the processed item
        });
    }

    if (typeof data === "object" && data !== null) {
        const convertedObject = {};
        for (const key in data) {
            if (Object.hasOwn(data, key)) {
                if (key === "Codedts" || key === "DFS") {
                    convertedObject[key] = data[key]; // Do not change `Codedts` or `DFS`
                } else {
                    convertedObject[key] = convertToPersianDigits(data[key]);
                }
            }
        }
        return convertedObject;
    }

    return data;
};

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized: Missing User ID" }, { status: 401 });
        }

        const spQuery = `EXEC dbo.pubdocumenthandling 103, NULL, @USER, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL`;
        const params = { USER: userId };

        const result = await executeQuery(spQuery, params);

        if (!result || result.length === 0) {
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }

        const convertedResult = convertToPersianDigits(result);
        const finalResult = formatDocDateDfsField(convertedResult);

        return NextResponse.json(finalResult);
    } catch (error) {
        console.error("Error executing stored procedure:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
