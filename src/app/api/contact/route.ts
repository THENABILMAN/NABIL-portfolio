import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resumeData } from "@/data/resumeData";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  message: z.string().trim().min(10, "Message must be at least 10 characters long."),
});

async function sendWithResend({
  name,
  email,
  message,
  recipient,
}: {
  name: string;
  email: string;
  message: string;
  recipient: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    throw new Error("Resend is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL (or RESEND_FROM_EMAIL). ");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [recipient],
      reply_to: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div>${message.replace(/\n/g, "<br />")}</div>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend failed: ${response.status} ${errorText}`);
  }
}

async function sendWithWeb3Forms({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("Web3Forms is not configured. Set WEB3FORMS_ACCESS_KEY.");
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      message,
      subject: `New message from ${name}`,
      from_name: name,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Web3Forms failed: ${response.status} ${errorText}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please complete all fields correctly." },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;
    const recipient = process.env.CONTACT_TO_EMAIL || resumeData.personalInfo.email;

    if (process.env.RESEND_API_KEY) {
      await sendWithResend({ name, email, message, recipient });
      return NextResponse.json({ success: true, message: "Message sent successfully." });
    }

    if (process.env.WEB3FORMS_ACCESS_KEY) {
      await sendWithWeb3Forms({ name, email, message });
      return NextResponse.json({ success: true, message: "Message sent successfully." });
    }

    // Local / development fallback: logs submission to console
    console.log(`[Contact Form - Local Dev] From: ${name} <${email}>\nRecipient: ${recipient}\nMessage:\n${message}`);
    return NextResponse.json({
      success: true,
      message: "Message received! (Relayed to local developer stream)",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error while sending the message.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
