export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
    const apiKey = import.meta.env.RESEND_API_KEY;

    if (!apiKey) {
        console.error("RESEND_API_KEY is missing from environment variables");
        return new Response(
            JSON.stringify({ message: "Server configuration error: Missing API Key" }),
            { status: 500 }
        );
    }

    const resend = new Resend(apiKey);

    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({
                    message: "Missing required fields",
                }),
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: ['kabarca@gmail.com'],
            subject: `New Contact Message from ${name}`,
            html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        if (error) {
            console.error("Resend API error:", error);
            return new Response(
                JSON.stringify({ message: "Failed to send email", error }),
                { status: 500 }
            );
        }

        return new Response(
            JSON.stringify({
                message: "Email sent successfully",
                data
            }),
            { status: 200 }
        );
    } catch (e: any) {
        console.error("Detailed Server Error:", e);
        return new Response(
            JSON.stringify({
                message: "Internal server error",
                error: e.message || String(e),
                stack: e.stack
            }),
            { status: 500 }
        );
    }
};
