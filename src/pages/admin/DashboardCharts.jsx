import React from "react";

export default function DashboardCharts({ properties }) {
  // GROUP DATA (simple analytics)
  const priceRanges = {
    "0-50k": 0,
    "50k-100k": 0,
    "100k+": 0,
  };

  properties.forEach((p) => {
    const price = Number(p.price || 0);

    if (price <= 50000) priceRanges["0-50k"]++;
    else if (price <= 100000) priceRanges["50k-100k"]++;
    else priceRanges["100k+"]++;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

      {/* BAR CHART */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Price Distribution</h2>

        <pre>{JSON.stringify(priceRanges, null, 2)}</pre>
        <p className="text-sm text-gray-500">
          (We can upgrade this to real chart UI next step)
        </p>
      </div>

      {/* PIE CHART DATA */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Market Share</h2>

        <pre>
          {JSON.stringify(
            [
              { name: "Low", value: priceRanges["0-50k"] },
              { name: "Mid", value: priceRanges["50k-100k"] },
              { name: "High", value: priceRanges["100k+"] },
            ],
            null,
            2
          )}
        </pre>
      </div>

    </div>
  );
}