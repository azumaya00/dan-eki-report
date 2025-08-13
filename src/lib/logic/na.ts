import type { HexView, HexLine } from '../types';
import { getHexExtra, getIntegratedHexData } from '../data';
import { calculateFuShen } from './liu-qin';

/**
 * 卦の表示用データを取得
 * @param hexId 卦のID
 * @returns 卦の表示用データ
 */
export async function getHexView(hexId: number): Promise<HexView | null> {
  // 統合されたデータを取得
  const integratedData = getIntegratedHexData(hexId);
  if (!integratedData) return null;

  // 拡張情報を取得（世爻・応爻・フラグ用）
  const hexExtra = getHexExtra(hexId);
  if (!hexExtra) return null;

  // branchesとelementsを逆順にして、爻の番号（6→1）と対応させる
  const reversedBranches = [...integratedData.branches].reverse();
  const reversedElements = [...integratedData.elements].reverse();
  const reversedRelatives = [...integratedData.relatives].reverse();

  // 6行のデータを生成（上から下：6→1）
  const lines: HexLine[] = reversedBranches.map((branch, i) => {
    const index = 6 - i; // 6, 5, 4, 3, 2, 1（上から下）
    const element = reversedElements[i];
    const isShi = index === hexExtra.shiIndex;
    const isYing = index === hexExtra.yingIndex;
    const liuQin = reversedRelatives[i] as any;

    return {
      index,
      branch,
      element,
      isShi,
      isYing,
      liuQin,
      fuShen: '' // 後で計算
    };
  });

  // 伏神を計算
  const existingLiuQin = lines.map(line => line.liuQin);
  
  // 全納甲データを取得して伏神計算に使用
  const { naBranchData } = await import('../data');
  const fuShenArray = calculateFuShen(hexId, integratedData.palace, existingLiuQin, naBranchData);
  
  console.log('伏神計算結果:', fuShenArray);
  
  // 伏神を各行に設定
  lines.forEach((line, i) => {
    // linesは6→1の順序（上から下）、fuShenArrayは上爻→初爻の順序
    // 位置を合わせるために、fuShenArrayの順序を調整
    const fuShenIndex = 5 - i; // 0→5, 1→4, 2→3, 3→2, 4→1, 5→0
    line.fuShen = fuShenArray[fuShenIndex] || '';
    console.log(`行${i}（爻${line.index}）に伏神を設定: "${line.fuShen}" (fuShenArray[${fuShenIndex}])`);
  });

  return {
    id: integratedData.id,
    name: integratedData.nameJa,
    lines,
    flags: hexExtra.flags || [],
    palace: integratedData.palace
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
