import { useGetPublicCompaniesHoldingsQuery } from "@/services/coinGeckoApi";
import millify from "millify";

const PublicCompanyHoldings = () => {
  const { data, isLoading, error } = useGetPublicCompaniesHoldingsQuery();

  if (isLoading) return <div>Loading Public Company Holdings...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const heading = [
    { title: "#", align: "left" },
    { title: "Company", align: "left" },
    { title: "Symbol", align: "left" },
    { title: "Country", align: "left" },
    { title: "Total Bitcoin", align: "right" },
    { title: "Entry Value (USD)", align: "right" },
    { title: "Today's Value (USD)", align: "right" },
    { title: "% of Total BTC Supply", align: "right" },
  ];

  return (
    <div className="w-[90%] mx-auto overflow-auto my-4">
      <h2 className="text-2xl font-bold mb-4">
        Public Company Holdings BITCOIN
      </h2>
      <table className="w-full">
        <thead className="border-t-2 border-b-2 border-solid border-gray-200">
          <tr>
            {heading.map((head, index) => {
              return (
                <th
                  key={index}
                  className={`border-b-2 border-gray-200 p-2 text-${head.align}`}
                >
                  {head.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.companies &&
            data.companies.map((company, index) => {
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 p-2 text-left font-normal text-sm">
                    {index + 1}.
                  </td>
                  <td className="border-b border-gray-200 p-2 text-left font-semibold text-sm">
                    {company.name}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-left font-light text-sm">
                    {company.symbol}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-left font-normal text-sm">
                    {company.country}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-right font-normal text-sm">
                    {millify(company.total_holdings)}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-right font-normal text-sm">
                    ${millify(company.total_entry_value_usd)}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-right font-normal text-sm">
                    ${millify(company.total_current_value_usd)}
                  </td>
                  <td className="border-b border-gray-200 p-2 text-right font-normal text-sm">
                    {company.percentage_of_total_supply}%
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default PublicCompanyHoldings;
