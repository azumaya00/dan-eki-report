<script lang="ts">
  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<main>
  <div class="container">
    <h1>Dan Eki Report</h1>
    <p>Vite + Svelte + TypeScript プロジェクト</p>

    <div class="counter">
      <button on:click={increment}>
        カウント: {count}
      </button>
    </div>

    <div class="info">
      <p>このプロジェクトは以下の技術スタックで構築されています：</p>
      <ul>
        <li>Vite - 高速なビルドツール</li>
        <li>Svelte - 軽量なフレームワーク</li>
        <li>TypeScript - 型安全なJavaScript</li>
        <li>ESLint + Prettier - コード品質とフォーマット</li>
      </ul>
    </div>
  </div>
</main>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  h1 {
    color: #646cff;
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .counter {
    margin: 2rem 0;
  }

  button {
    background: #646cff;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background 0.3s;
  }

  button:hover {
    background: #535bf2;
  }

  .info {
    text-align: left;
    background: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 2rem;
  }

  .info ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .info li {
    margin: 0.5rem 0;
  }
</style>
