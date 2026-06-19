import Link from "next/link";
import referenceSources from "@/data/reference_sources.json";

export default function ReferencesPage() {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link className="focus-ring text-sm font-semibold text-leaf hover:text-ink" href="/">
          トップへ戻る
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">参考資料</h1>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          以下は参考資料としての列挙です。図表、本文、ロゴ、チャートは転載していません。また「準拠」「公式」「認定」という意味ではありません。
        </p>

        <div className="mt-6 space-y-3">
          {referenceSources.map((source) => (
            <section key={source.name} className="rounded-lg border border-leaf/20 bg-white p-4 shadow-sm">
              <h2 className="font-bold text-ink">{source.name}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">{source.note}</p>
            </section>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-coral/30 bg-orange-50 p-4 text-sm leading-7 text-red-950">
          このアプリは診断、治療、療法食設計を行いません。持病、療法食、子犬、妊娠・授乳期の場合は獣医師に相談してください。
        </div>
      </div>
    </main>
  );
}
