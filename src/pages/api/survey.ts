import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
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

    // Check if Supabase is configured
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      // Mock response for development without Supabase
      console.log('Survey response (mock):', body);
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Survey submitted (development mode)' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('survey_responses')
      .insert([{
        waitlist_id: waitlist_id || null,
        training_frequency,
        biggest_pain_point,
        role,
        would_pay,
        most_exciting_feature,
        heard_about_us,
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Survey submitted successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Survey error:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit survey. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
