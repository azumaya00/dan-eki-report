import type { HexView, HexLine } from '../types';
import { getHexBasic, getHexExtra, getNaBranch, getBranchElement } from '../data';

/**
 * 卦の表示用データを取得
 * @param hexId 卦のID
 * @returns 卦の表示用データ
 */
export function getHexView(hexId: number): HexView | null {
  // 基本情報を取得
  const hexBasic = getHexBasic(hexId);
  if (!hexBasic) return null;

  // 拡張情報を取得
  const hexExtra = getHexExtra(hexId);
  if (!hexExtra) return null;

  // 納甲情報を取得
  const naBranch = getNaBranch(hexId);
  if (!naBranch) return null;

  // 6行のデータを生成（下から上）
  const lines: HexLine[] = naBranch.branches.map((branch, i) => {
    const index = i + 1; // 1-6
    const element = getBranchElement(branch);
    const isShi = index === hexExtra.shiIndex;
    const isYing = index === hexExtra.yingIndex;

    return {
      index,
      branch,
      element,
      isShi,
      isYing
    };
  });

  return {
    id: hexBasic.id,
    name: hexBasic.name,
    lines,
    flags: hexExtra.flags || []
  };
}

/**
 * 全64卦の基本情報を取得
 * @returns 全卦の基本情報
 */
export async function getAllHexagrams() {
  const { hexagramsBasicData } = await import('../data');
  return hexagramsBasicData;
}
