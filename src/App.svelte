<script lang="ts">
  import Layout from './components/Layout.svelte';
  import { onMount } from 'svelte';
  import type { HexView } from './lib/types';
  import { getAllHexagrams } from './lib/logic/na';
  import { getHexView } from './lib/logic/na';

  let hexagrams: Array<{ id: number; name: string }> = [];
  let selectedHexId: number = 1;
  let hexView: HexView | null = null;
  let loading = false;

  onMount(async () => {
    try {
      hexagrams = await getAllHexagrams();
      if (hexagrams.length > 0) {
        selectedHexId = hexagrams[0].id;
        await loadHexView();
      }
    } catch (error) {
      console.error('卦データの読み込みに失敗しました:', error);
    }
  });

  async function loadHexView() {
    if (!selectedHexId) return;

    loading = true;
    try {
      hexView = getHexView(selectedHexId);
    } catch (error) {
      console.error('卦の表示データの取得に失敗しました:', error);
      hexView = null;
    } finally {
      loading = false;
    }
  }

  async function onHexChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    selectedHexId = parseInt(target.value);
    await loadHexView();
  }
</script>

<Layout>
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- メインカード -->
    <div class="card rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-3xl font-bold text-[var(--accent)] mb-6">
          卦のプレビュー - Dan Eki Report
        </h2>
        <p class="text-lg text-[var(--text-muted)] leading-relaxed">
          64卦の納甲情報を表示します。世爻・応爻の位置、六冲・六合・遊魂・帰魂などの特徴を確認できます。
        </p>
      </div>
    </div>

    <!-- 卦選択セクション -->
    <div class="card rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
      <div class="card-body">
        <h3 class="card-title text-2xl font-semibold text-[var(--text-primary)] mb-4">
          卦を選択
        </h3>
        <div class="form-control w-full max-w-md">
          <select
            bind:value={selectedHexId}
            on:change={onHexChange}
            class="select select-bordered w-full h-12 rounded-xl bg-[var(--surface)] border-[var(--border)] text-[var(--text-primary)]"
            disabled={loading}
          >
            {#each hexagrams as hex}
              <option value={hex.id}>{hex.id}: {hex.name}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- 卦の表示セクション -->
    {#if hexView}
      <div class="card rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
        <div class="card-body">
          <div class="flex justify-between items-start mb-6">
            <h3 class="card-title text-2xl font-semibold text-[var(--text-primary)]">
              {hexView.id}: {hexView.name}
            </h3>

            <!-- フラグバッジ -->
            {#if hexView.flags.length > 0}
              <div class="flex flex-wrap gap-2">
                {#each hexView.flags as flag}
                  <div class="badge badge-primary badge-lg text-[var(--text-primary)] bg-[var(--accent)]">
                    {flag}
                  </div>
                {/each}
              </div>
            {/if}
          </div>

          <!-- 納甲表 -->
          <div class="overflow-x-auto">
            <table class="table w-full font-mono">
              <thead>
                <tr class="border-b border-[var(--border)]">
                  <th class="text-[var(--text-primary)] text-center py-3">爻</th>
                  <th class="text-[var(--text-primary)] text-center py-3">支</th>
                  <th class="text-[var(--text-primary)] text-center py-3">五行</th>
                  <th class="text-[var(--text-primary)] text-center py-3">特徴</th>
                </tr>
              </thead>
              <tbody>
                {#each hexView.lines.slice().reverse() as line}
                  <tr class="border-b border-[var(--border)] hover:bg-[var(--surface)] transition-colors">
                    <td class="text-center py-3 text-[var(--text-primary)] font-medium">
                      {line.index}
                    </td>
                    <td class="text-center py-3 text-[var(--text-primary)] font-medium">
                      {line.branch}
                    </td>
                    <td class="text-center py-3 text-[var(--text-primary)] font-medium">
                      {line.element}
                    </td>
                    <td class="text-center py-3">
                      {#if line.isShi}
                        <span class="badge badge-accent text-[var(--text-primary)] bg-[var(--accent)]">
                          世
                        </span>
                      {:else if line.isYing}
                        <span class="badge badge-secondary text-[var(--text-primary)] bg-[var(--accent-2)]">
                          応
                        </span>
                      {:else}
                        <span class="text-[var(--text-muted)]">-</span>
                      {/if}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    {:else if loading}
      <div class="card rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
        <div class="card-body text-center">
          <span class="loading loading-spinner loading-lg text-[var(--accent)]"></span>
          <p class="text-[var(--text-muted)] mt-4">卦の情報を読み込み中...</p>
        </div>
      </div>
    {:else}
      <div class="card rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
        <div class="card-body text-center">
          <p class="text-[var(--text-muted)]">卦を選択してください</p>
        </div>
      </div>
    {/if}

    <!-- 説明カード -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
        <div class="card-body">
          <h3 class="card-title text-xl font-semibold text-[var(--accent)] mb-3">
            📊 納甲表示
          </h3>
          <p class="text-[var(--text-muted)]">
            下から上へ6つの爻を表示。各爻の支（十二支）と五行（金木水火土）を確認できます。
          </p>
        </div>
      </div>

      <div class="card rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
        <div class="card-body">
          <h3 class="card-title text-xl font-semibold text-[var(--accent-2)] mb-3">
            🎯 世応・特徴
          </h3>
          <p class="text-[var(--text-muted)]">
            世爻・応爻の位置を強調表示。六冲・六合・遊魂・帰魂などの特徴もバッジで表示します。
          </p>
        </div>
      </div>
    </div>
  </div>
</Layout>
