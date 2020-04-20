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

export interface Storage {
  channels: any[];
  theme: string;
  quickblock: boolean;
}

export interface ExportedData {
  version: string;
  storage: Storage;
}

export interface PossibleExportedData {
  version: string;
  storage: Partial<Storage>;
}
