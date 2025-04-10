import { Address } from "@/lib/types/address";

export default function AddressCard({ address }: { address: Address }) {
  const fieldMapping = [
    { label: "Tên", value: address.first_name },
    { label: "Họ & tên đệm", value: address.last_name },
    { label: "Công ty", value: address.company },
    { label: "Địa chỉ", value: address.address },
    { label: "Thành phố", value: address.city },
    { label: "Quốc Tịch", value: address.country },
    { label: "Postal/Zip Code", value: address.zipcode },
    { label: "Phone", value: address.phone },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6 overflow-hidden">
      <div className="px-6 py-4">
        {address.default && (
          <div className="mb-3">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              Địa chỉ mặc định
            </span>
          </div>
        )}

        <div className="">
          {fieldMapping.map((field, index) => (
            <div key={index} className="flex py-4 border-b border-gray-100">
              <div className="w-1/3 text-gray-500">{field.label}</div>
              <div className="w-2/3 text-gray-600">{field.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-right">
          <a
            href={`/addresses/edit/${address.id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            Chỉnh sửa địa chỉ
          </a>
        </div>
      </div>
    </div>
  );
}
