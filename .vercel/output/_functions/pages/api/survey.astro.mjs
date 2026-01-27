import { s as supabase } from '../../chunks/supabase_ChhePdXk.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      waitlist_id,
      training_frequency,
      biggest_pain_point,
      role,
      would_pay,
      most_exciting_feature,
      heard_about_us
    } = body;
    const supabaseUrl = undefined                                   ;
    if (!supabaseUrl) {
      console.log("Survey response (mock):", body);
      return new Response(JSON.stringify({
        success: true,
        message: "Survey submitted (development mode)"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data, error } = await supabase.from("survey_responses").insert([{
      waitlist_id: waitlist_id || null,
      training_frequency,
      biggest_pain_point,
      role,
      would_pay,
      most_exciting_feature,
      heard_about_us
    }]).select().single();
    if (error) {
      throw error;
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Survey submitted successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Survey error:", error);
    return new Response(JSON.stringify({ error: "Failed to submit survey. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
