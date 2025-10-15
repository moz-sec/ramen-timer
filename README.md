# ラーメンタイマー

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tauri](https://img.shields.io/badge/Tauri-FFC131?style=flat&logo=tauri&logoColor=black)](https://tauri.app/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

複数のラーメンを同時に管理できるタイマーアプリケーションです。

Web版とデスクトップアプリ版があります。

## 使用技術

- React 19 - UI
- TypeScript - 型安全な開発
- Vite - ビルド
- Tailwind CSS - スタイリング
- Radix UI - UIコンポーネント
- Lucide React - アイコン

## 機能

### タイマー

- 複数タイマー - 複数のラーメンを管理
- 正確な時間計測 - ミリ秒精度での時間管理
- 一時停止・再開 - タイマーの一時停止と再開機能
- リセット - タイマーの初期状態へのリセット

### 通知

- 音声通知 - タイマー完了時の音声アラート
- デスクトップ通知 - システム通知
- バイブレーション - モバイルデバイスでの振動通知

### データ管理

- 自動保存 - localStorage によるタイマー状態の永続化
- データ検証 - 保存データの整合性チェック
- 自動クリーンアップ - 完了済みタイマーの自動削除

## 開発環境のセットアップ

### 前提条件

- Node.js (v18以上) または Bun (v1.0以上)
- Rust (最新版)

### 1. リポジトリのクローン

```bash
git clone https://github.com/your-username/ramen-timer.git
cd ramen-timer
```

### 2. 依存関係のインストール

```bash
# Bunを使用する場合（推奨）
bun install

# または npm を使用する場合
npm install
```

### 3. Tauriの依存関係をインストール

```bash
# Rustツールチェーンをインストール
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# システムの更新
rustup update

# Tauri CLIをインストール
cargo install tauri-cli
```

### 4. 開発サーバーの起動

```bash
# Webアプリケーションと開発
bun run dev

# デスクトップアプリケーション開発
bun run tauri dev
```

### 5. ビルド

```bash
# Webアプリケーションのビルド
bun run build

# デスクトップアプリケーションのビルド
bun run tauri build
```

## 使用方法

1. プリセットタイマーの使用
   - 画面上部のプリセットボタン（3分、4分、5分、30秒）をクリック

2. カスタムタイマーの追加
   - 「カスタムタイマーを追加」ボタンをクリック
   - 分と秒を入力してタイマーを作成

3. タイマーの操作
   - 一時停止/再開: タイマーカードの「一時停止」/「再開」ボタン
   - リセット: リセットボタン（⟲）でタイマーを初期状態に戻す
   - 削除: タイマーカード右上の「✕」ボタンで削除

4. 完了通知
   - タイマー完了時に音声、デスクトップ通知、バイブレーションが発生
   - 完了したタイマーは5分後に自動削除

## 利用可能なスクリプト

```bash
bun run dev          # 開発サーバー起動
bun run build        # プロダクションビルド
bun run preview      # ビルド結果のプレビュー
bun run tauri dev    # Tauri開発モード
bun run tauri build  # Tauriアプリビルド
```
