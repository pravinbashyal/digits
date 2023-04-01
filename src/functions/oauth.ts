import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Handler } from "@netlify/functions";

const supabaseUrl = "https://wlfecvdxlmleufiulpez.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZmVjdmR4bG1sZXVmaXVscGV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwMzQzMTksImV4cCI6MTk5NTYxMDMxOX0.5PPNHHYyIE0j6lh-JS8oHcxs5RTvjPCHPe_WA6AcgNU";
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export const handler: Handler = async (event, context) => {
  try {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ user }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
