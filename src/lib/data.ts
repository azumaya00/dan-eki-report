import type { HexBasic, HexExtra, NaBranch, Elements } from './types';

// JSONファイルをインポート
import hexagramsBasic from '../../json/hexagrams.basic.json';
import hexagramsExtra from '../../json/hexagrams.extra.json';
import trigrams from '../../json/trigrams.json';
import naBranch from '../../json/na_branch.json';
import elements from '../../json/elements.json';

// 型付きでエクスポート
export const hexagramsBasicData: HexBasic[] = hexagramsBasic as HexBasic[];
export const hexagramsExtraData: HexExtra[] = hexagramsExtra as HexExtra[];
export const trigramsData = trigrams;
export const naBranchData: NaBranch[] = naBranch as NaBranch[];
export const elementsData: Elements = elements as Elements;

// 便利な関数
export function getHexBasic(id: number): HexBasic | undefined {
  return hexagramsBasicData.find(hex => hex.id === id);
}

export function getHexExtra(id: number): HexExtra | undefined {
  return hexagramsExtraData.find(hex => hex.id === id);
}

export function getNaBranch(id: number): NaBranch | undefined {
  return naBranchData.find(nb => nb.id === id);
}

export function getBranchElement(branch: string): string {
  return elementsData.branchElement[branch] || '不明';
}
