import AppRouterDashboard from "@/app/ui/dashboard/app-router-dashboard";
import PagesRouterDashboard from "@/app/ui/dashboard/pages-router-dashboard";
import Link from "next/link";
import { Suspense } from "react";
import DashboardSkeleton from "@/app/ui/skeletons";

export default function ComparePage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-3xl font-bold mb-4">Router Comparison</h1>
        <p className="text-gray-600 mb-8">
          App RouterとPages Routerの実際の動作の違いを比較します。
        </p>

        {/* 比較テーブル */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">主な違い</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">機能</th>
                  <th className="text-left p-2">App Router</th>
                  <th className="text-left p-2">Pages Router</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">レンダリング方式</td>
                  <td className="p-2 text-green-600">
                    ストリーミング（段階的）
                  </td>
                  <td className="p-2 text-orange-600">ブロッキング（一括）</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">スケルトンスクリーン</td>
                  <td className="p-2 text-green-600">各セクション個別表示</td>
                  <td className="p-2 text-orange-600">全画面スケルトン</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">データ取得</td>
                  <td className="p-2 text-green-600">並列・非同期</td>
                  <td className="p-2 text-orange-600">順次・同期</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Time to First Byte</td>
                  <td className="p-2 text-green-600">早い（部分表示）</td>
                  <td className="p-2 text-orange-600">遅い（全データ待機）</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Suspense</td>
                  <td className="p-2 text-green-600">✅ サポート</td>
                  <td className="p-2 text-orange-600">❌ 未サポート</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ダッシュボード比較 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* App Router版 */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-500">
            <div className="mb-4 pb-4 border-b">
              <h2 className="text-xl font-semibold text-blue-600">
                App Router (Next.js 14+)
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Server Components + Suspense + Streaming
              </p>
            </div>
            <Suspense fallback={<DashboardSkeleton />}>
              <AppRouterDashboard />
            </Suspense>
          </div>

          {/* Pages Router版 */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-green-500">
            <div className="mb-4 pb-4 border-b">
              <h2 className="text-xl font-semibold text-green-600">
                Pages Router (従来)
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                getServerSideProps + ブロッキングレンダリング
              </p>
            </div>
            <PagesRouterDashboard />
          </div>
        </div>

        {/* 説明セクション */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">観察ポイント</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <strong>App Router:</strong>{" "}
              各セクション（カード、チャート、請求書）が準備でき次第、順次表示されます。
              ユーザーは早い段階でコンテンツを見ることができます。
            </li>
            <li>
              <strong>Pages Router:</strong>{" "}
              全データ取得が完了するまで、スケルトンスクリーンが表示されます。
              すべてのデータが揃ってから一括で表示されます。
            </li>
            <li>
              <strong>パフォーマンス:</strong> App RouterはTime to First
              Byte（TTFB）が早く、
              ユーザー体験が向上します。特に遅いデータソースがある場合、違いが顕著に現れます。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
