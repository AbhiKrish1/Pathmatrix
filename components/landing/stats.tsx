const stats = [
  { value: "40%", label: "Average route time saved" },
  { value: "2.4M", label: "Paths analyzed monthly" },
  { value: "99.9%", label: "Platform uptime" },
  { value: "150+", label: "Teams worldwide" },
];

export function Stats() {
  return (
    <section id="stats" className="border-y border-border/60 bg-muted/30 px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
