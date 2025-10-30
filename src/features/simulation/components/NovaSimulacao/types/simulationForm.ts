export interface EnrollmentCategory {
  id: string;
  name: string;
  subtitle: string;
  enrollments: string;
  simulatedTransfer: string;
}

export interface RevenueItem {
  id: string;
  name: string;
  simulatedTransfer: string;
  currentValue: string;
}

export type TabType = "enrollment" | "revenue";

