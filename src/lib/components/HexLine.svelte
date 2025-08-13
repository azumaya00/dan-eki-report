<script lang="ts">
  // props: yang=true(陽=実線), false(陰=中抜き), height/widthは任意調整
  export let yang: boolean = true;
  export let height = 8;     // px - テーブルに適したサイズ
  export let lineWidth = 16; // 各線の幅（px）
  export let gap = 3;        // 陰の2本線の間隔（px）
</script>

{#if yang}
  <!-- 陽：実線 -->
  <div class="rounded-sm bg-[var(--text-primary)] opacity-90"
       style={`height:${height}px; width:${lineWidth * 2 + gap}px;`}></div>
{:else}
  <!-- 陰：横に2本の線が並んだ形（- -） -->
  <div class="flex items-center justify-center"
       style={`height:${height}px; width:${lineWidth * 2 + gap}px; gap:${gap}px;`}>
    <div class="rounded-sm bg-[var(--text-primary)] opacity-90"
         style={`height:${height}px; width:${lineWidth}px;`}></div>
    <div class="rounded-sm bg-[var(--text-primary)] opacity-90"
         style={`height:${height}px; width:${lineWidth}px;`}></div>
  </div>
{/if}

<style>
  /* テーブルセルの最小幅を設定 */
  :global(.hexline-cell) { 
    min-width: 60px; 
    max-width: 80px;
  }
</style>
