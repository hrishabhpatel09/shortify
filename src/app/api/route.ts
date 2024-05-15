import connectDB from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import urlModel from "@/models/urlModel";
import generateBase62String from "@/utils/shortUrl";

export async function POST(request:NextRequest) {
    await connectDB()
    try {
        //Validation
        const {originalUrl} = await request.json();
        if(!originalUrl) return NextResponse.json({message: 'Url is Required!',success: false},{status: 204})
        
        //finding Url in the database
        const isUrlAlreadyExisting = await urlModel.findOne({originalUrl: originalUrl});
        console.log(isUrlAlreadyExisting)

        // if already Exists
        if(isUrlAlreadyExisting){
            return NextResponse.json(isUrlAlreadyExisting);
        }

        // creating a new shortId
        const shortId = generateBase62String();
        const currentUrl = request.nextUrl;
        const newurl = new urlModel({
            originalUrl,
            shortUrl: `${currentUrl}/${shortId}`
        })

        await newurl.save();

        return NextResponse.json(newurl)

    } catch (error) {
        
    }
}