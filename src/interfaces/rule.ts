import type { Parameter } from "./parameter";

export interface RuleData {
  id: number;
  field: string | null;
  operator: string | null;
  parameters: Parameter[];
  revenue: number | string;
}