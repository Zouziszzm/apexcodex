import type { Locale } from "@/app/contexts/LocaleContext";

export const UI_COPY: Record<
  Locale,
  {
    namePrefix: string;
    name: string;
    voxelTitle: string;
    voxelSubtitle: string;
    experienceHeading: string;
    yearsUnit: (years: string) => string;
    pastExperience: string;
    showPastExperience: string;
    hidePastExperience: string;
    projectsHeading: string;
    allProjectsTitle: string;
    allProjectsSubtitle: string;
    projectsPageSection: string;
    viewAllProjects: string;
    stacksCount: (count: number) => string;
    breadcrumbHome: string;
    breadcrumbProjects: string;
    contactHeading: string;
    contactMessage: string;
    footerMadeBy: string;
    footerRights: (year: number) => string;
    liveSite: string;
    dateLabel: string;
    contributedToLabel: string;
    contributionLabel: string;
    extentLabel: string;
    stackLabel: string;
    technicalDetails: string;
    istTitle: string;
  }
> = {
  en: {
    namePrefix: "I am",
    name: "Alfarhaankhan Inamdar",
    voxelTitle: "Heart of the Forest — ",
    voxelSubtitle: "A quiet spirit wandering the deep woods.",
    experienceHeading: "01 Experience",
    yearsUnit: (years) => `${years} Years`,
    pastExperience: "Past Experience",
    showPastExperience: "Show past experience",
    hidePastExperience: "Hide past experience",
    projectsHeading: "02 Projects",
    allProjectsTitle: "All Projects",
    allProjectsSubtitle: "Every stack and contribution — grouped by technology.",
    projectsPageSection: "Projects",
    viewAllProjects: "View all projects",
    stacksCount: (count) => `(${count} stacks)`,
    breadcrumbHome: "Home",
    breadcrumbProjects: "Projects",
    contactHeading: "03 Contact",
    contactMessage:
      "If something here resonates, please reach out! I'd love to connect :)",
    footerMadeBy: "Made with caffeine and happy vibes by Farhaan.",
    footerRights: (year) =>
      `Copyright © ${year} alfarhaankhan. All rights reserved.`,
    liveSite: "Live Site",
    dateLabel: "Date",
    contributedToLabel: "Contributed to",
    contributionLabel: "Contribution",
    extentLabel: "Extent",
    stackLabel: "Stack",
    technicalDetails: "Technical details",
    istTitle: "India Standard Time",
  },
  jp: {
    namePrefix: "私は",
    name: "アルファルハーンカーン・イナムダール",
    voxelTitle: "森の心 — ",
    voxelSubtitle: "深い森を静かにさまよう小さな精霊。",
    experienceHeading: "01 職務経歴",
    yearsUnit: (years) => `${years} 年`,
    pastExperience: "過去の経歴",
    showPastExperience: "過去の経歴を表示",
    hidePastExperience: "過去の経歴を閉じる",
    projectsHeading: "02 プロジェクト",
    allProjectsTitle: "すべてのプロジェクト",
    allProjectsSubtitle: "技術スタック・分野ごとにまとめた制作実績とコントリビューション。",
    projectsPageSection: "プロジェクト一覧",
    viewAllProjects: "すべてのプロジェクトを見る",
    stacksCount: (count) => `(${count} カテゴリ)`,
    breadcrumbHome: "ホーム",
    breadcrumbProjects: "プロジェクト",
    contactHeading: "03 お問い合わせ",
    contactMessage:
      "少しでも興味を持っていただけたら、ぜひお気軽にご連絡ください！お話しできるのを楽しみにしています :)",
    footerMadeBy: "カフェインとハッピーな気持ちを込めて、Farhaan が制作しました。",
    footerRights: (year) =>
      `Copyright © ${year} alfarhaankhan. All rights reserved.`,
    liveSite: "サイトを見る",
    dateLabel: "時期",
    contributedToLabel: "コントリビュート先",
    contributionLabel: "役割",
    extentLabel: "担当範囲",
    stackLabel: "技術スタック",
    technicalDetails: "技術的な詳細",
    istTitle: "インド標準時",
  },
};

export const GROUP_LABELS_JP: Record<string, string> = {
  professional: "実務プロジェクト",
  opensource: "オープンソース",
  rust: "Rust",
  typescript: "TypeScript",
  tauri: "Tauri",
  flutter: "Flutter",
};

export const JOB_TRANSLATIONS_JP: Record<
  string,
  {
    company?: string;
    position?: string;
    dateRange?: string;
    roles?: { position: string; dateRange: string }[];
  }
> = {
  Mantiqh: {
    position: "ソフトウェアエンジニア",
    dateRange: "2025年2月 - 現在",
  },
  NDTCCS: {
    position: "品質保証インスペクター（ドキュメント担当）",
    dateRange: "2024年9月 - 2025年2月",
  },
  "Freelance Developer": {
    company: "フリーランス開発",
    position: "フリーランス / 個人事業",
    dateRange: "2023年6月 - 2024年8月",
  },
  "Power Store E-Com Pvt Ltd": {
    roles: [
      {
        position: "フロントエンドエンジニア",
        dateRange: "2023年3月 - 2023年5月",
      },
      {
        position: "フロントエンド開発インターン",
        dateRange: "2022年8月 - 2023年2月",
      },
    ],
  },
};

export const PROJECT_TRANSLATIONS_JP: Record<
  string,
  {
    subtext: string;
    description?: string;
    contribution?: string;
    extent?: string[];
  }
> = {
  "professional--ecocrew": {
    subtext:
      "管理画面・LP・React Nativeモバイルの中核開発を担当。JSX→TypeScriptおよびAnt Design→Tailwind移行を主導。",
    description: `### 概要

**[EcoCrew](https://www.ecocrew.in)** は、家庭やオフィス向けの宅配スクラップ回収・リサイクルを透明かつ手軽にするインド発のサステナビリティ・プラットフォームです。

### 担当・貢献

プロダクト全体の中核開発者（Core Developer）として以下を担当しました：

- **管理画面 & ランディングページ** — 運用向け管理ダッシュボードと公開LPを構築・保守。
- **TypeScript & Tailwind 移行** — Webダッシュボードを **JSX + Ant Design** から **TypeScript + Tailwind CSS** へ移行し、保守性の高い設計へ刷新。
- **マップ & 対応エリア設定** — 回収可能なサービスエリアをマップ上で区画割り・管理する機能を実装。
- **モバイルアプリ** — **React Native** でアプリUI・機能（ナビゲーションメニューや不具合修正など）を開発。

### アーキテクチャ

- **Web / 管理画面:** React + Vite（JSX / Ant Design から **TypeScript + Tailwind CSS** へ移行）。
- **モバイルアプリ:** iOS / Android 対応の **React Native** アプリ。
- **地図・エリア管理:** ポリゴン区画による対応エリア割り当てを行うインタラクティブマップ。

### 技術的課題

- **マップ上のエリア境界アラインメント:** 実際のサービス提供地域とズレや重複が出ないよう、マップ上でエリアを正確に区画割り・割り当てするUIとロジックの設計。
- **段階的マイグレーション:** 稼働中の JSX + Ant Design 基盤を止めずに TypeScript + Tailwind CSS へ移行。

### 成果

- 型安全性の導入によりバグを削減し、新機能の追加やアップグレードが容易なアーキテクチャを確立しました。`,
    contribution: "コア開発者 (Mantiqh)",
    extent: ["管理画面", "モバイルアプリ", "マップ", "TS移行"],
  },
  "professional--keysonrent": {
    subtext:
      "Next.jsでの地域・マップ検索ロジックと、React Nativeでの物件詳細UIをWeb・モバイル両面で開発。",
    description: `### 概要

**[KeysOnRent](https://www.keysonrent.com)** は、家具付きアパート・一戸建て・PG・コリビング物件の賃貸探しと物件管理をシンプルにするインドの不動産テック（Proptech）プラットフォームです。

### 担当・貢献

**Next.js Webサイト**と**React Nativeモバイルアプリ**の両方を担当：

- **地域・マップ検索エンジン** — エリア名やマップ範囲に応じた検索条件・フィルタリングロジックを担当。
- **モバイル物件詳細UI** — React Native でアパート・物件の詳細画面、閲覧ペイン、および各種バグ修正を実装。

### アーキテクチャ

- **Webプラットフォーム:** **Next.js** による地域検索とマップ連動フィルタリング。
- **モバイルアプリ:** **React Native** による物件閲覧・詳細表示UI。

### 技術的課題

- **最近傍（Nearest-Neighbor）検索アルゴリズム:** 地域名やマップ範囲に基づく検索パラメータで、最も近い条件・立地の物件を的確に返す検索アルゴリズムの設計と調整。

### 成果

- Webとモバイル間で一貫した高速な地域検索とスムーズな物件閲覧体験を実現しました。`,
    contribution: "ソフトウェアエンジニア (Mantiqh)",
    extent: ["Web検索", "モバイルUI", "検索アルゴリズム"],
  },
  "professional--weareskky": {
    subtext:
      "リード開発者として、Vite + Three.js 製の全サイトと3Dカルーセルを3日間で構築・公開。",
    description: `### 概要

**[WeAreSkky](https://www.weareskky.com)** は、ストア構築、商品リスティング最適化、広告運用、リスク管理、分析を通じてブランドのEC拡大を支援するプラットフォームです。

### 担当・貢献

**リード開発者**として設計から実装まで全工程を担当し、厳しい納期の中で**3日間でサイト全体を構築・納品**しました：

- **サイト全体の開発** — 短期納期のクライアント案件として全セクションの設計・実装を主導。
- **Three.js 3Dカルーセル** — **Three.js** のみで滑らかに動作するカスタム3Dカルーセルコンポーネントを開発。

### アーキテクチャ

- **フロントエンド基盤:** **Vite** + **React** + **TypeScript** による高速な開発と軽量バンドル。
- **3Dモーション:** 外部カルーセルライブラリに頼らない純粋な **Three.js** レンダリングパイプライン。

### 技術的課題

- **3日間の超短期納期とWebGL品質の両立:** 72時間というタイトなスケジュールの中で、各デバイスで滑らかに動作する Three.js カルーセルとサイト全体を完成させること。

### 成果

- **3日間で予定通り本番公開**を達成し、滑らかな3Dカルーセル体験を提供しました。`,
    contribution: "リード開発者 (Mantiqh)",
    extent: ["サイト全体", "Three.js 3D", "設計"],
  },
  "professional--nextgen-bullion": {
    subtext:
      "Next.js製5アプリ（ストア3＋管理画面2）のフロントエンドリード。高セキュリティな貴金属売買・カート・決済を構築。",
    description: `### 概要

**[NextGen Bullion](https://www.nextgenbullion.com)** は、金・銀・プラチナ・パラジウムのコインやインゴットを取り扱う高セキュリティな貴金属ECプラットフォームです。

### 担当・貢献

**フロントエンドリード**として、フロントエンド開発チームを率いながら **計5つのアプリ（顧客向けストア3サイト＋管理画面2つ）** の開発を統括：

- **開発リード & 設計統括** — 5つの Next.js アプリ全体のフロントエンド設計・コードレビューを主導。
- **売買・カート・チェックアウト** — 高額な貴金属取引における売却フロー、カート、決済プロセスの中核を実装。
- **管理パネル構築** — 2つの社内管理ダッシュボードの主要機能を開発。

### アーキテクチャ

- **マルチアプリ構成:** **Next.js** + **TypeScript** による **3ストアフロント + 2管理パネル** の統合基盤。
- **取引整合性:** 貴金属の売却・カート・チェックアウト状態における厳格なバリデーションとセキュリティ境界。

### 技術的課題

- **高セキュリティな売買・決済フローとチーム統括:** 高額資産を扱うECに求められる堅牢な売買・カート・決済ロジックを構築しつつ、5つの連動アプリ全体で品質と開発速度を維持すること。

### 成果

- フロントエンドリードとして **3つのストアと2つの管理画面** を安定稼働させ、安全な売買・決済体験を実現しました。`,
    contribution: "フロントエンドリード (Mantiqh)",
    extent: ["5アプリ統括", "カート・決済", "管理画面"],
  },
  "opensource--gogen": {
    subtext:
      "Go Fiber & Gin 向け CRUD 自動生成 CLI — TUI・命名規則・ドキュメントのメンテナー＆共同制作者。",
    contribution: "メンテナー & 共同制作者",
    extent: ["コントリビュート"],
  },
  "opensource--kana-dojo": {
    subtext:
      "オープンソースの日本語学習プラットフォーム — テーマ・漢字データ・名言・豆知識を追加。",
    contribution: "コントリビューター",
    extent: ["コントリビュート"],
  },
  "opensource--centralized-logger-web": {
    subtext:
      "集中ログ管理Webフロントエンド — モバイル表示時のナビバー重なり順（z-index）とレスポンシブUIを修正。",
    contribution: "コントリビューター",
    extent: ["コントリビュート"],
  },
  "opensource--response-helper": {
    subtext:
      "バックエンドAPIレスポンスのクライアント側パースを共通化する軽量 npm ユーティリティ。",
    contribution: "コントリビューター",
    extent: ["コントリビュート"],
  },
};
