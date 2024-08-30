import { IDavesPivotItem } from "../models/IDavesPivotItem";

export interface IPivotProps {
  displayMode:number;
  description?: string;
  isDarkTheme?: boolean;
  environmentMessage?: string;
  hasTeamsContext?: boolean;
  userDisplayName?: string;
  tabs:IDavesPivotItem[];
  onDelete:any;
  onAdd:any;
}
