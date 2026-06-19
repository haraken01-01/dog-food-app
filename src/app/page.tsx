import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-leaf">
            Dog meal support MVP
          </p>
          <h1 className="text-4xl font-bold leading-tight text-ink sm:text-6xl">
            犬の食事量・手作りトッピング支援
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
            健康な成犬を主対象に、1日の推定カロリー、主食フード、トッピングのカロリーと主要栄養素、注意が必要な食材や偏りを確認できます。
          </p>
        </div>

        <div className="mt-8 grid gap-4 text-sm leading-7 text-slate-700 sm:grid-cols-3">
          <div className="rounded-lg border border-leaf/20 bg-white/78 p-4 shadow-sm">
            計算結果は開始目安です。体重、体型、便、食欲を見ながら調整してください。
          </div>
          <div className="rounded-lg border border-leaf/20 bg-white/78 p-4 shadow-sm">
            完全手作り食の栄養バランスを保証するものではありません。
          </div>
          <div className="rounded-lg border border-coral/25 bg-white/78 p-4 shadow-sm">
            子犬、持病、療法食、妊娠・授乳期は獣医師に相談してください。
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="focus-ring rounded-md bg-leaf px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-ink"
            href="/calculator"
          >
            食事量を計算する
          </Link>
          <Link
            className="focus-ring rounded-md border border-leaf/35 bg-white px-5 py-3 font-semibold text-leaf transition hover:border-leaf hover:bg-mint"
            href="/references"
          >
            参考資料を見る
          </Link>
        </div>
      </section>
    </main>
  );
}
