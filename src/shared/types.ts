export type Mode = 'text' | 'regex';
export type Modifier = 'global' | 'caseInsensitive';
export type Theme = 'light' | 'dark';

export interface ChannelModifiers {
  caseInsensitive: boolean;
  global: boolean;
}

export interface Channel {
  mode: Mode;
  modifiers: ChannelModifiers;
  value: string;
}

export interface ExportedData {
  channels: Channel[];
  theme: Theme;
  quickblock: boolean;
}

export interface PossibleExportedData {
  channels?: any[];
  theme?: string;
  quickblock?: boolean;
}
