import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface WaitlistEntry {
  email: string;
  martial_art: string;
  experience_level: string;
  referral_source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface SurveyResponse {
  waitlist_id: string;
  training_frequency: string;
  biggest_pain_point: string;
  role: string;
  would_pay: string;
  most_exciting_feature: string;
  heard_about_us: string;
}

export async function addToWaitlist(entry: WaitlistEntry) {
  const { data, error } = await supabase
    .from('waitlist')
    .insert([entry])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function submitSurvey(response: SurveyResponse) {
  const { data, error } = await supabase
    .from('survey_responses')
    .insert([response])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getWaitlistCount() {
  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });
  
  if (error) return 0;
  return count || 0;
}
