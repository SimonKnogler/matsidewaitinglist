import { s as supabase } from '../../chunks/supabase_ChhePdXk.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, martial_art, experience_level, utm_source, utm_medium, utm_campaign } = body;
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const supabaseUrl = undefined                                   ;
    if (!supabaseUrl) {
      console.log("Waitlist signup (mock):", { email, martial_art, experience_level });
      return new Response(JSON.stringify({
        success: true,
        id: "mock-" + Date.now(),
        message: "Added to waitlist (development mode)"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data, error } = await supabase.from("waitlist").insert([{
      email,
      martial_art: martial_art || null,
      experience_level: experience_level || null,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null
    }]).select().single();
    if (error) {
      if (error.code === "23505") {
        return new Response(JSON.stringify({ error: "This email is already on the waitlist!" }), {
          status: 409,
          headers: { "Content-Type": "application/json" }
        });
      }
      throw error;
    }
    return new Response(JSON.stringify({
      success: true,
      id: data.id,
      message: "Successfully added to waitlist"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Waitlist error:", error);
    return new Response(JSON.stringify({ error: "Failed to join waitlist. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const GET = async () => {
  try {
    const supabaseUrl = undefined                                   ;
    if (!supabaseUrl) {
      return new Response(JSON.stringify({ count: 847 }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { count, error } = await supabase.from("waitlist").select("*", { count: "exact", head: true });
    if (error) throw error;
    const displayCount = (count || 0) + 847;
    return new Response(JSON.stringify({ count: displayCount }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Count error:", error);
    return new Response(JSON.stringify({ count: 847 }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
