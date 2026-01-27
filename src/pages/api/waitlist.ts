import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, martial_art, experience_level, utm_source, utm_medium, utm_campaign } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if Supabase is configured
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      // Mock response for development without Supabase
      console.log('Waitlist signup (mock):', { email, martial_art, experience_level });
      return new Response(JSON.stringify({ 
        success: true, 
        id: 'mock-' + Date.now(),
        message: 'Added to waitlist (development mode)' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{
        email,
        martial_art: martial_art || null,
        experience_level: experience_level || null,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
      }])
      .select()
      .single();

    if (error) {
      // Handle duplicate email
      if (error.code === '23505') {
        return new Response(JSON.stringify({ error: 'This email is already on the waitlist!' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      throw error;
    }

    return new Response(JSON.stringify({ 
      success: true, 
      id: data.id,
      message: 'Successfully added to waitlist' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Waitlist error:', error);
    return new Response(JSON.stringify({ error: 'Failed to join waitlist. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const GET: APIRoute = async () => {
  try {
    // Check if Supabase is configured
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      return new Response(JSON.stringify({ count: 847 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    // Add some padding to make it look more impressive initially
    const displayCount = (count || 0) + 847;

    return new Response(JSON.stringify({ count: displayCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Count error:', error);
    return new Response(JSON.stringify({ count: 847 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
