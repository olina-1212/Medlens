export default function KpiCard({
  label,
  value,
  icon: Icon,
  gradient,
  iconBg,
}) {
  return (
    <div
      className={`
        ${gradient}
        relative overflow-hidden rounded-3xl
        p-6
        shadow-lg
        transition-all duration-300
        hover:-translate-y-2 hover:shadow-2xl
      `}
    >
      {/* Decorative circle */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20" />

      <div className="relative">
        <div
          className={`${iconBg} flex h-14 w-14 items-center justify-center rounded-2xl shadow-md`}
        >
          <Icon className="h-7 w-7 text-white" />
        </div>

        <p className="mt-6 text-sm font-medium text-gray-700">
          {label}
        </p>

        <h2 className="mt-2 text-4xl font-extrabold text-gray-900">
          {value}
        </h2>
      </div>
    </div>
  );
}