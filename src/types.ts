export interface Project {
  id: string;
  name: string;
  industry: string;
  imageUrl: string;
  description: string;
  tags: string[];
  launchYear: string;
}

export interface BookingInquiry {
  id: string;
  name: string;
  businessName: string;
  email?: string;
  phoneNumber: string;
  preferredDate: string;
  preferredTime: string;
  projectDetails: string;
  createdAt: string;
}
