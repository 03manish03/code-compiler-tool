import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ExecuteRequest {
  language: string;
  code: string;
  version?: string;
}

const languageVersionMap: Record<string, string> = {
  python: "3.10.0",
  javascript: "18.15.0",
  typescript: "5.0.3",
  java: "15.0.2",
  cpp: "10.2.0",
  c: "10.2.0",
  csharp: "6.12.0",
  ruby: "3.0.1",
  go: "1.16.2",
  rust: "1.68.2",
  php: "8.2.3",
  swift: "5.3.3",
  kotlin: "1.8.20",
  scala: "3.2.2",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { language, code, version }: ExecuteRequest = await req.json();

    if (!language || !code) {
      return new Response(
        JSON.stringify({ error: "Language and code are required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const selectedVersion = version || languageVersionMap[language] || "latest";

    const pistonResponse = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language,
        version: selectedVersion,
        files: [
          {
            content: code,
          },
        ],
      }),
    });

    const result = await pistonResponse.json();

    return new Response(
      JSON.stringify({
        output: result.run?.output || result.run?.stderr || "No output",
        status: result.run?.code === 0 ? "success" : "error",
        language: result.language,
        version: result.version,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to execute code",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
