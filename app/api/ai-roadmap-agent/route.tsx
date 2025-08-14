import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

    export async function POST(req:NextRequest){
        const {roadmapId,userInput} = await req.json();
        const user= await currentUser();    
          try {
            const resultIds = await inngest.send({
            name: "AiRoadmapAgent",
            data: {
                userInput: userInput,
                roadmapId: roadmapId,
                userEmail:user?.primaryEmailAddress?.emailAddress
            }
        });

        const runId = resultIds?.ids?.[0];
        let runStatus;
        while (true) {
            runStatus = await getRuns(runId);
            console.log("runStatus.data:", runStatus?.data);
            const first = Array.isArray(runStatus?.data) ? runStatus.data[0] : null;
            if (first?.status === 'Completed') break;
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Defensive: check for output
        const output =
            Array.isArray(runStatus?.data) &&
            runStatus.data[0]?.output?.output
                ? runStatus.data[0].output.output[0]
                : { error: "No output found" };

        return NextResponse.json(output);
    } catch (error: any) {
        console.error("API error:", error);
        return NextResponse.json(
            { error: error.message || error.toString() },
            { status: 500 }
        );
    }
}

export async function getRuns(runId: string) {
    const result = await axios.get(
        `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,
        {
            headers: {
                Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
            }
        }
    );
    return result.data;
}