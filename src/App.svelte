<script lang="ts">
  import Layout from './components/Layout.svelte';
  import HexLine from './lib/components/HexLine.svelte';
  import { onMount } from 'svelte';
  import type { HexView } from './lib/types';
  import { getAllHexagrams, getHexView } from './lib/logic/na';
  import { hexLinesFromTrigrams } from './lib/logic/hex-lines';
  import { getNaBranch } from './lib/data';

  let hexagrams: any[] = [];
  let selectedHexId: number | null = null;
  let hexView: HexView | null = null;
  let hexLines: boolean[] = [];
  let loading = false;

  onMount(async () => {
    try {
      hexagrams = await getAllHexagrams();
      console.log('全64卦を読み込みました:', hexagrams.length);
    } catch (error) {
      console.error('卦データの読み込みに失敗しました:', error);
    }
  });

  async function loadHexView() {
    if (!selectedHexId) return;

    loading = true;
    try {
      console.log('選択された卦ID:', selectedHexId);
      
      hexView = await getHexView(selectedHexId);
      console.log('hexView:', hexView);
      
      if (hexView) {
        // 陰陽の配列を取得
        const naBranchData = getNaBranch(selectedHexId);
        console.log('naBranchData:', naBranchData);
        
        if (naBranchData) {
          // na_branch.jsonの構造を使用して陰陽を生成
          const basicData = {
            id: naBranchData.id,
            nameJa: naBranchData.nameJa,
            upper: naBranchData.upper,
            lower: naBranchData.lower
          };
          console.log('basicData:', basicData);
          
          hexLines = hexLinesFromTrigrams(basicData);
          console.log('hexLines:', hexLines);
        }
      }
    } catch (error) {
      console.error('卦の表示データの取得に失敗しました:', error);
      hexView = null;
      hexLines = [];
    } finally {
      loading = false;
    }
  }
</script>

<Layout>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8 text-[var(--text-primary)]">
      六十四卦プレビュー
    </h1>

    <!-- 卦選択 -->
    <div class="mb-8">
      <label for="hexSelect" class="block text-sm font-medium text-[var(--text-primary)] mb-2">
        卦を選択してください
      </label>
      <select
        id="hexSelect"
        bind:value={selectedHexId}
        on:change={loadHexView}
        class="w-full max-w-md px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      >
        <option value={null}>卦を選択してください</option>
        {#each hexagrams as hex}
          <option value={hex.id}>{hex.id}: {hex.name}</option>
        {/each}
      </select>
    </div>

    <!-- 卦の表示 -->
    {#if loading}
      <div class="text-center py-8">
        <div class="loading loading-spinner loading-lg text-[var(--accent)]"></div>
        <p class="mt-4 text-[var(--text-muted)]">読み込み中...</p>
      </div>
    {:else if hexView}
      <div class="space-y-6">
        <!-- 卦名とフラグ -->
        <div class="card rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6 shadow-lg">
          <h2 class="text-2xl font-bold text-[var(--text-primary)] mb-4">
            {hexView.name} ({hexView.palace}宮)
          </h2>
          {#if hexView.flags.length > 0}
            <div class="flex flex-wrap gap-2">
              {#each hexView.flags as flag}
                <span class="badge badge-accent text-[var(--text-primary)] bg-[var(--accent)]">
                  {flag}
                </span>
              {/each}
            </div>
          {/if}
        </div>

        <!-- 爻の表 -->
        <div class="card rounded-2xl bg-[var(--card)] border border-[var(--border)] p-4 md:p-6 shadow-lg overflow-x-auto">
          <div class="min-w-full">
            <table class="w-full table-auto">
              <thead>
                <tr class="border-b border-[var(--border)]">
                  <th class="text-center py-3 px-2 md:px-4 text-[var(--text-primary)] font-semibold text-sm md:text-base w-16 md:w-20">伏神</th>
                  <th class="text-center py-3 px-2 md:px-4 text-[var(--text-primary)] font-semibold text-sm md:text-base w-12 md:w-16">爻</th>
                  <th class="text-center py-3 px-2 md:px-4 text-[var(--text-primary)] font-semibold text-sm md:text-base w-16 md:w-20">陰陽</th>
                  <th class="text-center py-3 px-2 md:px-4 text-[var(--text-primary)] font-semibold text-sm md:text-base w-16 md:w-20">十二支</th>
                  <th class="text-center py-3 px-2 md:px-4 text-[var(--text-primary)] font-semibold text-sm md:text-base w-16 md:w-20">五行</th>
                  <th class="text-center py-3 px-2 md:px-4 text-[var(--text-primary)] font-semibold text-sm md:text-base w-16 md:w-20">六親</th>
                  <th class="text-center py-3 px-2 md:px-4 text-[var(--text-primary)] font-semibold text-sm md:text-base w-16 md:w-24">特徴</th>
                </tr>
              </thead>
              <tbody>
                {#each hexView.lines as line}
                  <tr class="border-b border-[var(--border)] hover:bg-[var(--surface)] transition-colors">
                    <td class="text-center py-3 px-2 md:px-4 text-[var(--accent-2)] font-medium text-xs md:text-sm">
                      {#if line.fuShen}
                        <span class="whitespace-nowrap">{line.fuShen}</span>
                      {:else}
                        &nbsp;
                      {/if}
                    </td>
                    <td class="text-center py-3 px-2 md:px-4 text-[var(--text-primary)] font-medium text-sm md:text-base">
                      {line.index}
                    </td>
                    <td class="text-center py-3 px-2 md:px-4">
                      <div class="flex justify-center">
                        <HexLine yang={hexLines[line.index - 1]} />
                      </div>
                    </td>
                    <td class="text-center py-3 px-2 md:px-4 text-[var(--text-primary)] font-medium text-sm md:text-base">
                      {line.branch}
                    </td>
                    <td class="text-center py-3 px-2 md:px-4 text-[var(--text-primary)] font-medium text-sm md:text-base">
                      {line.element}
                    </td>
                    <td class="text-center py-3 px-2 md:px-4 text-[var(--text-primary)] font-medium text-sm md:text-base">
                      {line.liuQin}
                    </td>
                    <td class="text-center py-3 px-2 md:px-4">
                      {#if line.isShi}
                        <span class="badge badge-accent text-[var(--text-primary)] bg-[var(--accent)] text-xs">
                          世
                        </span>
                      {:else if line.isYing}
                        <span class="badge badge-secondary text-[var(--text-primary)] bg-[var(--accent-2)] text-xs">
                          応
                        </span>
                      {:else}
                        <span class="text-[var(--text-muted)] text-xs">-</span>
                      {/if}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    {:else if selectedHexId}
      <div class="text-center py-8">
        <p class="text-[var(--text-muted)]">卦を選択してください</p>
      </div>
    {/if}

    <!-- 説明カード -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
      <div class="card rounded-2xl bg-[var(--card)] border border-[var(--border)] p-4 md:p-6 shadow-lg">
        <h3 class="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-2 md:mb-3">六親について</h3>
        <p class="text-[var(--text-muted)] leading-relaxed text-sm md:text-base">
          六親は、宮の五行と各爻の五行の関係から決まります。兄弟・父母・子孫・妻財・官鬼の5種類があり、相生相剋の関係で判定されます。
        </p>
      </div>
      
      <div class="card rounded-2xl bg-[var(--card)] border border-[var(--border)] p-4 md:p-6 shadow-lg">
        <h3 class="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-2 md:mb-3">伏神について</h3>
        <p class="text-[var(--text-muted)] leading-relaxed text-sm md:text-base">
          伏神は、本卦に存在しない六親を宮の純卦から探して表示します。最大2つまで表示され、各爻の左側に「十二支＋五行＋六親」の形式で表示されます。
        </p>
      </div>
    </div>
  </div>
</Layout>

<style>
  :global(.hexline-cell) { min-width: 72px; }
</style>
