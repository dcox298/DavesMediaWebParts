import { IDavesAccordion } from "../models/IDavesAccordion";

export interface IAccordionProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  accordianItems:IDavesAccordion[];
  displayMode:number;
  onDelete:any;
  onAdd:any;
  
}
