type Option<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  title: string;
  options: Option<T>[];
  selected: T;
  onSelect: (value: T) => void;
};

export default function OptionBox<T extends string>({
  title,
  options,
  selected,
  onSelect,
}: Props<T>) {
  return (
    <section className="mt-6">
      <p className="mb-3 text-sm font-semibold">{title}</p>

      <div className="grid grid-cols-3 gap-3">
        {options.map((opt) => {
          const active = selected === opt.value;

          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={`rounded-xl border py-4 text-sm font-medium ${
                active
                  ? "border-red-400 bg-red-50 text-red-500"
                  : "border-gray-200 bg-white text-gray-600"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
