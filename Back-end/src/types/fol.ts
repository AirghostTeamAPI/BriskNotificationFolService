import { Document } from "mongoose";

export type IFol = {
  title: string;
  equipment: string;
  applicability: string;
  issue_description: string;
  category: string;
  status: string;
  issue_date: Date;
  revision_number: number;
  revision_date: Date;
  remarks: string;
  keywords: string;
  notifiedUsers: {
    users: [{
      userId: string;
    }]
  };
  viewsByUsers: {
    users: [{
      userId: string;
    }]
  };
}

export type IFolDocument = IFol & Document;