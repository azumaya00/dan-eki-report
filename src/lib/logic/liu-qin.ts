// 六親判定と伏神計算のロジック

export type LiuQin = '兄弟' | '父母' | '子孫' | '妻財' | '官鬼';

// 八卦→五行対応
const TRIGRAM_TO_ELEMENT: Record<string, string> = {
  '乾': '金', '兌': '金', '離': '火', '震': '木',
  '巽': '木', '坎': '水', '艮': '土', '坤': '土'
};

// 十二支→五行対応
const BRANCH_TO_ELEMENT: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火',
  '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 五行の相生相剋関係
const ELEMENT_RELATIONS = {
  '金': { generates: '水', overcomes: '木' },
  '木': { generates: '火', overcomes: '土' },
  '水': { generates: '木', overcomes: '火' },
  '火': { generates: '土', overcomes: '金' },
  '土': { generates: '金', overcomes: '水' }
};

// 宮（八卦）→純卦のnameJa（伏神探索に使う）
const PALACE_TO_PURE_HEX: Record<string, string> = {
  '乾': '乾為天', '坤': '坤為地', '震': '震為雷', '巽': '巽為風',
  '坎': '坎為水', '艮': '艮為山', '離': '離為火', '兌': '兌為沢'
};

/**
 * 五行から六親を判定
 * @param element 爻の五行
 * @param palaceElement 宮の五行
 * @returns 六親
 */
export function getLiuQin(element: string, palaceElement: string): LiuQin {
  if (element === palaceElement) return '兄弟';
  
  const relation = ELEMENT_RELATIONS[palaceElement as keyof typeof ELEMENT_RELATIONS];
  if (!relation) return '兄弟';
  
  if (relation.generates === element) return '子孫';
  if (relation.overcomes === element) return '妻財';
  
  // 逆方向の関係をチェック
  const reverseRelation = ELEMENT_RELATIONS[element as keyof typeof ELEMENT_RELATIONS];
  if (reverseRelation?.generates === palaceElement) return '父母';
  if (reverseRelation?.overcomes === palaceElement) return '官鬼';
  
  return '兄弟';
}

/**
 * 宮の五行を取得
 * @param upper 上卦
 * @param lower 下卦
 * @returns 宮の五行
 */
export function getPalaceElement(upper: string, lower: string): string {
  // 宮は下卦で決定される
  return TRIGRAM_TO_ELEMENT[lower] || '土';
}

/**
 * 宮名を取得（IDを8で割ったあまりで計算）
 * @param hexId 卦のID
 * @returns 宮名
 */
export function getPalaceName(hexId: number): string {
  const remainder = hexId % 8;
  
  // 1 乾, 2 兌, 3 離, 4 震, 5 巽, 6 坎, 7 艮, 0 坤
  const palaceMap: Record<number, string> = {
    1: '乾', 2: '兌', 3: '離', 4: '震', 
    5: '巽', 6: '坎', 7: '艮', 0: '坤'
  };
  
  return palaceMap[remainder] || '坤';
}

/**
 * 伏神を計算
 * @param hexId 卦のID
 * @param palaceName 宮名
 * @param existingLiuQin 本卦に存在する六親の配列
 * @param naBranchData 納甲データ
 * @returns 伏神の配列（6要素、伏神がない場合は空文字）
 */
export function calculateFuShen(
  hexId: number,
  palaceName: string,
  existingLiuQin: LiuQin[],
  naBranchData: any[]
): string[] {
  console.log('伏神計算開始:', { hexId, palaceName, existingLiuQin });
  
  const fuShen: string[] = new Array(6).fill('');
  
  // 宮の純卦のnameJaを取得
  const pureHexNameJa = PALACE_TO_PURE_HEX[palaceName];
  console.log('宮の純卦名:', pureHexNameJa);
  
  if (!pureHexNameJa) {
    console.warn('宮の純卦名が見つかりません:', palaceName);
    return fuShen;
  }
  
  // 宮の純卦の納甲データを探す
  const palaceHex = naBranchData.find(h => h.nameJa === pureHexNameJa);
  console.log('宮の純卦データ:', palaceHex);
  
  if (!palaceHex) {
    console.warn('宮の純卦の納甲データが見つかりません:', pureHexNameJa);
    return fuShen;
  }
  
  // 欠けている六親を特定（最大2種に限定）
  const allLiuQin: LiuQin[] = ['兄弟', '父母', '子孫', '妻財', '官鬼'];
  const missingLiuQin = allLiuQin.filter(lq => !existingLiuQin.includes(lq)).slice(0, 2);
  console.log('欠けている六親:', missingLiuQin);
  
  // 宮の純卦で欠けている六親の位置を特定
  missingLiuQin.forEach(missingLq => {
    // 宮の五行を取得（宮名から直接取得）
    const palaceElement = TRIGRAM_TO_ELEMENT[palaceName];
    console.log('宮の五行:', palaceElement);
    
    // 宮の純卦の各爻で六親を計算（六親表示と同じロジックを使用）
    for (let i = 0; i < 6; i++) {
      const branch = palaceHex.branches[i];
      const element = BRANCH_TO_ELEMENT[branch];
      const liuQin = getLiuQin(element, palaceElement);
      
      console.log(`宮の純卦 ${i}爻:`, { branch, element, liuQin, target: missingLq });
      
      if (liuQin === missingLq) {
        // 伏神を表示（十二支＋五行＋半角スペース＋六親）
        // 位置iは上から下の順序（6→1）なので、そのまま使用
        fuShen[i] = `${branch}${element} ${liuQin}`;
        console.log(`伏神を設定: 位置${i} = ${fuShen[i]}`);
        break; // 1つの六親につき1つの伏神のみ
      }
    }
  });
  
  console.log('最終的な伏神配列:', fuShen);
  return fuShen;
}
