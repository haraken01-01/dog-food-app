# 犬の食事量・手作りトッピング支援 MVP

健康な成犬向けの一般的な食事量・トッピング支援ツールです。1日の推定カロリー、主食フード、手作り食材・トッピングのカロリーと主要栄養素、危険食材や偏りの注意を確認できます。

このアプリは診断、治療、療法食設計を行いません。完全手作り食の栄養バランスも保証しません。計算値は開始目安として扱い、体重、体型、便、食欲を見て調整してください。持病、療法食、子犬、妊娠・授乳期の場合は獣医師に相談してください。

## 起動方法

```powershell
cd C:\Users\harak\Documents\chatpy\dog-food-app
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## デプロイ

`main` ブランチにpushすると、GitHub Actionsで静的ビルドされ、GitHub Pagesへデプロイされます。

公開URL:

```text
https://haraken01-01.github.io/dog-food-app/
```

## 実装範囲

- 犬情報入力フォーム
- 1日の推定カロリー計算
- 主食フード入力
- 複数の手作り食材・トッピング入力
- 食材ごとのカロリー・主要栄養素計算
- 危険食材チェック
- トッピング10%超え警告
- 肉中心・Ca:Pバランス注意
- 結果表示
- 参考資料ページ

## 初期データ

食材の栄養値は `src/data/food_nutrients.json` に置いています。MVPでは仮値を含むため、正式公開前に日本食品標準成分表などの正式データで差し替えてください。

危険食材は `src/data/dangerous_foods.json` に置いています。

## 参考資料の扱い

以下を参考資料として列挙しています。図表、本文、ロゴ、チャートは転載していません。また「準拠」「公式」「認定」とは表現しません。

- FEDIAF Nutritional Guidelines 2025
- WSAVA Global Nutrition Guidelines / Global Nutrition Toolkit
- 日本食品標準成分表
- USDA FoodData Central
- MSD Veterinary Manual
