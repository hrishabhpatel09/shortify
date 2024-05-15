import urlModel from "@/models/urlModel";
import connectDB from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    await connectDB()
    try {
        const shortUrl = request.nextUrl.href
    const res = await urlModel.findOne({
        shortUrl: shortUrl
    })
    if(!res){
        return NextResponse.json({
            message: 'No url found'
        })
    }
    return NextResponse.redirect(res.originalUrl)
    } catch (error) {
        return NextResponse.json({
            mesage: error
        })
    }
}