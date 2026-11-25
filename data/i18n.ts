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
      "Web・モバイル対応の宅配スクラップ回収＆リサイクルプラットフォーム — Mantiqh にて開発。",
    description: `**[EcoCrew](https://www.ecocrew.in)** は、家庭やオフィス向けの宅配スクラップ回収・リサイクルを透明かつ手軽にするインド発のサステナビリティ・プラットフォームです。

**Mantiqh** のソフトウェアエンジニアとして、**Webプラットフォーム**と**モバイルアプリ**の両方を担当。回収予約フロー、リアルタイムの買取レート表示、デジタル計量ワークフロー、現金＋**Eco-Coins**（アプリ内 Eco-Store で利用可能）のデュアル報酬システムを構築しました。`,
    contribution: "ソフトウェアエンジニア (Mantiqh)",
    extent: ["Web", "モバイル", "フロントエンド"],
  },
  "professional--keysonrent": {
    subtext:
      "家具付き賃貸・コリビング向けの不動産テック＆物件管理プラットフォーム — Mantiqh にて開発。",
    description: `**[KeysOnRent](https://www.keysonrent.com)** は、家具付きアパート・一戸建て・PG・コリビング物件の賃貸探しと物件管理をシンプルにするインドの不動産テック（Proptech）プラットフォームです。

**Mantiqh** のソフトウェアエンジニアとして、レスポンシブな物件検索、入居オンボーディング、物件管理インターフェースの開発に携わりました。`,
    contribution: "ソフトウェアエンジニア (Mantiqh)",
    extent: ["フロントエンド", "Web"],
  },
  "professional--weareskky": {
    subtext:
      "主要ECマーケットプレイスの運用管理・ブランド成長支援プラットフォーム — Mantiqh にて開発。",
    description: `**[WeAreSkky](https://www.weareskky.com)** は、ストア構築、商品リスティング最適化、広告運用、リスク・コンプライアンス管理、データ分析を通じてブランドのEC拡大を支援するプラットフォームです。

**Mantiqh** のソフトウェアエンジニアとして、WebエクスペリエンスおよびフロントエンドUIの実装を担当しました。`,
    contribution: "ソフトウェアエンジニア (Mantiqh)",
    extent: ["フロントエンド", "Web"],
  },
  "professional--nextgen-bullion": {
    subtext:
      "金・銀・プラチナ・パラジウムを扱うモダンな貴金属ECプラットフォーム — Mantiqh にて開発。",
    description: `**[NextGen Bullion](https://www.nextgenbullion.com)** は、金・銀・プラチナ・パラジウムのコインやインゴットを取り扱うモダンな貴金属ECプラットフォームです。透明性の高い価格表示、ポートフォリオ管理ツール、AIコンシェルジュによる購入サポートを備えています。

**Mantiqh** のソフトウェアエンジニアとして、ストアフロントおよびインタラクティブなフロントエンド体験の構築に貢献しました。`,
    contribution: "ソフトウェアエンジニア (Mantiqh)",
    extent: ["フロントエンド", "Web"],
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
