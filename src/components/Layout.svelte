<script lang="ts">
  import { onMount } from 'svelte';
  
  let currentTheme = 'daneki-dark';
  
  onMount(() => {
    // ローカルストレージからテーマを取得
    const savedTheme = localStorage.getItem('daneki-theme');
    if (savedTheme) {
      currentTheme = savedTheme;
      document.documentElement.setAttribute('data-theme', currentTheme);
    } else {
      // デフォルトはダークテーマ
      document.documentElement.setAttribute('data-theme', 'daneki-dark');
    }
  });
  
  function toggleTheme() {
    currentTheme = currentTheme === 'daneki-dark' ? 'daneki-light' : 'daneki-dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('daneki-theme', currentTheme);
  }
</script>

<div class="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-300">
  <!-- ヘッダー -->
  <header class="bg-[var(--surface)] border-b border-[var(--border)] shadow-sm">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-[var(--accent)]">Dan Eki Report</h1>
      
      <!-- テーマ切替ボタン -->
      <button 
        on:click={toggleTheme}
        class="btn btn-circle btn-ghost border border-[var(--border)] min-w-[3.5rem] min-h-[3.5rem] flex items-center justify-center p-1 transition-all duration-200"
        class:text-[var(--text-primary)]={true}
        class:bg-[var(--surface)]={currentTheme === 'daneki-light'}
        class:bg-[var(--card)]={currentTheme === 'daneki-dark'}
        class:hover:bg-[var(--card)]={currentTheme === 'daneki-dark'}
        class:hover:bg-[var(--border)]={currentTheme === 'daneki-light'}
        title="テーマ切替"
      >
        {#if currentTheme === 'daneki-dark'}
          <!-- 太陽アイコン（ダークテーマ時） -->
          <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
          </svg>
        {:else}
          <!-- 月アイコン（ライトテーマ時） -->
          <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
          </svg>
        {/if}
        
        <!-- フォールバック用テキストアイコン（SVGが表示されない場合） -->
        <span class="text-xs font-bold sr-only">
          {currentTheme === 'daneki-dark' ? '☀️' : '🌙'}
        </span>
      </button>
    </div>
  </header>

  <!-- メインコンテンツ -->
  <main class="container mx-auto px-4 py-8">
    <slot />
  </main>

  <!-- フッター -->
  <footer class="bg-[var(--surface)] border-t border-[var(--border)] mt-auto">
    <div class="container mx-auto px-4 py-6 text-center text-[var(--text-muted)]">
      <p>&copy; 2024 Dan Eki Report. All rights reserved.</p>
    </div>
  </footer>
</div>
