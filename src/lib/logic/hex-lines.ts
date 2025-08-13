// 下→上の6本を true(陽) / false(陰) で返す。八卦→三本線の定義は一般的なものを使用。
export type HexBasic = { id: number; nameJa: string; upper: string; lower: string };

const TRIGRAM_TO_BITS: Record<string, [boolean, boolean, boolean]> = {
  "乾": [true, true, true],
  "兌": [true, true, false],
  "離": [true, false, true],
  "震": [true, false, false],
  "巽": [false, true, true],
  "坎": [false, true, false],
  "艮": [false, false, true],
  "坤": [false, false, false],
};

// 下卦(1..3) + 上卦(4..6) = 下→上 の配列で返す
export function hexLinesFromTrigrams(hex: HexBasic): boolean[] {
  const lower = TRIGRAM_TO_BITS[hex.lower];
  const upper = TRIGRAM_TO_BITS[hex.upper];
  if (!lower || !upper) throw new Error(`未知の八卦: lower=${hex.lower}, upper=${hex.upper}`);
  return [...lower, ...upper];
}
