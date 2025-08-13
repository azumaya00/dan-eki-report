// 基本卦情報
export interface HexBasic {
  id: number;
  name: string;
  trigramUpper: number;
  trigramLower: number;
}

// 拡張卦情報
export interface HexExtra {
  id: number;
  shiIndex: number; // 世爻の位置（1-6）
  yingIndex: number; // 応爻の位置（1-6）
  flags: string[]; // 六冲、六合、遊魂、帰魂など
}

// 十二支情報（既存JSONの構造に合わせる）
export interface NaBranch {
  id: number;
  nameJa: string; // 日本語名
  upper: string; // 上卦
  lower: string; // 下卦
  branches: string[]; // 下から上への6つの支
}

// 五行情報（既存JSONの構造に合わせる）
export interface Elements {
  branchElement: Record<string, string>; // 支 → 五行のマッピング
}

// 卦の表示用データ
export interface HexView {
  id: number;
  name: string;
  lines: HexLine[];
  flags: string[];
}

// 各爻の情報
export interface HexLine {
  index: number; // 1-6（下から上）
  branch: string; // 支
  element: string; // 五行
  isShi: boolean; // 世爻かどうか
  isYing: boolean; // 応爻かどうか
}
