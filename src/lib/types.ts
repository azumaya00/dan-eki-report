// 卦の基本情報
export interface HexBasic {
  id: number;
  name: string;
  trigramUpper: number; // 上卦（数値）
  trigramLower: number; // 下卦（数値）
  nameJa: string;
}

// 卦の拡張情報
export interface HexExtra {
  id: number;
  palace: string; // 宮名
  shiIndex: number; // 世爻の位置（1-6）
  yingIndex: number; // 応爻の位置（1-6）
  flags: string[]; // 六冲、六合、遊魂、帰魂など
}

// 納甲情報
export interface NaBranch {
  id: number;
  nameJa: string;
  upper: string; // 上卦
  lower: string; // 下卦
  branches: string[]; // 十二支（上爻→初爻の順）
}

// 五行対応
export interface Elements {
  branchElement: Record<string, string>; // 十二支→五行
}

// 六親の型
export type LiuQin = '兄弟' | '父母' | '子孫' | '妻財' | '官鬼';

// 卦の表示用データ
export interface HexView {
  id: number;
  name: string;
  lines: HexLine[];
  flags: string[];
  palace: string; // 宮名
}

// 各爻の情報
export interface HexLine {
  index: number; // 1-6（下から上）
  branch: string; // 支
  element: string; // 五行
  isShi: boolean; // 世爻かどうか
  isYing: boolean; // 応爻かどうか
  liuQin: LiuQin; // 六親
  fuShen: string; // 伏神（空文字の場合は表示なし）
}
