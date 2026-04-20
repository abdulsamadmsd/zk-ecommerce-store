<div className="space-y-4">
  {products.map((product) => (
    <div
      key={product.id}
      className="flex items-center justify-between p-4 border rounded-xl bg-white dark:bg-slate-900"
    >
      {/* LEFT SIDE */}
      <div>
        <h3 className="font-bold text-lg">{product.title}</h3>
        <p className="text-gray-500">${product.price}</p>
      </div>

      {/* RIGHT SIDE ACTIONS */}
      <div className="flex gap-3">
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">
          Edit
        </button>

        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg">
          Delete
        </button>
      </div>
    </div>
  ))}
</div>;
