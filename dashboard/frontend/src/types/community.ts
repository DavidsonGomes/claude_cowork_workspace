export interface SupportItem {
  question: string;
  status: string;
}

export interface StandoutMember {
  name: string;
  contribution: string;
  channel: string;
}

export interface NewMember {
  name: string;
  joined_at: string;
}

export interface ActionItem {
  text: string;
  priority: string;
  priority_class: string;
}

export interface CommunityReportData {
  sentiment_emoji: string | null;
  sentiment_narrative: string | null;
  support_items: SupportItem[];
  standout_members: StandoutMember[];
  new_members_list: NewMember[];
  action_items: ActionItem[];
}

export interface CommunitySnapshot {
  date: string;
  report_type: string;
  messages_count: number;
  active_members: number;
  new_members: number;
  sentiment_score: number | null;
  sentiment_label: string | null;
  top_topics: Array<{ topic: string; count: number }>;
  unresolved_questions: number;
  status: string;
  report_data: CommunityReportData;
}

export interface CommunityTrendPoint {
  date: string;
  sentiment_score: number | null;
  sentiment_label: string | null;
  messages_count: number;
  active_members: number;
}
