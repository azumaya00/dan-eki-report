import type { HexBasic, HexExtra, NaBranch, Elements } from './types';
import { getLiuQin } from './logic/liu-qin';

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

// 宮名を取得（IDを8で割ったあまりで計算）
export function getPalaceName(hexId: number): string {
  const remainder = hexId % 8;
  
  // 1 乾, 2 兌, 3 離, 4 震, 5 巽, 6 坎, 7 艮, 0 坤
  const palaceMap: Record<number, string> = {
    1: '乾', 2: '兌', 3: '離', 4: '震', 
    5: '巽', 6: '坎', 7: '艮', 0: '坤'
  };
  
  return palaceMap[remainder] || '坤';
}

// データ統合レイヤー：idまたはnameJaでbasic/extra/na_branchを結合
export interface IntegratedHexData {
  id: number;
  nameJa: string;
  palace: string;
  palaceElement: string;
  branches: string[];
  elements: string[];
  relatives: string[]; // 六親の配列
}

/**
 * 統合された卦データを取得
 * @param hexId 卦のID
 * @returns 統合された卦データ
 */
export function getIntegratedHexData(hexId: number): IntegratedHexData | null {
  console.log('統合データ取得開始:', hexId);
  
  const basic = getHexBasic(hexId);
  if (!basic) {
    console.warn('基本データが見つかりません:', hexId);
    return null;
  }

  const extra = getHexExtra(hexId);
  if (!extra) {
    console.warn('拡張データが見つかりません:', hexId);
    return null;
  }

  const naBranch = getNaBranch(hexId);
  if (!naBranch) {
    console.warn('納甲データが見つかりません:', hexId);
    return null;
  }

  // extra.jsonから宮情報を取得
  if (!extra.palace) {
    console.warn(`卦ID ${hexId} (${basic.name}) に宮情報がありません`);
    return null;
  }

  console.log('取得したデータ:', { basic, extra, naBranch });

  // 宮の五行を取得
  const palaceElement = getPalaceElementFromTrigram(extra.palace);
  
  // branchesは「上爻→初爻」の順（UI行も上→下＝6→1に揃える）
  const branches = naBranch.branches;
  
  // 各爻の五行を計算
  const elements = branches.map(branch => getBranchElement(branch));
  
  // 六親を計算
  const relatives = elements.map(element => getLiuQin(element, palaceElement));

  const result = {
    id: basic.id,
    nameJa: basic.name,
    palace: extra.palace,
    palaceElement,
    branches,
    elements,
    relatives
  };

  console.log('統合結果:', result);
  return result;
}

/**
 * 八卦から五行を取得
 */
function getPalaceElementFromTrigram(trigram: string): string {
  const trigramToElement: Record<string, string> = {
    '乾': '金', '兌': '金', '離': '火', '震': '木',
    '巽': '木', '坎': '水', '艮': '土', '坤': '土'
  };
  return trigramToElement[trigram] || '土';
}
