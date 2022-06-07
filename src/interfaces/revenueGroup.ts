import type { RuleData } from "./rule";

export interface RevenueGroup {
  id: number;
  name: string;
  description: string;
  specialGroup: boolean;
  rules: RuleData[]
}