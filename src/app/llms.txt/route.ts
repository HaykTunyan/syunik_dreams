import { NextResponse } from "next/server";

export async function GET() {
    const pages = [
        { title: "Home", url: "/" },
        { title: "Cities", url: "/city" },
        { title: "History", url: "/history" },
        { title: "Trips", url: "/trips" },
        { title: "About the Road", url: "/about-road" },
        { title: "Contact", url: "/contact" },
        { title: "Products", url: "/product" },
    ];

    const content = `# Syunik Dreams

> Information about Syunik region, cities, trips, and history.

## Pages
${pages.map((p) => `- [${p.title}](${p.url})`).join("\n")}
`;

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}